# 02. プロジェクト素材ファイル運用ルール

このドキュメントは、`projects/<slug>.md` 形式で配置するプロジェクト素材ファイルの **フォーマット仕様** と **作成・更新ワークフロー** を定めるものです。第4段階以降の HTML 生成は、ここで定めた素材ファイルのみを正規入力として扱います。

参照: `00_concept.md`、`01_inventory.md`

---

## ディレクトリ構成

```
sasoriken-project/
├── 00_concept.md
├── 01_inventory.md
├── 02_material_workflow.md    ← 本ファイル
├── prompts/
│   └── material-file.prompt.md  ← 素材ファイル生成プロンプト
├── projects/
│   ├── hakoniwa-vault.md
│   ├── folio.md
│   ├── ai-lectures.md
│   ├── unit-omega.md
│   ├── magic-circle-generator.md
│   └── novel-engine-design.md
└── assets/
    └── projects/
        ├── hakoniwa-vault/
        ├── folio/
        ├── ai-lectures/
        ├── unit-omega/
        ├── magic-circle-generator/
        └── novel-engine-design/
```

`projects/` 配下のファイルが「正規の素材ファイル」。`assets/projects/<slug>/` 配下にはスクリーンショット等の画像を配置する。

---

## 素材ファイルのフォーマット

各ファイルは YAML フロントマター + Markdown 本文の構成。フィールド仕様は `prompts/material-file.prompt.md` の出力フォーマットに準拠する。

最低限含むべきフィールド（コンセプト文書で定めた日英併記の要件を反映）:

```yaml
---
title: <公式名>
repo_name: <リポジトリ名>
slug: <URL slug>
one_liner_ja: <日本語の一文要約>
one_liner_en: <英語の一文要約>
category: <01_inventory.md と整合>
status: <active | maintained | wip | paused | archived>
featured: <true | false>
visibility: <public | restricted>
repository_url: <public のときのみ。private なら null>
distribution_url: <BOOTH/itch.io 等。複数ある場合は配列>
publication_url: <公開サイトの URL。なければ null>
tech_stack: [...]
tags: [...]
thumbnail: <代表画像の相対パス>
screenshots: [...]
---

## 概要 (JA)
...

## Overview (EN)
...

## 動機・経緯
...

## 技術的なポイント
...

## 苦労した点・学んだこと
...

## 現状とこれから
...
```

詳細な制約は `prompts/material-file.prompt.md` を参照。

---

## ワークフロー

### 新規プロジェクトを追加するとき

1. `01_inventory.md` の一覧表に行を追加し、`decision` `visibility` `featured` を確定する
2. `prompts/material-file.prompt.md` を AI に渡し、末尾の `<<< INPUT >>>` ブロックに対象プロジェクトの情報（README、ファイル一覧、配布 URL 等）を貼り付ける
3. 出力された Markdown を `projects/<slug>.md` として保存
4. `（要・本人記入）` と `null` の箇所を確認し、本人が手で埋める
5. `assets/projects/<slug>/` にスクリーンショットを配置する

### 既存プロジェクトを更新するとき

- メタ情報（バージョン、配布 URL 等）の変更: フロントマターを直接編集
- 本文の大幅な書き直し: プロンプトに再投入してドラフトを得てから差分マージ
- スクリーンショット差し替え: `assets/projects/<slug>/` のファイルを差し替えてフロントマターを更新

### バリデーション

素材ファイルが揃ったら、以下を満たすかを確認する:

- すべての素材ファイルで `one_liner_ja` と `one_liner_en` が両方埋まっている
- `featured: true` のファイルが `01_inventory.md` の確定済み featured と一致
- `visibility: public` のファイルにのみ `repository_url` が記入されている
- `distribution_url` / `publication_url` がリンク切れしていない（手動チェック）
- 創作物の混入がない（コンセプト文書で「載せない」と定めたため、小説関連プロジェクトが含まれていないこと）

---

## 6 プロジェクトの素材ファイル化状況（2026-05-17 現在）

| slug | ステータス | 備考 |
|---|---|---|
| `hakoniwa-vault` | ✅ 初版生成済み | featured。配布 URL 入り |
| `folio` | ✅ 初版生成済み | 未配布のため外部リンクなし |
| `ai-lectures` | ✅ 初版生成済み | サイト URL 入り |
| `unit-omega` | ✅ 初版生成済み | UNIT-Ω 表記、サイト URL + GitHub URL 入り |
| `magic-circle-generator` | ✅ 初版生成済み | featured。BOOTH URL 入り |
| `novel-engine-design` | ✅ 初版生成済み | 設計プロジェクトとして掲載 |

すべて `（要・本人記入）` のプレースホルダを含む。**動機・苦労点・学び** の節は本人が埋める前提。

---

## 後工程への申し送り

- 第4段階（サイト構造設計）は `projects/*.md` の `featured`・`category`・`visibility` を読み、フィルタ／ソート仕様を確定する
- 第5段階（HTML 生成）は `projects/*.md` を **唯一の入力源** として扱い、本ドキュメントや `01_inventory.md` を参照しない
- 言語切り替え機能は、各 `*.md` の `*_ja` と `*_en` フィールドを使用する
