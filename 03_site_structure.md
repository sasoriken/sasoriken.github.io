# 03. サイト構造設計書

このドキュメントは sasoriken ポートフォリオサイトの構造・URL・配色・タイポグラフィ・コンポーネント仕様を定義するものです。第5段階（HTML 生成）はこのドキュメントを設計仕様として参照します。

参照: `00_concept.md`, `01_inventory.md`, `02_material_workflow.md`, `projects/*.md`

---

## 1. ホスティング

- **配信先**: GitHub Pages
- **リポジトリ**: 専用リポジトリ `sasoriken.github.io`（ユーザーサイト）または `<repo>/docs` 配信のどちらでも可
- **推奨**: `sasoriken.github.io` ユーザーサイトリポジトリを新規作成し、ルート直下に静的ファイルを置く構成。ビルドステップを挟む場合は GitHub Actions で `gh-pages` ブランチへ自動デプロイ
- **カスタムドメイン**: 採用可否は本人判断。採用しない場合は `https://sasoriken.github.io/` で運用

## 2. URL 設計

3 階層構成。

| URL | 役割 |
|---|---|
| `/` | トップページ |
| `/works/` | 作品一覧ページ |
| `/works/<slug>/` | 個別プロジェクト詳細ページ |
| `/about/` | プロフィール／このサイトについて |
| `/404.html` | エラーページ |

slug は `projects/<slug>.md` のファイル名と一致させる。

### 言語切り替え

- 戦略: クエリパラメータ `?lang=en` + ブラウザ言語設定の自動判定
- 初期表示ロジック:
  1. URL に `?lang=ja` または `?lang=en` があればそれを採用
  2. なければ `navigator.language` を見て `ja*` なら日本語、それ以外は英語にフォールバック
  3. ユーザーが切り替えたら URL のクエリを書き換え（ヒストリ書き換え）し、`localStorage` にも保存
- 制約: パスは言語に依存させない（SEO のサブベストエフォート扱い）

## 3. ページ構成

### 3.1 トップページ `/`

縦スクロールで以下のセクションを順に並べる:

1. **Hero**
   - sasoriken のハンドル名（ローマ字、大きく）
   - サブコピー（1 行、本人記入。例: "Tools and experiments by sasoriken."）
   - スクロール誘導（小さな矢印 + テキスト）
   - 背景: セピアグラデーション + 黄褐色の控えめなアクセント線
2. **Featured Works**（2 件）
   - Hakoniwa Vault と Magic Circle Generator を大きめのカード 2 枚で並列表示
   - 各カードはサムネイル + 公式名 + `one_liner_ja`（または `_en`）+ "詳しく見る" リンク
3. **All Works**（簡易プレビュー）
   - 残り 4 件をコンパクトなカードで横並び（モバイルは縦）
   - 「すべての作品を見る →」リンクで `/works/` へ
4. **About**（簡易プレビュー）
   - 1〜2 段落のテキスト（本人記入の余地あり）
   - 「もっと知る →」リンクで `/about/` へ
5. **Contact**
   - 5 つの連絡手段アイコン列（X / GitHub / Email / BOOTH / itch.io）
6. **Footer**（後述）

### 3.2 作品一覧ページ `/works/`

- 上部に **フィルタバー**（3 種類、いずれも複数選択可）
  - カテゴリ: tool_3d / creative_tool / gamedev / content_platform / experiment
  - ステータス: active / maintained / wip / paused / archived
  - 価格・配布形態: free / paid / freemium / unreleased
- フィルタは AND（カテゴリ内は OR、フィルタ間は AND）
- 既定ソート: `featured: true` を上位 → `last_updated` 降順
- グリッド表示（デスクトップ 3 列、タブレット 2 列、モバイル 1 列）
- 各カードは `featured` 状態を視覚的に表現（細い黄褐色の縁取り or バッジ）
- 一覧から個別ページへの遷移は同一タブ

### 3.3 個別プロジェクト詳細ページ `/works/<slug>/`

レイアウトの順序:

1. **Hero**
   - 公式名（タイトル大）
   - `one_liner`
   - ステータス・カテゴリ・価格などのバッジ列
   - 配布リンクボタン群（BOOTH / itch.io / 公式サイト / GitHub）。各ボタンは label を持ち、リンク先のハンドル名は表に出さない
