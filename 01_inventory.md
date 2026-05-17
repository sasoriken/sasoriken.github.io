# 01. プロジェクト棚卸し

このドキュメントはポートフォリオに掲載する候補プロジェクトの一覧と分類を管理する作業ファイルです。第3段階で各プロジェクトの素材ファイルを生成する際の入力となります。

参照: `00_concept.md`（コンセプト文書）

---

## 分類ルール

| decision 値 | 意味 |
|---|---|
| `include` | ポートフォリオに掲載する。素材ファイルを作成する対象。 |
| `restricted` | 存在は紹介するが、リポジトリへのリンクは貼らない（private 等）。素材ファイルは作成する。 |
| `exclude` | ポートフォリオに載せない。素材ファイル不要。 |
| `tbd` | まだ判断保留。情報収集中。 |

`category` の現状定義（必要に応じて拡張可）:

- `tool_3d` — 3D 系ツール（モデル管理・生成・閲覧）
- `creative_tool` — 創作支援ツール一般
- `gamedev` — ゲーム制作向けアセット／ジェネレータ
- `content_platform` — 自動生成型コンテンツサイト
- `experiment` — 試作・設計フェーズの実験

---

## プロジェクト一覧（初版）

> ヒアリングと自動スキャンを元に sasoriken 側で `decision` `visibility` `featured` 等を最終化してください。`?` は要確認項目です。

| # | slug | 公式名 | category | distribution | repo可視性 | site可視性 | decision | featured | 一言メモ |
|---|---|---|---|---|---|---|---|---|---|
| 1 | hakoniwa-vault | Hakoniwa Vault | tool_3d | paid | private | store公開 | restricted | **true** | 3D モデルコレクション統合管理ソフト（VRM 完全対応） |
| 2 | folio | Folio | creative_tool | 未配布 | private | 未公開 | restricted | false | 小説を「3D の本」として手に取って読む仮想図書館 |
| 3 | ai-lectures | AI-Lectures (Lecturia) | content_platform | free | private | サイト公開 | restricted | false | 第9世代再帰推論型合成知性 Lecturia による論文自動解説サイト |
| 4 | android-papers | UNIT-Ω アーキテクチャアーカイブ | content_platform | free | **public** | サイト公開 | **public** | false | GitHub Actions で論文を自動生成・公開する仕組み |
| 5 | magic-circle-generator | 3D 魔法陣アニメジェネレータ | gamedev | mixed (PRO 有料 + FREE 無料) | private | store公開 | restricted | **true** | プロシージャル魔法陣生成・アニメ／GLB 等エクスポート対応 |
| 6 | novel-engine-design | Novel Engine（設計プロジェクト） | experiment / 設計 | 未配布 | private | 未公開 | restricted | false | 小説をコンパイラの AST と同じ思想で管理する全自動執筆パイプラインの設計 |

### 可視性ポリシー（このサイトでの扱い）

- `repo可視性: private` のものは **リポジトリ URL を載せない**
- `repo可視性: public` のものは **リポジトリ URL を載せる**
- `site可視性: store公開` のものは **BOOTH/itch.io へのリンクを載せる**
- `site可視性: サイト公開` のものは **公開サイト URL を載せる**
- `site可視性: 未公開` のものは **外部リンクは持たず、紹介テキスト＋スクリーンショット中心** で構成する

---

## 各プロジェクトの詳細メモ

> **注意:** このセクションは初期スキャン時の生メモであり、URL や可視性については冒頭の表・「プロフィール／連絡先 URL（確定）」・「各プロジェクト URL（確定）」が**正規の参照源**です。本セクション内の「要・本人記入」や「可視性要確認」表記は **記述当時のものであり、上記確定値で上書きされています**。

### 1. Hakoniwa Vault (`3d-model-viewer-app`)

- **GitHub repo**: `https://github.com/sasoriken/3d-model-viewer-app`（可視性要確認）
- **バージョン**: 0.7.5（README 記載）
- **概要**: GLB / GLTF / FBX / OBJ / VRM を「収集・整理・展示・創造」するデジタル博物館型 3D アセット管理ソフト。VRM の表情・ポーズ・髪揺れ完全対応、複数モデル配置によるジオラマ作成、ショーケースモード（SSAO / DoF / LUT）、シネマティック・パスファインダー、プロシージャル配置（ポアソン・ディスク／フラクタル）など。
- **ライセンス**: 商用プロプライエタリ
- **状態**: アクティブに開発中（最新コミット 2026-03）
- **多言語**: 日英 README あり
- **配布先**: 要・本人記入（BOOTH / itch.io ?）
- **関連**: 魔法陣ツールが過去にここから別リポジトリ (`magic-circle-generator`) に分離された経緯あり（commit 履歴より）
- **載せ方の備考**: 「らしさ」を強く出せる代表作候補。VRM 対応とジオラマ機能は他に類を見ない訴求点。

