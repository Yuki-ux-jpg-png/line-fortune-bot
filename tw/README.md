# LINE 台灣每日運勢（繁體中文／台灣時間）

台湾向けLINE公式アカウントの「占卜」ボタンから、繁体字中国語で今日の運勢を返します。
日本語版のファイルは変更せず、台湾版の処理・文章を `tw` フォルダに追加しています。
LINEアカウントの国や利用者の国籍から自動判定する方式ではなく、台湾用のWebhook URLと専用の認証情報で振り分けます。

## 同じVercelプロジェクトで日本語版と併用する設定

VercelのRoot Directoryは従来どおりプロジェクトのルートにします。
`api/tw.js` が台湾版の処理を呼び出すので、別のVercelプロジェクトを用意する必要はありません。

| 設定 | 日本語版 | 台湾版 |
| --- | --- | --- |
| Webhook URL | `https://YOUR-PROJECT.vercel.app/api/webhook` | `https://YOUR-PROJECT.vercel.app/api/tw` |
| チャネルシークレットの環境変数 | `LINE_CHANNEL_SECRET` | `LINE_TW_CHANNEL_SECRET` |
| アクセストークンの環境変数 | `LINE_CHANNEL_ACCESS_TOKEN` | `LINE_TW_CHANNEL_ACCESS_TOKEN` |
| Supabaseテーブル | `public.fortunes` | `public.fortunes_tw` |
| 日付の基準 | `Asia/Tokyo` | `Asia/Taipei` |

### 1. 台湾用チャネルの認証情報を登録

台湾向け公式アカウントに紐づくMessaging APIチャネルから、チャネルシークレットとアクセストークンを取得します。
Vercelの環境変数に次を追加し、再デプロイしてください。

```dotenv
LINE_TW_CHANNEL_SECRET=台湾用チャネルのシークレット
LINE_TW_CHANNEL_ACCESS_TOKEN=台湾用チャネルのアクセストークン
```

日本語版の `LINE_CHANNEL_SECRET` と `LINE_CHANNEL_ACCESS_TOKEN` は従来の値を維持します。
台湾版は台湾専用の環境変数を必須にしているため、日本語版の認証情報を代わりに使用しません。
秘密情報をソースコードやGitHubへ記載しないでください。

### 2. Supabase接続を設定

台湾版は、次の共通の環境変数を使用します。

```dotenv
SUPABASE_URL=https://fffliyqwsbbbqgibezgw.supabase.co
SUPABASE_SECRET_KEY=このプロジェクトのサーバー用Secret key
```

指定のSupabaseプロジェクトには、この会話で `public.fortunes_tw` を作成済みです。
そのプロジェクトを使う場合、テーブルを作り直す必要はありません。
別のSupabaseプロジェクトを使う場合は、`tw/supabase.sql` をSQL Editorで実行してください。
このSQLは既存の日本語版テーブルや保存結果を変更しません。

### 3. 台湾用Webhookを設定

台湾用チャネルのLINE Developersコンソールで、Messaging APIのWebhook URLを次に設定します。

```text
https://YOUR-PROJECT.vercel.app/api/tw
```

「検証」を実行し、Webhookの利用を有効にしてください。
これはプロジェクトルートの `api/tw.js` のURLです。`/tw` というフォルダ名だけではWebhookは公開されません。

### 4. リッチメニューのボタンを設定

- ボタン表示: `占卜` または `今日運勢`
- テキストアクション: `占卜` または `今日運勢`
- ポストバックを使う場合: `fortune=today`

受け付けるテキストは `占卜`、`今日運勢`、`今日占卜`、`運勢`、`抽籤` です。
既存メニューとの互換用に `占い`、`今日の占い` も受け付けますが、台湾用Webhookからの返信は常に繁体字です。

## 台湾版だけを別のVercelプロジェクトに配置する場合

Root Directoryを `tw` に設定すると、台湾版のWebhook URLは次になります。

```text
https://YOUR-TW-PROJECT.vercel.app/api/webhook
```

この場合も、環境変数名は `LINE_TW_CHANNEL_SECRET`、`LINE_TW_CHANNEL_ACCESS_TOKEN`、`SUPABASE_URL`、`SUPABASE_SECRET_KEY` の4つです。
ルートで併用する場合の `/api/tw` と、`tw` 単独デプロイ時の `/api/webhook` を取り違えないでください。

## 返信と保存の仕様

- 占い本文、スコア、幸運色・物品・数字・時段、開運行動、再利用時の案内を台湾向け繁体字で返信します。
- 結果の先頭は `🔮 2026年10月4日 今日運勢（台灣時間）` のような表示です。
- 台湾時間の午前0時で日付が切り替わります。Supabase全体のタイムゾーン変更は不要です。
- `fortunes_tw` にユーザーID・台湾の日付・結果を保存します。
- 同じ日の2回目以降は保存済みの結果に、次の案内を付けて返信します。

```text
※你今天已經占卜過囉。
明天再來看看新的運勢吧🔮
```

- 同時リクエストはユーザーIDと日付の一意制約で結果を1件に保ちます。
- RLSを有効にし、`anon` と `authenticated` にテーブル／シーケンスのアクセスを許可せず、サーバー用ロールで読み書きします。
- 占いは事前に用意された文章の抽選方式です。

## 配置したファイル

- `../api/tw.js`: ルートで併用する場合の台湾版Webhook入口
- `api/webhook.js`: 台湾用署名検証、保存、LINE返信
- `lib/fortune.js`: 台湾向け繁体字の占い生成
- `supabase.sql`: 台湾版テーブルとアクセス権の設定
- `.env.example`: 台湾版で使う環境変数
- `package.json`: `tw` 単独デプロイ用の依存関係

参考: [LINE Webhook署名検証](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/)、[Vercel Node.js Runtime](https://vercel.com/docs/functions/runtimes/node-js)
