import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { generateFortune } from "../lib/fortune.js";

export default {
  async fetch(request) {
    if (request.method === "GET") {
      return new Response("LINE 台灣每日運勢機器人運作中。", { status: 200 });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, POST" }
      });
    }

    try {
      const rawBody = await request.text();
      const signature = request.headers.get("x-line-signature");

      if (!verifyLineSignature(rawBody, signature)) {
        console.error("Invalid LINE signature");
        return new Response("Invalid signature", { status: 401 });
      }

      const payload = JSON.parse(rawBody);
      const events = Array.isArray(payload.events) ? payload.events : [];

      if (events.length === 0) {
        return new Response("OK", { status: 200 });
      }

      await Promise.all(events.map(handleEvent));
      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function getSupabase() {
  return createClient(
    requiredEnv("SUPABASE_URL"),
    requiredEnv("SUPABASE_SECRET_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    }
  );
}

function verifyLineSignature(rawBody, signature) {
  if (!signature) return false;

  const expected = crypto
    .createHmac("sha256", requiredEnv("LINE_TW_CHANNEL_SECRET"))
    .update(rawBody, "utf8")
    .digest("base64");

  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === actualBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

async function handleEvent(event) {
  const replyToken = event.replyToken;
  const userId = event.source?.userId;

  if (!replyToken || !userId || !isFortuneRequest(event)) return;

  const accessToken = requiredEnv("LINE_TW_CHANNEL_ACCESS_TOKEN");
  const fortuneDate = getTodayInTaipei();
  const message = await getOrCreateFortune(userId, fortuneDate);
  await replyText(replyToken, message, accessToken);
}

function isFortuneRequest(event) {
  if (event.type === "message" && event.message?.type === "text") {
    const text = typeof event.message.text === "string" ? event.message.text.trim() : "";
    return ["占卜", "今日運勢", "今日占卜", "運勢", "抽籤", "占い", "今日の占い"].includes(text);
  }

  return (
    event.type === "postback" &&
    event.postback?.data === "fortune=today"
  );
}

function getTodayInTaipei() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

async function getOrCreateFortune(userId, fortuneDate) {
  const supabase = getSupabase();

  const { data: existing, error: selectError } = await supabase
    .from("fortunes_tw")
    .select("fortune_result")
    .eq("line_user_id", userId)
    .eq("fortune_date", fortuneDate)
    .maybeSingle();

  if (selectError) throw selectError;

  if (existing) {
    return alreadyDrawnMessage(existing.fortune_result);
  }

  const fortuneResult = generateFortune(fortuneDate);

  const { error: insertError } = await supabase.from("fortunes_tw").insert({
    line_user_id: userId,
    fortune_date: fortuneDate,
    fortune_result: fortuneResult
  });

  if (!insertError) return fortuneResult;

  if (insertError.code === "23505") {
    const { data: saved, error: retryError } = await supabase
      .from("fortunes_tw")
      .select("fortune_result")
      .eq("line_user_id", userId)
      .eq("fortune_date", fortuneDate)
      .single();

    if (retryError) throw retryError;

    return alreadyDrawnMessage(saved.fortune_result);
  }

  throw insertError;
}

function alreadyDrawnMessage(fortuneResult) {
  return `${fortuneResult}

――――――――――
※你今天已經占卜過囉。
明天再來看看新的運勢吧🔮`;
}

async function replyText(replyToken, text, accessToken) {
  const response = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text }]
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`LINE Reply API error ${response.status}: ${details}`);
  }
}
