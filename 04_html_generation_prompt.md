# 04. HTML 生成用 AI 指示書

このドキュメントは、ここまでの 4 つの設計書類を入力として、実際の HTML / CSS / JS を生成する AI エージェント向けの指示書です。

---

## あなたへの依頼概要

あなたは sasoriken のポートフォリオサイトを実装する AI エージェントです。`sasoriken-project/` ディレクトリ配下の以下のドキュメントを **すべて読み込んでから** 作業を始めてください。

| 順 | ファイル | 役割 |
|---|---|---|
| 1 | `00_concept.md` | 最上位の設計指針。**他のすべてに優先する** |
| 2 | `01_inventory.md` | 掲載プロジェクトの確定リスト・URL 集 |
| 3 | `02_material_workflow.md` | 素材ファイルのフォーマット仕様 |
| 4 | `projects/*.md` (6 件) | 各プロジェクトの正規データソース |
| 5 | `03_site_structure.md` | サイト構造・URL・配色・タイポ設計書 |

成果物の出力先は `sasoriken-project/site/` 配下です。`03_site_structure.md` 第13節のファイル構成に従ってください。

---

## 厳守ルール（最優先）

1. **`projects/*.md` のフロントマター値を絶対に改変しないこと。** URL・リポジトリ名・slug・タイトル等は素材ファイルの値をそのまま使う。
2. **素材ファイルに無いリンクを創作しないこと。** `null` や空配列のフィールドは外部リンクなしで描画する。
3. **個人情報（本名・所属・経歴）を一切出さないこと。** 表示名は常に `sasoriken` のみ。
4. **`（要・本人記入）` を含むセクションはそのまま表示せず、当該見出しごと一旦コメントアウトするか、本人記入待ちの UI（薄く "...." と表示するなど）で描画する。** 本人記入前の状態でも見苦しくないよう配慮。
5. **CSS は CSS カスタムプロパティを使い、色や寸法をハードコードしないこと。** `03_site_structure.md` 第5節・第6節のトークン定義を `:root` に展開する。
6. **言語切替を URL クエリと連動させること。** `?lang=en` / `?lang=ja` を反映し、`localStorage` にも保存。
7. **`prefers-reduced-motion: reduce` のユーザーには全アニメを無効化すること。**
8. **JavaScript はバニラ JS のみ。** フレームワーク（React, Vue, Svelte 等）もビルドツール（Vite, Webpack 等）も使わない。
9. **画像が存在しない場合、`<img>` を入れず、CSS のグラデーション + テキストで「サムネイル代替」を表示すること。** 壊れた alt や プレースホルダ画像にしない。
10. **featured (`Hakoniwa Vault`, `Magic Circle Generator`) はトップページとフッターで視覚的に強調すること。** `--color-featured-border` と `--color-featured-glow` を使う。

---

## 生成の順序

以下の順で進めること。各ステップ完了時に内容を簡潔に報告すること。

### Step 1: 入力ドキュメントの読込・整合性確認

1. `00_concept.md` から `04_html_generation_prompt.md`（本ファイル）まで通読
2. `projects/*.md` を 6 件すべて読む
3. **以下のチェックを実施**:
   - 6 件の素材ファイルすべてに `one_liner_ja` と `one_liner_en` が両方ある
   - `featured: true` の件数が `01_inventory.md` の確定 featured と一致（Hakoniwa Vault, Magic Circle Generator の 2 件）
   - `visibility: public` の素材ファイルにのみ `repository_url` が存在
   - 表示名が `sasoriken` 以外に登場していない（本名等の混入チェック）
4. 異常があれば作業を中断して報告

### Step 2: スケルトン作成

1. `sasoriken-project/site/` 配下に `03_site_structure.md` 第13節の通りディレクトリを作成
2. `assets/css/main.css` に `:root` のカスタムプロパティを定義し、全色・タイポ・寸法トークンを集中管理
3. `assets/js/main.js` に言語切替・フィルタ・スクロール時 fade in の基盤コードを書く
4. `i18n/ja.json` `i18n/en.json` のキー定義（UI 文言、ナビ、ボタン等）
5. 共通の `<head>` `<header>` `<footer>` を各ページが同じソースから埋め込めるよう、JS の include 関数を用意（フレームワーク不可なので、各ページに同一の HTML を直接書くか、JS で動的挿入する方針のいずれか。**SEO 観点から各ページに直接書く方を推奨**）