2. **スクリーンショット**（あれば。なければ省略）
   - 横スクロール or グリッド
3. **概要**（日本語）／**Overview**（英語）— 言語切り替えで切り替わる
4. **動機・経緯**
5. **技術的なポイント**
6. **苦労した点・学んだこと**
7. **現状とこれから**
8. **技術スタック詳細**（フロントマターから生成、タグ風表示）
9. **関連プロジェクト**（`featured: true` の 2 件 + 同カテゴリの 1〜2 件）
10. **一覧に戻る**リンク
11. **Footer**

### 3.4 About ページ `/about/`

- sasoriken のハンドル名と短いプロフィール（個人情報は出さない方針を厳守）
- このサイトのコンセプト要約
- 連絡手段の網羅的なリスト

### 3.5 404 ページ

- 遊び心を出してよい数少ない箇所
- 文面案（日英）:
  - JA: "このページは魔法陣の外にあるようです。"
  - EN: "Looks like this page is outside the circle."
- トップへ戻るリンク + 主要ページへのリンク

## 4. ヘッダー／フッター

### ヘッダー（全ページ共通）

- 左: ロゴ（"sasoriken" テキストロゴ。フォントで個性を出す）
- 右: ナビゲーション（Works / About）+ 言語切り替え（JP | EN）
- スクロール時の挙動: 縮小（高さを 1.5 倍 → 1.0 倍へ）、背景にうっすら blur
- モバイル: ハンバーガーメニュー

### フッター（全ページ共通）

- 左: "© sasoriken" + 年（自動更新）
- 中央: 連絡手段アイコン列（5 つ）
- 右: "Built with care." 系の控えめなコピー（遊び心可）
- 上部に薄い黄褐色のディバイダー

## 5. カラーシステム

「セピア色の中間トーン + 黄褐色アクセント」を CSS カスタムプロパティで定義する。

```css
:root {
  /* Base: sepia mid-tones */
  --color-bg-primary:   #F2E7D3;   /* warm sepia background */
  --color-bg-secondary: #E8D9BF;   /* slightly deeper sepia (cards) */
  --color-bg-tertiary:  #D9C7AB;   /* dividers, inactive */
  --color-border:       #C9B492;   /* outline */

  /* Text */
  --color-text-primary:   #3A2A18; /* deep sepia ink */
  --color-text-secondary: #6B5A40; /* muted */
  --color-text-tertiary:  #8B7A5E; /* timestamp, label */

  /* Accent: amber / yellow-brown */
  --color-accent:       #B8722B;   /* primary amber */
  --color-accent-hover: #9A5E22;   /* darker on hover */
  --color-accent-soft:  #E4B477;   /* tinted background / focus ring */

  /* Status colors (subdued) */
  --color-active:    #6B8E4E;     /* muted green */
  --color-wip:       #B8722B;     /* amber */
  --color-archived:  #8B7A5E;     /* gray-sepia */

  /* Featured highlight */
  --color-featured-border: #B8722B;
  --color-featured-glow:   rgba(184, 114, 43, 0.18);
}
```

ダークモード対応はオプション（v1 では実装しない）。実装する場合は反転ではなく「夜のアーカイブ書庫」を意識した別パレットを用意する。

## 6. タイポグラフィ

モダン sans-serif を基本に、和文と欧文を組み合わせる。

```css
:root {
  --font-sans:
    "Inter",
    "Plus Jakarta Sans",
    "Noto Sans JP",
    -apple-system, BlinkMacSystemFont,
    "Helvetica Neue", Arial, sans-serif;

  --font-mono:
    "JetBrains Mono",
    "Fira Code",
    "Noto Sans Mono",
    Consolas, monospace;
}
```

- 見出し: Plus Jakarta Sans の bold / extrabold
- 本文: Inter + Noto Sans JP の混植
- 数値・slug 表示・URL: JetBrains Mono などの monospace を局所的に使用

サイズ（基本 16px / 1.5 line-height）:

```css
:root {
  --font-size-xs:  12px;
  --font-size-sm:  14px;
  --font-size-base: 16px;
  --font-size-lg:  18px;
  --font-size-xl:  24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  --font-size-hero: 72px;
}
```

## 7. アニメーション

控えめ方針。具体的に許可するもの:

