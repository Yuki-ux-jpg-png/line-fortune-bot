# LINE 1日1回占いボット

リッチメニューから「占い」というテキストを送ると、ユーザーごとに1日1回だけ占いを生成します。

## ファイル
- `api/webhook.js`: LINE Webhook、署名検証、Supabase保存、LINE返信
- `lib/fortune.js`: 占い文章の生成
- `supabase.sql`: データベース作成SQL
- `.env.example`: Vercelへ登録する環境変数名

## Vercel環境変数
- `LINE_CHANNEL_SECRET`
- `LINE_CHANNEL_ACCESS_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

秘密情報をGitHubへ直接書かないでください。

## Webhook URL
`https://YOUR-PROJECT.vercel.app/api/webhook`
