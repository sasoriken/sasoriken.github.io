---
# === 識別 ===
title: Folio
repo_name: 3d-book-generator-2
slug: folio
one_liner_ja: 小説を「3D の本」として手に取り、ページをめくって読む仮想図書館
one_liner_en: A virtual library where novels are 3D books — pick them up, flip the pages, read.

# === 分類 ===
category: creative_tool
status: wip
featured: false
visibility: restricted

# === リンク ===
repository_url: null
distribution_url: []
publication_url: null

# === 技術情報 ===
primary_language: TypeScript
tech_stack:
  - TypeScript
  - Vite
  - Three.js / React Three Fiber
  - Zod
  - Vitest
  - Playwright
  - ESLint (custom rules)
platforms:
  - Web
license: null

# === 期間・規模 ===
started: 2026-05
last_updated: 2026-05
scale: 中規模

# === 価格・配布形態 ===
pricing: unreleased

# === タグ・素材 ===
tags:
  - 3D book
  - virtual library
  - glTF
  - reading experience
  - SPA
thumbnail: ./assets/projects/folio/1.png
screenshots:
  - path: ./assets/projects/folio/1.png
    caption_ja: Folio の画面（1）
    caption_en: Folio screenshot (1)
---

## 概要 (JA)

Folio は、小説を「3D の本」として読む仮想図書館の体験を提供する Web アプリです。`.3dbook` という独自フォーマット（glTF の拡張仕様 `EXT_3d_book_data` を JSON で表現）を中心に、3D の本棚から本を取り出して読む読者向け面 `/library` と、`.3dbook` を編集・エクスポートする著者向け面 `/bindery` を、ひとつの SPA の中に同居させています。本という物体性とデジタルの編集性を 1 つのアプリで両立しようとする実験的なプロジェクトです。

## Overview (EN)

Folio is a single-page web app built around the idea of reading novels as 3D books. It centers on a custom `.3dbook` format (a JSON expression of a proposed glTF extension, `EXT_3d_book_data`) and exposes two surfaces in one SPA: `/library`, a reader-facing 3D bookshelf, and `/bindery`, an author-facing editor that produces and exports `.3dbook` files. It tries to keep the tactile feel of a physical book and the editability of a digital format inside one continuous experience.

## 動機・経緯

私がwebに連載している小説を3D化して読者に届けられたら面白いと思ったというのが経緯です。

## 技術的なポイント

設計の北極星として「疎結合 4 層（Presentation → Application → Domain ↔ Infrastructure）」「`useFrame` 内で new 禁止による GC スパイクゼロ」「`.3dbook` を Zod スキーマから型派生させる単一契約」「世界観連動 (`environmentDelta`) を v0.1 から経路確保」の 4 点を明文化し、それらをカスタム ESLint ルール (`folio/no-allocation-in-frame`)・`import/no-restricted-paths`・Zod スキーマで機械的に保証する形に落としているのが特徴です。テストは Vitest（単体）と Playwright（E2E）の二段構え。Vite + TypeScript を採用し、ホットリロード前提の開発フローを取ります。

## 苦労した点・学んだこと

本の 3D モデル構築をプロシージャルな方法で実現するところが非常に苦労した点で、今なお課題でもあります。プロシージャルではなく既存の 3D モデルを使うべきかもしれません。

## 現状とこれから

2026 年 5 月開始の比較的新しいプロジェクトで、マイルストーン M5「開いた本の中央くぼみ (gutter) の表現」までが取り込まれています。設計ドキュメント (`DESIGN.md`, `TECH_STACK.md`) が継続的に更新されており、フェーズを切って段階的に機能を積み上げる進行をしています。今後の公開時期や配布形態をどうするかはまだ未定です。

## 関連・参考

- 設計資料: `DESIGN.md`、`TECH_STACK.md`（リポジトリ内）
