---
# === 識別 ===
title: 3D 魔法陣アニメジェネレータ
repo_name: magic-circle-generator
slug: magic-circle-generator
one_liner_ja: ゲーム・映像制作向けに 3D 魔法陣をプロシージャル生成し、アニメ付き GLB 等で書き出せるツール
one_liner_en: A procedural 3D magic-circle generator for game and video production, exporting to animated GLB, OBJ, PNG, and spritesheets.

# === 分類 ===
category: gamedev
status: active
featured: true
visibility: restricted

# === リンク ===
repository_url: null
distribution_url:
  - label: BOOTH (PRO + FREE)
    url: https://varse.booth.pm/items/8044318
publication_url: null

# === 技術情報 ===
primary_language: JavaScript
tech_stack:
  - Three.js
  - Tauri v2 (Rust)
  - Vite
  - npm workspaces / pnpm
  - Jest
platforms:
  - Web
  - Windows
license: Proprietary

# === 期間・規模 ===
started: 2025-12
last_updated: 2026-05
scale: 大規模

# === 価格・配布形態 ===
pricing: freemium

# === タグ・素材 ===
tags:
  - magic circle
  - procedural generation
  - 3D
  - game asset
  - GLB export
  - Three.js
  - Tauri
thumbnail: ./assets/projects/magic-circle-generator/1.png
screenshots:
  - path: ./assets/projects/magic-circle-generator/1.png
    caption_ja: 3D 魔法陣アニメジェネレータの画面（1）
    caption_en: 3D Magic Circle Animation Generator screenshot (1)
  - path: ./assets/projects/magic-circle-generator/2.png
    caption_ja: 3D 魔法陣アニメジェネレータの画面（2）
    caption_en: 3D Magic Circle Animation Generator screenshot (2)
---

## 概要 (JA)

3D 魔法陣アニメジェネレータは、リング・多角形・星形・ルーン文字・パーティクル等のレイヤーを積み重ねて魔法陣をプロシージャルに組み立て、ゲームエンジンや映像編集ソフトで使えるアセットとして書き出せるツールです。Web 版と Tauri v2 によるネイティブデスクトップ版（Windows）のデュアル構成で、ブラウザでもアプリでも同じ機能が使えます。アニメ付き GLB、OBJ、透過 PNG、連番 PNG（ZIP）、スプライトシート、テクスチャ PNG など複数の出力形式に対応し、エンジン側に持ち込んでそのまま使える前提で作られています。基本セット 10 種のプリセット（Classic / Runic / Demonic / Grand / Celestial / Chrono / Cyber / Bloom / Celtic / Dense）に加え、JSON インポートで追加コレクション（DLC 想定）も読めます。

## Overview (EN)

The 3D Magic Circle Animation Generator builds magic circles procedurally by stacking layers — rings, polygons, star shapes, runes, particles, auras — and exports them as engine-ready assets. It ships as a dual Web / Tauri v2 desktop app (Windows), so the same toolset runs in a browser or as a native app. Outputs include animated GLB with multiple clips, OBJ, transparent PNG, frame-by-frame PNG ZIPs, spritesheets, and flat texture PNGs, all designed to drop straight into a game engine or compositor. Ten built-in presets (Classic, Runic, Demonic, Grand, Celestial, Chrono, Cyber, Bloom, Celtic, Dense) come standard, and a JSON import path lets the tool ingest additional preset collections.

## 動機・経緯

このツールはもともと Hakoniwa Vault 内部の魔法陣ツールとして始まり、後に独立した別リポジトリ (`magic-circle-generator`) として分離された経緯があります。
動機としては、Hakoniwa Vault のディスプレイ用に魔法陣を作っていたときに、プロシージャルで 3D モデルを作ることそのものへの興味が湧いたことに加え、これにデータ駆動設計を組み合わせたら面白そうだと感じたためです。そこで本体から分離して、本格的に一つのツールとして作り直しました。

## 技術的なポイント

レンダリングは Three.js、デスクトップ化は Tauri v2 + Rust、ビルドは Vite、リポジトリ管理は npm workspaces + pnpm-workspace で `apps/web/` `packages/core/` `packages/shared/` のモノレポ構成を取っています。コア部分は `Assembler.js`（JSON → Three.js シーン）、コンポーネント（リング・図形・ルーン・エフェクト）、エクスポーター（`AnimationExporter` が GLB のマルチクリップ出力を担当）、ファクトリ（バリエーション生成）、モディファイア（マテリアル変換）、プリセットというモジュール分割で、GUI と切り離して使える設計です。PRO と FREE はビルドスクリプト (`npm run tauri:build` / `npm run tauri:build:free`) の段階で切り替わり、それぞれ別パッケージとして `release-package/` と `release-package-free/` に出力されます。

## 苦労した点・学んだこと

学びの中心はデータ駆動設計の有用性です。優れているところを具体的に挙げると、保守性が非常に良いこと、作成した魔法陣を構造化した文字列の塊だけで保存・復元できるため共有に向くこと、そして同じ仕組みのまま後々 DLC 等として追加販売も可能なこと、の三点です。この設計の良さを実装を通して肌で感じました。

## 現状とこれから

2026 年 5 月時点で開発はアクティブに進行中。PR 番号は #236 を超えており、CI の自動マージフロー（jules ラベル検知、即時マージリトライ等）が継続的に整備されています。法務面の整備（EULA、プライバシーポリシー、サードパーティ通知、コマーシャルリリースチェックリスト）は日英両言語版が揃っており、有料リリースを前提とした体制が整えられています。今後のロードマップは未定。

## 関連・参考

- 関連プロジェクト: `hakoniwa-vault`（このツールの前身が含まれていた）
- BOOTH 商品ページ: https://varse.booth.pm/items/8044318 （PRO 版と FREE 版が同一ページで入手可能）
