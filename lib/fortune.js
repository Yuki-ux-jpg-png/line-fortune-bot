const ranks = [
  { value: "大吉", weight: 12 },
  { value: "中吉", weight: 24 },
  { value: "小吉", weight: 24 },
  { value: "吉", weight: 25 },
  { value: "末吉", weight: 15 }
];

const themes = [
  "新しい流れが生まれる日",
  "小さな選択が未来を変える日",
  "人とのつながりが運を運ぶ日",
  "直感を信じると道が開ける日",
  "丁寧な行動が評価される日",
  "焦らず整えることで好転する日",
  "いつもと違う行動がチャンスになる日",
  "気持ちを切り替えるほど運気が上がる日"
];

const summaries = [
  "今日は、目の前のことを一つずつ整えることで運気が上がります。急いで結論を出すより、丁寧に進めることを意識しましょう。",
  "あなたの何気ない一言や行動が、周囲に良い影響を与えやすい日です。自然体で接するほど良い流れが生まれます。",
  "迷いが出ても大丈夫。直感と現実的な判断を組み合わせることで、納得できる選択ができそうです。",
  "小さなチャンスが身近にあります。普段なら見逃すような出来事にも目を向けてみてください。",
  "今日は待つよりも、ほんの少し動くことが開運につながります。完璧でなくても始めることが大切です。",
  "人からの言葉や偶然の出来事に、今日のヒントが隠れていそうです。気になったことはメモしておきましょう。"
];

const loveMessages = [
  "素直な言葉が距離を縮めます。短い連絡でも、飾らない気持ちが伝わりやすい日です。",
  "聞き役に回ると好印象。相手の話を丁寧に受け止めることで、関係が深まりそうです。",
  "焦って答えを出さなくて大丈夫。自然な流れを大切にすると、良い方向へ進みます。",
  "笑顔と軽い一言がチャンスを作ります。重く考えすぎず、明るい雰囲気を心がけましょう。",
  "感謝を言葉にすると愛情運が上向きます。身近な人への『ありがとう』を忘れずに。",
  "自分らしさが魅力として伝わる日です。無理に相手へ合わせすぎないことがポイントです。"
];

const workMessages = [
  "細かい確認が成果につながります。急ぐより、正確さを意識すると評価されます。",
  "提案や相談に良い日です。一人で抱え込まず、早めに共有すると流れが良くなります。",
  "集中力が高まりやすい日。短時間でも深く取り組むと、思った以上に進みます。",
  "後回しにしていた作業を片づけると、気持ちにも余裕が生まれます。",
  "新しいアイデアが浮かびやすい日です。すぐ使わなくても、メモに残しておくと役立ちます。",
  "周囲との連携がカギ。相手への一言の気配りが仕事運を高めます。"
];

const moneyMessages = [
  "衝動買いには少し注意。ただし、学びや健康など将来につながる使い方には良い流れがあります。",
  "小さな節約が満足感につながる日。必要なものと、今は待てるものを丁寧に見分けましょう。",
  "今日は価値あるものを見極める力が高まりやすい日です。心から納得できるかを基準にしてみましょう。",
  "安さだけで選ばず、長く大切にできるかを考えると、良い買い物ができそうです。",
  "今日は小さな幸運を受け取りやすい日です。感謝の気持ちを持ってお金を使うと、良い流れが巡ってきそうです。",
  "人への贈り物や感謝を表す使い方が、心の豊かさにつながります。"
];

const healthMessages = [
  "肩や目の疲れに注意。こまめに休憩を入れると、気持ちと運気も整います。",
  "睡眠の質を上げることが今日の開運につながります。夜は少し早めに休むのがおすすめです。",
  "体を温めると気分も安定しやすい日。温かい飲み物や入浴を取り入れてみましょう。",
  "軽い散歩やストレッチが運気を動かします。無理のない範囲で体を動かしてください。",
  "深呼吸が気持ちの切り替えに効果的。焦りを感じたら、一度立ち止まってください。",
  "頑張りすぎる前に休むことが大切です。短い休憩でも、回復の時間を確保しましょう。"
];

const luckyColors = [
  "ラベンダー", "ネイビー", "ゴールド", "ホワイト",
  "ターコイズ", "ローズピンク", "エメラルドグリーン",
  "シルバー", "オレンジ", "ワインレッド"
];

