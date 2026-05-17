# sasoriken.github.io

sasoriken のポートフォリオサイト。GitHub Pages（ユーザーサイト）で配信されます。

公開 URL: <https://sasoriken.github.io/>

## 構成

```
.
├── index.html                  # トップ
├── works/
│   ├── index.html              # 作品一覧
│   ├── hakoniwa-vault/index.html
│   ├── folio/index.html
│   ├── ai-lectures/index.html
│   ├── unit-omega/index.html
│   ├── magic-circle-generator/index.html
│   └── novel-engine-design/index.html
├── about/index.html
├── 404.html
├── assets/
│   ├── css/main.css
│   ├── js/main.js
│   └── projects/<slug>/        # スクリーンショット
├── i18n/
│   ├── ja.json
│   └── en.json
├── sitemap.xml
├── robots.txt
└── README.md
```

フレームワーク・ビルドツール一切なし、HTML / CSS / バニラ JS のみ。

## 機能

- 日英併記（`?lang=ja` / `?lang=en` クエリ + `localStorage` 保存）
- カテゴリ・ステータス・配布形態でのフィルタ（作品一覧）
- `prefers-reduced-motion: reduce` 対応
- CSS カスタムプロパティで配色・タイポ・寸法を集中管理

## ローカルでの動作確認

`file://` では `fetch()` での i18n 読込が CORS でブロックされるため、静的サーバを使ってください。

```sh
python -m http.server 8000
# → http://localhost:8000/
```

## デプロイ

このリポジトリは `sasoriken.github.io` というユーザーサイトリポジトリです。`main` ブランチのルート (`/`) を GitHub Pages が配信します。push すれば自動的に <https://sasoriken.github.io/> に反映されます。
