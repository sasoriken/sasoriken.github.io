---
# === 識別 ===
title: Novel Engine（設計プロジェクト）
repo_name: AI-novel-write-design
slug: novel-engine-design
one_liner_ja: 小説を AST 的な構造化データとして管理する、全自動執筆パイプラインの設計プロジェクト
one_liner_en: A design project for an autonomous novel-writing pipeline that treats prose as AST-like structured data.

# === 分類 ===
category: experiment
status: maintained
featured: false
visibility: restricted

# === リンク ===
repository_url: null
distribution_url: []
publication_url: null

# === 技術情報 ===
primary_language: null
tech_stack:
  - SQLite
  - MCP server
  - Semantic Diff
  - Story Graph / Novel AST
platforms:
  - CLI
  - Web (内部 UI)
license: null

# === 期間・規模 ===
started: 2026-05
last_updated: 2026-05
scale: 中規模

# === 価格・配布形態 ===
pricing: unreleased

# === タグ・素材 ===
tags:
  - novel
  - AST
  - structured data
  - pipeline
  - SQLite
  - MCP
  - semantic diff
thumbnail: null
screenshots: []
---

## 概要 (JA)

Novel Engine は、小説を「散文」ではなく「構造化データ」として管理するための執筆パイプラインの設計プロジェクトです。コンパイラの AST と同じ思想で文章を扱い、`Story Graph`（設定・キャラクター関係）と `Novel AST`（散文の構造）を別レイヤーで保持し、それらを Rendering して最終的な小説テキストを出力する、というアーキテクチャを採用しています。設計の動機は、AI 執筆ツールがステートレスであるために長編で矛盾が蓄積していくという問題を解くこと。最小単位を「Beat（一つの意味的行為：発言一つ・行動一つ・情景段落一つ）」として、矛盾検出を SQL クエリレベルで成立させられるようにしています。

## Overview (EN)

Novel Engine is a design project for a writing pipeline that treats a novel not as prose but as structured data. The architecture follows compiler-AST thinking: a `Story Graph` (settings and character relationships) and a `Novel AST` (the structure of the prose itself) live in separate layers, and the final novel text is the result of rendering the two together. The motivation is to attack the stateless-AI problem — that AI writing tools forget context and accumulate inconsistencies in long-form work. The smallest unit is the "Beat" (a single semantic act: one line of dialogue, one action, one paragraph of scenery), chosen so that contradiction detection can run as SQL queries rather than as another LLM call.

## 動機・経緯

リポジトリの README に記されているとおり、実際の小説プロジェクトを執筆する中で「設定ファイルを AI に毎回読み込ませる必要がある」「設定変更時の矛盾検出が手動」「文体一貫性の維持が会話依存」といった問題に直面し、これらを構造化・機械化するアーキテクチャとして本プロジェクトが構想されました。それ以上の経緯については（要・本人記入）。

## 技術的なポイント

設計の核は「Beat」を最小単位に置いたこと、散文自体も JSON で構造化すること、そして時系列付きの関係性を扱うために Story Graph をグラフ DB 的に設計したこと（Phase 1 は SQLite で代替）の三つです。散文を構造化することで、矛盾検出を AI 非依存の SQL クエリで実現でき、`style_template` を Beat 単位で適用することで文体一貫性が機械的に保証され、通常の git diff では捉えられない「意味の変化」を Semantic Diff として表現できる、という三点の機械保証を獲得しています。実装は Phase 1（DB スキーマ・矛盾検出・CLI）、Phase 2（Structurizer / WriterAgent / ContinuityChecker / ChangeManager / SemanticDiff）、Phase 3（Rendering Engine / Web UI / MCP サーバー）まで完了し、テスト 263 件が PASS する状態です。

## 苦労した点・学んだこと

（要・本人記入）

## 現状とこれから

設計と Phase 1〜3 の実装が完了し、設計文書群（要件定義書・アーキテクチャ設計書・技術スタック仕様・具体例データモデル・未決事項と作業指示・商業化ロードマップ）が整備済み。商業化に向けたロードマップが既に書かれている段階ですが、現時点でこのプロジェクトはポートフォリオ上では「設計プロジェクト」として扱う方針です。今後の方向性については（要・本人記入）。

## 関連・参考

- 設計ドキュメント群: `要件定義書.md`、`アーキテクチャ設計書.md`、`技術スタック仕様.md`、`具体例_データモデル.md`、`未決事項と作業指示.md`、`商業化ロードマップ.md`（リポジトリ内）
- 実装本体: `novel-engine/` サブディレクトリ