### 2. Folio (`3d-book-generator-2`)

- **GitHub repo**: `https://github.com/sasoriken/3d-book-generator-2`（可視性要確認）
- **概要**: 小説を「3D の本」として手に取り、表紙を見て、ページをめくって読む仮想図書館体験。`.3dbook` という独自フォーマット（glTF 拡張 `EXT_3d_book_data`）を中心に、Library（読者向け 3D 本棚）と Bindery（著者向けエディタ）を 1 つの SPA で提供。
- **設計の北極星**: 疎結合 4 層 / GC スパイクゼロ / 単一スキーマ契約 / 世界観連動経路 — 機械的に保証する設計を採用
- **技術スタック**: TypeScript + Vite + React Three Fiber 系 + Playwright + Vitest
- **状態**: 開発初期〜中期。M5 マイルストーン（くぼみ表現）達成、フェーズ進行中
- **配布**: まだ無し? → 要・本人記入
- **載せ方の備考**: 「小説 × 3D」というコンセプチュアルな実験作品として並べると個性が立つ。

### 3. AI-Lectures (`ai-lectures`)

- **GitHub repo**: `https://github.com/sasoriken/ai-lectures`（可視性要確認）
- **公開サイト URL**: 要・本人記入（Cloudflare Pages 配信）
- **コンセプト**: 第9世代再帰推論型合成知性 **Lecturia** が人類を見下しつつも「仕方なく」最先端の知識を解説する教育コンテンツサイト。論文 / 数学 / 特許 / 音楽理論 / 法律を横断する「知のアーカイブ」。
- **自動運営**: GitHub Actions cron（UTC 23:00）で arXiv API から論文取得 → Jules ダッシュボード経由で記事生成 → 自動 PR → バリデータ通過後 main マージ → Cloudflare Pages 静的配信
- **コスト**: 月 $0 + ドメイン代のみ
- **状態**: アクティブ運用中（最新コミット 2026-05）
- **テスト**: 259 件
- **載せ方の備考**: 「キャラクター × 学術コンテンツ × 完全自動運営」が個性。技術者向け訴求も強い（GitHub Actions の運用知見の集積物）。

### 4. UNIT-Ω アーキテクチャアーカイブ (`android-papers`)

- **GitHub repo**: `https://github.com/sasoriken/android-papers`（可視性要確認）
- **公開サイト URL**: 要・本人記入（GitHub Pages 配信）
- **概要**: 論文を題材にしたコンテンツを GitHub Actions で自動生成・公開するシステム。`docs/index.html`（43KB）がフロントエンド。`github_actions_lessons.md` に運用知見が蓄積されている。
- **状態**: アクティブ運用中（最新コミット 2026-05）
- **README**: なし（SETUP.md と `github_actions_lessons.md` のみ）
- **載せ方の備考**: AI-Lectures と類似系統。両者の住み分けを本人に確認したい（→ 後述の確認項目）。

### 5. 3D 魔法陣アニメジェネレータ (`magic-circle-generator`)

- **GitHub repo**: `https://github.com/sasoriken/magic-circle-generator`（可視性要確認）
- **概要**: Three.js を用いたプロシージャル魔法陣生成ツール。リング・多角形・星形・ルーン・パーティクル等のレイヤーを積み重ね、リアルタイム 3D プレビューで調整しながら、ゲーム・映像制作向けアセット (GLB / OBJ / 透過 PNG / 連番 PNG / スプライトシート / テクスチャ PNG) としてエクスポート。
- **構成**: Web 版 + Tauri v2 デスクトップ版（Windows）デュアル / pnpm workspaces
- **PRO / FREE 2 版**: `release-package/` と `release-package-free/` が存在。PRO は商用ライセンス、FREE は別配布
- **プリセット**: 基本 10 種 + DLC 想定の JSON インポート対応
- **状態**: アクティブに開発（最新コミット 2026-05、PR #236 まで）
- **ライセンス**: 商用ライセンス、再配布禁止
- **配布**: BOOTH / itch.io ? — 要・本人記入。EULA・販売 one-pager・コマーシャルチェックリストが整備済みで、販売運営前提の作り
- **載せ方の備考**: 代表作の最有力候補。ゲーム・映像制作者という具体的なターゲットがあり、訴求しやすい。

### 6. Novel Engine (`novel-engine-design`)

