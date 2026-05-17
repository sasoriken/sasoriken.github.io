---
# === 識別 ===
title: UNIT-Ω アーキテクチャアーカイブ
repo_name: android-papers
slug: unit-omega
one_liner_ja: GitHub Actions で論文を自動生成・公開する、完全無人運営のアーカイブ
one_liner_en: A fully autonomous paper archive that generates and publishes content via GitHub Actions, with no human in the loop.

# === 分類 ===
category: content_platform
status: active
featured: false
visibility: public

# === リンク ===
repository_url: https://github.com/sasoriken/android-papers
distribution_url: []
publication_url: https://sasoriken.github.io/android-papers/

# === 技術情報 ===
primary_language: JavaScript
tech_stack:
  - GitHub Actions
  - Node.js
  - GitHub Pages
  - JSON Schema
platforms:
  - Web
license: null

# === 期間・規模 ===
started: 2026-05
last_updated: 2026-05
scale: 小規模

# === 価格・配布形態 ===
pricing: free

# === タグ・素材 ===
tags:
  - autonomous content
  - GitHub Actions
  - GitHub Pages
  - paper archive
  - automation
thumbnail: null
screenshots: []
---

## 概要 (JA)

UNIT-Ω アーキテクチャアーカイブは、論文形式のコンテンツを GitHub Actions で自動生成し、GitHub Pages 上で公開する無人運営のアーカイブサイトです。リポジトリそのものが「装置」として機能し、Workflow permissions と auto-merge の設定が整っていれば、人間が手を入れなくても新しい論文が増え続けます。`github_actions_lessons.md` に運用過程で得られた知見（自動マージの設定順序、Workflow permission の罠など）が継続的に集積されており、装置としての完成度と運用ノウハウの両方を見せられるプロジェクトです。

## Overview (EN)

UNIT-Ω is an autonomous paper archive that uses GitHub Actions to auto-generate paper-style content and publish it to GitHub Pages. The repository itself acts as the production environment: once Workflow permissions and auto-merge are configured correctly, new papers keep accumulating without any human intervention. A companion document, `github_actions_lessons.md`, captures the operational lessons learned along the way — workflow permission pitfalls, auto-merge gotchas, label-based detection patterns — making the project useful both as a working artifact and as a reference for similar automation setups.

## 動機・経緯

（要・本人記入）

## 技術的なポイント

`SETUP.md` には GitHub リポジトリの初期化から auto-merge、GitHub Pages、Secrets 登録までの手順が明文化されており、装置を最初から組み直す再現性が確保されています。スキーマ駆動で動く構成で、`schema/`・`prompts/`・`scripts/` を組み合わせて論文の構造・生成プロンプト・検証ロジックを分離。`docs/index.html`（約 43KB）が公開サイトの主体で、生成されたデータと組み合わさってブラウザ側で表示される作りです。論文タイトルの日英統一など、運用しながらの仕様変更も継続して PR として取り込んでいます。

## 苦労した点・学んだこと

`github_actions_lessons.md` に集積されている内容そのものが、このプロジェクトの「苦労と学び」の記録です。具体的な学びの抜粋は（要・本人記入）。

## 現状とこれから

2026 年 5 月時点で稼働中。直近の PR 番号は 10 番台で、自動化基盤と論文データの両方が継続的に追加されています。今後の方向性については（要・本人記入）。

## 関連・参考

- 関連プロジェクト: `ai-lectures`（同じく自動生成型コンテンツサイトの系統）
- 公開サイト: https://sasoriken.github.io/android-papers/
- リポジトリ: https://github.com/sasoriken/android-papers