- **ボタン・リンクの hover**: 100〜150ms の色・下線・微小な translate
- **カードの hover**: 上方向に 2-4px translate + 影の微増
- **スクロール時の fade in**: IntersectionObserver で `opacity 0 → 1`, `translateY 12px → 0`, 400ms
- **ヘッダーの縮小**: scroll Y 64px で発火、200ms ease-out
- **モーダル / 言語切替の遷移**: 200ms cross-fade

禁止するもの:

- パララックス効果
- スクロール連動の複雑なアニメ
- 自動再生する動画背景
- 3D / WebGL を Hero に置くこと（重い + 趣旨と外れる）
- 過剰なホバー演出（拡大率 1.05 を超えない）

`prefers-reduced-motion: reduce` のユーザーには全アニメを無効化する。

## 8. レスポンシブ

モバイルファースト設計。

| ブレークポイント | 名称 | レイアウト |
|---|---|---|
| `< 640px` | mobile | 1 カラム |
| `640px - 1024px` | tablet | 2 カラム |
| `> 1024px` | desktop | 3 カラム（一覧）/ センター 720px-960px（読み物） |

最大コンテンツ幅は 1280px。

## 9. コンポーネント仕様

主要なコンポーネントと props 的役割（実装言語問わず、構造として）:

- **`ProjectCard`** — タイトル、`one_liner`、サムネイル、カテゴリバッジ、価格バッジ、ステータスバッジ、`featured` 強調
- **`Badge`** — ラベル + 色トークン
- **`LinkButton`** — アイコン + ラベル + URL（外部リンクは新規タブ + `rel="noopener"`）
- **`LangToggle`** — JP / EN トグル
- **`FilterBar`** — チェックボックスグループ × 3
- **`ScreenshotGallery`** — 横スクロール or グリッド

## 10. 言語切替の実装方針

- 各テキスト要素に `data-i18n="<key>"` を付ける
- 翻訳辞書を `i18n/ja.json` `i18n/en.json` として配置
- 起動時に lang を解決して全 `data-i18n` 要素を差し替え
- プロジェクト本文（`概要` / `Overview` 等）は素材ファイルから生成された HTML 内で `<div data-lang="ja">` `<div data-lang="en">` の両方を出力し、切替時に `display` を反転

## 11. SEO / OGP

- 各ページに `<title>` `<meta name="description">` を日英で用意
- OGP 画像: 各プロジェクトに 1 枚（`assets/projects/<slug>/og.png`、1200×630）
- `<html lang="ja">` をデフォルトに、`?lang=en` 切替時は JS で `lang` 属性を `en` に書き換え
- `sitemap.xml` と `robots.txt` を生成

## 12. アクセシビリティ

- すべての画像に `alt` 属性
- フォーカスリング: `--color-accent-soft` の outline を 2px
- コントラスト比 WCAG AA 以上を目標（セピア × 黄褐色は WCAG 違反になりやすいので、本文と背景のコントラスト計算は実装時に必ず実機検証）
- `prefers-reduced-motion` 対応
- ナビゲーションは Tab で全てアクセス可能

## 13. ファイル構成（HTML 生成後）

```
site/
├── index.html                  ← /
├── works/
│   ├── index.html              ← /works/
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
│   ├── fonts/                  ← セルフホスト時のみ
│   ├── icons/
│   └── projects/<slug>/        ← スクリーンショット等
├── i18n/
│   ├── ja.json
│   └── en.json
├── sitemap.xml
├── robots.txt
└── README.md
```

シンプルな静的ファイル構成を採用。フレームワークやビルドツールは使わない（v1 の方針）。後日 11ty / Astro / Vite 等への移行は素材ファイルを保持していれば容易。

## 14. 後工程への申し送り

第5段階（HTML 生成プロンプト作成）と実装段階で守ること:

- 本ドキュメントを **設計仕様の唯一の参照点** として扱う
- 素材ファイル（`projects/*.md`）のフロントマターを正規データソースとする
- 配色は CSS カスタムプロパティで集中管理し、ハードコードしない
- 言語切替は URL クエリ反映を必須にする
- 個人情報の表出は厳禁（コンセプト第6節を厳守）
- featured (`Hakoniwa Vault`, `Magic Circle Generator`) はトップとフッターで強調する