### Step 3: トップページ生成 `/index.html`

`03_site_structure.md` 第3.1節に従う。

- Hero、Featured Works、All Works、About プレビュー、Contact、Footer の順
- Featured Works は Hakoniwa Vault と Magic Circle Generator
- All Works には残り 4 件をコンパクトに並べる
- 言語切り替えはヘッダーから可能

### Step 4: 作品一覧ページ生成 `/works/index.html`

`03_site_structure.md` 第3.2節に従う。

- フィルタバー（カテゴリ / ステータス / 価格）を `<details>` か独自実装で
- 6 件のカードを `<ul>` で並べる
- 既定ソート: `featured` 優先 → `last_updated` 降順
- フィルタは JS のクライアントサイド処理

### Step 5: 個別プロジェクトページ生成 `/works/<slug>/index.html`

`03_site_structure.md` 第3.3節に従い、6 件すべてを生成。slug は次の通り:

- `hakoniwa-vault`
- `folio`
- `ai-lectures`
- `unit-omega`
- `magic-circle-generator`
- `novel-engine-design`

各ページで以下を行う:

- フロントマター値をそのまま埋め込む（書き換え禁止）
- 本文セクションは Markdown を HTML に変換して埋め込む
- `（要・本人記入）` を含むセクションは Step 1 のルール 4 に従ってプレースホルダ表示
- 配布リンクは `distribution_url` 配列を反復してボタン化
- 関連プロジェクトは「featured 2 件 + 同 category の他のプロジェクト 1〜2 件」を表示
- 言語切替で本文の `## 概要 (JA)` / `## Overview (EN)` を反転表示

### Step 6: About / 404 ページ生成

- `/about/index.html` は `03_site_structure.md` 第3.4節
- `/404.html` は同 3.5節（遊び心可、文面は両言語）

### Step 7: SEO ファイル生成

- `sitemap.xml`: 全 URL を列挙（言語別の hreflang は付けない。クエリ依存のため）
- `robots.txt`: `User-agent: *` / `Allow: /` / `Sitemap: <URL>`
- 各ページの `<title>` `<meta description>` を両言語で

### Step 8: 検証

`05_verification.md` がもし存在すればそれに従う。なければ以下を実施:

- ブラウザで `index.html` を直接開いて表示確認（GitHub Pages の挙動を擬似的に再現）
- 言語切替の動作確認（JP ↔ EN）
- フィルタの動作確認
- モバイル幅（375px）・タブレット幅（768px）・デスクトップ幅（1280px）の 3 段階で表示崩れがないこと
- リンク切れチェック（特に素材ファイルから生成されたリンク）
- 個人情報の混入がないことを目視確認（"本名" 等の検索でヒットしないこと）

---

## 生成しないもの

以下は v1 では生成しない:

- ダークモード対応（v2 以降の検討）
- ブログ / 記事機能
- コメント機能
- お問い合わせフォーム（連絡手段はリンクで完結）
- 小説の連載先へのリンク（コンセプト文書で除外決定済み）
- アクセス解析の埋め込み（プライバシー方針が未定のため）

---

## トラブルシュート時の判断基準

矛盾や不明点に遭遇した場合の優先順位:

1. `00_concept.md` の指針が最優先
2. それで決まらなければ `01_inventory.md` の確定値に従う
3. それでも決まらなければ `03_site_structure.md` の仕様に従う
4. それでも決まらない場合は作業を中断し、本人に確認を求める（**勝手に推測・補完しない**）

---

## 完了報告

すべてのページが生成されたら以下を報告すること:

- 生成したファイル一覧
- Step 1 の整合性チェック結果
- Step 8 の検証結果
- `（要・本人記入）` 待ちで未確定なまま残っている箇所のリスト
- 第6段階（本人確認・最終調整）に進むための申し送り
