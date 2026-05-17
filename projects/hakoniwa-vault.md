---
# === 識別 ===
title: Hakoniwa Vault
repo_name: 3d-model-viewer-app
slug: hakoniwa-vault
one_liner_ja: VRM や GLB を含む 3D モデルを「収集・整理・展示・撮影」できる統合管理ソフト
one_liner_en: An integrated 3D asset manager for collecting, organizing, displaying, and capturing VRM, GLB, FBX, and OBJ models.

# === 分類 ===
category: tool_3d
status: active
featured: true
visibility: restricted

# === リンク ===
repository_url: null
distribution_url:
  - label: BOOTH
    url: https://varse.booth.pm/items/7173923
  - label: itch.io
    url: https://usasori-data.itch.io/hakoniwavault
publication_url: null

# === 技術情報 ===
primary_language: JavaScript
tech_stack:
  - Three.js
  - "@pixiv/three-vrm"
  - "@pixiv/three-vrm-animation"
  - Jest
platforms:
  - Web
  - Windows
license: Proprietary

# === 期間・規模 ===
started: 2025-12
last_updated: 2026-03
scale: 大規模

# === 価格・配布形態 ===
pricing: paid

# === タグ・素材 ===
tags:
  - 3D
  - VRM
  - asset management
  - collection
  - diorama
  - showcase
thumbnail: ./assets/projects/hakoniwa-vault/1.png
screenshots:
  - path: ./assets/projects/hakoniwa-vault/1.png
    caption_ja: Hakoniwa Vault の画面（1）
    caption_en: Hakoniwa Vault screenshot (1)
  - path: ./assets/projects/hakoniwa-vault/2.png
    caption_ja: Hakoniwa Vault の画面（2）
    caption_en: Hakoniwa Vault screenshot (2)
---

## 概要 (JA)

Hakoniwa Vault は、GLB / GLTF / FBX / OBJ / VRM 形式の 3D モデルを一元管理するためのソフトウェアです。タグ・評価・メモを使ったコレクション管理に加えて、複数のモデルを自由に配置して自作のジオラマを組めるワークスペース、SSAO・被写界深度・カラーグレーディング等の描画機能を備えるショーケースモード、キーフレームでカメラワークを組めるシネマティック・パスファインダーまでを一本にまとめています。VRM モデルは表情・ポーズ・スプリングボーン（髪揺れ）まで対応し、コレクション目的でも撮影目的でも使えます。

## Overview (EN)

Hakoniwa Vault is a desktop and web application that brings 3D model collecting, organizing, displaying, and creative composition into a single workflow. It handles GLB, GLTF, FBX, OBJ, and VRM models, with rich metadata (tags, rating, notes), a free-form workspace for building dioramas from multiple models, and a "showcase" mode with SSAO, depth-of-field, and color grading for high-quality renders. VRM is supported end-to-end, including facial expressions, poses, and spring-bone hair physics, so the same library works for both archival and photography use cases.

## 動機・経緯

とあるシミュレーションゲームを作っているとき、ゲームで使用するアセットが数百種類まで溜まっていることがありました。それらを「どういうモデルなのか、大きさや角度はどうなっているか」を一目で確認したかったのですが、既存の 3D モデルビューワには求めるものがなく、自作することにしました。

## 技術的なポイント

レンダリングは Three.js で行い、VRM 系の表情・ポーズ・物理は `@pixiv/three-vrm` および `@pixiv/three-vrm-animation` に委譲する構成です。`__mocks__` と `jest.setup.js` が用意されており、Three.js モジュールを Jest 上でモックして単体テストを回す形を取っています。アセット管理は独自のメタデータレイヤー（タグ・評価・メモ・テクスチャバリエーション）を持ち、元モデルファイルを書き換えずに差分情報として保存します。プロモードの描画機能（SSAO・DoF・LUT）と、ポアソン・ディスク配置やフラクタル・インスタンシングといったプロシージャル配置機能を持つ点が、単なるビューワーと差別化される要素です。

## 苦労した点・学んだこと

Three.js 自体が初めてだったので、一から仕様を理解するところに労力を割きました。特に苦労したのは、さまざまな 3D モデル拡張子の対応です。
これらを適切に変換したり、古いバージョンで作成されたものでも正しく表示されないといけない、今後のことを考えると保守性も担保しなければならない、という多面的な要件が絡んでくる中で、アーキテクチャの重要性を非常に学びました。

## 現状とこれから

2026 年 3 月時点のバージョン 0.7.5 が最新で、テクスチャバリエーション機能とサムネイル更新挙動の改善が直近の変更内容です。シネマティック・パスファインダー、プロシージャル配置、GIF 録画 UI などの拡張がここ数バージョンで連続して入っており、開発はアクティブに継続中です。今後の追加機能の方針は配布ページにあるロードマップを参照してください。

## 関連・参考

- 関連プロジェクト: `magic-circle-generator`（魔法陣ツールは過去にこのリポジトリから分離された）