const luckyItems = [
  "ハンカチ", "温かい飲み物", "お気に入りのペン",
  "小さなノート", "香りのよいもの", "腕時計",
  "白い小物", "スマホケース", "本", "イヤホン"
];

const luckyActions = [
  "朝のうちに予定を整理する",
  "机やバッグの中を少し片づける",
  "気になる人へ短いメッセージを送る",
  "後回しにしていたことを一つだけ終わらせる",
  "いつもより丁寧に挨拶する",
  "5分だけ深呼吸する時間を作る",
  "身近な人へ感謝を伝える",
  "夜に今日よかったことを一つ書く"
];

const cautions = [
  "考えすぎるとチャンスを逃しやすい日です。迷ったら小さく試してみましょう。",
  "相手の反応を深読みしすぎないようにしましょう。確認すれば解決することが多そうです。",
  "急な予定変更に気持ちが乱れやすいかもしれません。余白を持って動くと安心です。",
  "完璧を求めすぎると疲れやすい日です。今日は70点でも前進と考えて大丈夫です。",
  "言葉が強くなりやすい場面があります。送信や発言の前に一度だけ見直しましょう。",
  "疲れを我慢しすぎないでください。休むことも今日の大切な開運行動です。"
];

const closings = [
  "今日のあなたには、静かに運を引き寄せる力があります。",
  "小さな一歩が、思っている以上に大きな流れを作りそうです。",
  "焦らず、自分のペースを大切にすれば大丈夫です。",
  "今日整えたことが、明日のチャンスにつながります。",
  "あなたらしい選択が、良い未来への近道になります。",
  "目の前の小さな幸せに気づくほど、運気はやさしく上向きます。"
];

export function generateFortune(fortuneDate) {
  const rank = weightedPick(ranks);
  const scores = createScores(rank);

  return `🔮 ${formatDate(fortuneDate)}の占い

【${rank}】
${pick(themes)}

${pick(summaries)}

――――――――――
🌟 今日の運勢スコア
総合運：${scoreBar(scores.total)} ${scores.total}点
恋愛運：${scoreBar(scores.love)} ${scores.love}点
仕事運：${scoreBar(scores.work)} ${scores.work}点
金運　：${scoreBar(scores.money)} ${scores.money}点
健康運：${scoreBar(scores.health)} ${scores.health}点

――――――――――
💗 恋愛運
${pick(loveMessages)}

💼 仕事運
${pick(workMessages)}

💰 金運
${pick(moneyMessages)}

🌿 健康運
${pick(healthMessages)}

――――――――――
🎨 ラッキーカラー
${pick(luckyColors)}

👜 ラッキーアイテム
${pick(luckyItems)}

🔢 ラッキーナンバー
${randomInt(1, 99)}

🕒 ラッキータイム
${pickLuckyTime()}

✨ 今日の開運アクション
${pick(luckyActions)}

⚠️ 今日の注意ポイント
${pick(cautions)}

――――――――――
${pick(closings)}`;
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${year}年${Number(month)}月${Number(day)}日`;
}

function createScores(rank) {
  const ranges = {
    大吉: [82, 98],
    中吉: [72, 90],
    小吉: [63, 84],
    吉: [58, 78],
    末吉: [50, 72]
  };

  const [min, max] = ranges[rank] ?? [55, 80];

  return {
    total: randomInt(min, max),
    love: randomInt(Math.max(45, min - 8), max),
    work: randomInt(Math.max(45, min - 8), max),
    money: randomInt(Math.max(45, min - 8), max),
    health: randomInt(Math.max(45, min - 8), max)
  };
}

function scoreBar(score) {
  if (score >= 90) return "★★★★★";
  if (score >= 80) return "★★★★☆";
  if (score >= 70) return "★★★☆☆";
  if (score >= 60) return "★★☆☆☆";
  return "★☆☆☆☆";
}

function pickLuckyTime() {
  return pick([
    "7:00〜9:00", "9:00〜11:00", "11:00〜13:00",
    "13:00〜15:00", "15:00〜17:00", "17:00〜19:00",
    "19:00〜21:00", "21:00〜23:00"
  ]);
}

function weightedPick(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let value = Math.random() * total;

  for (const item of items) {
    value -= item.weight;
    if (value <= 0) return item.value;
  }

  return items.at(-1).value;
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