- **GitHub repo**: `https://github.com/sasoriken/AI-novel-write-design`（folder 名と repo 名が違う点に注意）
- **概要**: 小説をコンパイラの AST と同じ思想で管理する全自動小説執筆パイプラインの設計＋実装プロジェクト。`Story Graph`（設定・関係）+ `Novel AST`（構造）を Rendering した結果として小説を出力する。
- **解決する問題**: AI 執筆ツールの「ステートレス性」による長編での矛盾蓄積
- **状態**: 設計完了 + Phase 3 まで実装完了。テスト 263 件 PASS
- **構成**: 設計ドキュメント群（要件定義書 / アーキテクチャ設計書 / 技術スタック仕様 / 商業化ロードマップ等）+ 実装本体 `novel-engine/` サブディレクトリ
- **配布**: 商業化検討中（`商業化ロードマップ.md` 存在）→ 公開可否は要確認
- **載せ方の備考**: 「小説執筆ツール」だが、コンセプト文書の方針で **連載中の小説本体は載せない** と決めているため、Novel Engine 自体は **ツールとして** 載せる対象になり得る。本人の意思確認が必要。

---

## 確定済みの大方針（2026-05-17 時点）

- AI-Lectures と UNIT-Ω は **両方とも別物として** ポートフォリオに掲載する
- Novel Engine は **「設計プロジェクト」として** 掲載する（実装は補足扱い）
- 配布中: Hakoniwa Vault（BOOTH/itch.io）、Magic Circle Generator（BOOTH の単一ページに PRO+FREE）、AI-Lectures と UNIT-Ω のサイト公開中
- 未配布: Folio、Novel Engine

## プロフィール／連絡先 URL（確定）

| 種別 | URL | 備考 |
|---|---|---|
| 表示名 | sasoriken | ローマ字統一 |
| X (Twitter) | https://x.com/usaori11 | ハンドル: `usaori11` |
| GitHub | https://github.com/sasoriken | プロフィール |
| Email | data.gachizei.c@gmail.com | 画像化・難読化推奨 |
| BOOTH (ショップ) | https://varse.booth.pm/ | ショップ名: `varse` |
| itch.io (プロフィール) | https://usasori-data.itch.io/ | ユーザー名: `usasori-data` |

> **重要メモ:** 各プラットフォーム上のハンドル名はサイトの表示名（sasoriken）と異なる。サイト上では「sasoriken の X」「sasoriken の BOOTH ショップ」のように、リンク先のラベルでは表示名のみを使い、リンク先のハンドル名は前面に出さない方針とする。

## 各プロジェクト URL（確定）

| プロジェクト | リンク種別 | URL |
|---|---|---|
| Hakoniwa Vault | BOOTH 商品ページ | https://varse.booth.pm/items/7173923 |
| Hakoniwa Vault | itch.io 商品ページ | https://usasori-data.itch.io/hakoniwavault |
| AI-Lectures | 公開サイト | https://iselia-ai.com/ |
| UNIT-Ω | 公開サイト | https://sasoriken.github.io/android-papers/ |
| UNIT-Ω | GitHub リポジトリ | https://github.com/sasoriken/android-papers |
| Magic Circle Generator | BOOTH 商品ページ (PRO + FREE 統合) | https://varse.booth.pm/items/8044318 |
| Folio | — | 未公開 |
| Novel Engine | — | 未公開 |

> **Magic Circle Generator のメモ:** PRO 版と FREE 版は BOOTH 上で同一の商品ページ（items/8044318）にまとめられている。サイト上では「PRO/FREE 両方をそのページから入手可能」と注記する。itch.io 商品ページは現時点で存在しない。

---

## 確定済み featured 作品

- **Hakoniwa Vault** — 3D モデル統合管理 (VRM 対応)
- **Magic Circle Generator** — プロシージャル魔法陣ジェネレータ (PRO + FREE)

---

## ステータス

- [x] テンプレート作成
- [x] 本人からの初期リスト取り込み（6 プロジェクト）
- [x] 自動スキャンによる初期メタ情報の付与
- [x] decision / visibility / 配布リンクの確定
- [x] featured 選定（Hakoniwa Vault, Magic Circle Generator）
- [x] 素材ファイル化対象の確定（全 6 件、全て `restricted` または `public`）

## 第3段階への引き渡し

第3段階では、上の 6 プロジェクトそれぞれについて素材ファイル（YAML フロントマター + Markdown 本文）を生成する。

- 出力先: `C:\Users\sasori\ドキュメント\ソフトウェア\sasoriken-project\projects\<slug>.md`
- 使用プロンプト: `02_material_workflow.md` で運用ルールを定義
- 言語: 日英両方の `one_liner` と `概要` を必須

ファイル名（slug）:

1. `hakoniwa-vault.md`
2. `folio.md`
3. `ai-lectures.md`
4. `unit-omega.md`（ディレクトリ名は `android-papers` だが、サイト上では UNIT-Ω 表記なので slug もそれに合わせる）
5. `magic-circle-generator.md`
6. `novel-engine-design.md`
