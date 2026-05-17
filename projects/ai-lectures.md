---
# === 識別 ===
title: AI-Lectures
repo_name: ai-lectures
slug: ai-lectures
one_liner_ja: 合成知性「Lecturia」が論文・数学・特許・音楽・法律を毎日自動解説する Web サイト
one_liner_en: A site where Lecturia, a fictional synthetic intelligence, auto-publishes daily lectures on papers, math, patents, music, and law.

# === 分類 ===
category: content_platform
status: active
featured: false
visibility: restricted

# === リンク ===
repository_url: null
distribution_url: []
publication_url: https://iselia-ai.com/

# === 技術情報 ===
primary_language: JavaScript
tech_stack:
  - Node.js
  - GitHub Actions (cron)
  - Cloudflare Pages
  - arXiv API
  - OpenAI 互換 API (Jules ダッシュボード)
platforms:
  - Web
license: null

# === 期間・規模 ===
started: 2026-05
last_updated: 2026-05
scale: 中規模

# === 価格・配布形態 ===
pricing: free

# === タグ・素材 ===
tags:
  - autonomous content
  - GitHub Actions
  - Cloudflare Pages
  - character-driven
  - paper digest
  - cron automation
thumbnail: ./assets/projects/ai-lectures/1.png
screenshots:
  - path: ./assets/projects/ai-lectures/1.png
    caption_ja: AI-Lectures の画面（1）
    caption_en: AI-Lectures screenshot (1)
---

## 概要 (JA)

AI-Lectures は、第9世代再帰推論型合成知性という設定のキャラクター「Lecturia」が、論文・数学・特許・音楽理論・法律といったジャンルを横断して解説するコンテンツサイトです。GitHub Actions の cron が arXiv API から論文を取得してキューに積み、Jules ダッシュボード経由で記事を生成し、3 層のバリデータ（structure / character / integrity）を通過したものを自動マージして Cloudflare Pages へ配信する、完全に無人運用の仕組みで動いています。月額コストはドメイン代のみで、人手介入なしに毎日コンテンツが増え続けることを設計の前提に置いています。

## Overview (EN)

AI-Lectures is a content site narrated by Lecturia, an in-universe "ninth-generation recursive synthetic intelligence" who reluctantly explains papers, mathematics, patents, music theory, and law to humanity. A GitHub Actions cron job pulls papers from the arXiv API into a queue, the Jules dashboard generates the articles, a three-layer validator (structure / character / integrity) gates the result, and Cloudflare Pages serves the merged content. The pipeline runs entirely without human intervention and costs only the domain fee per month.

## 動機・経緯

技術力向上のためには専門分野の論文を日常的に読むべきだと思っていたのですが、多趣味なので論文を読むことにあまり時間をかけたくない、という思いがありました。
ここにさらに英語が加わるとモチベーションは皆無です。そこで、ふとしたときに「生成 AI に論文の概略をまとめさせる」という手段の有用性に気づき、それならばと、この作業を全自動化したうえで、生成 AI にキャラクターを持たせてユーモアを足せば、論文を読むためのモチベーション維持に繋がると考えて実装しました。

## 技術的なポイント

「人格を持ったコンテンツ自動運営」を成立させるために、生成系の他に **キャラクター整合性バリデータ** を別レイヤーで挟んでいるのが構造上の特徴です。論文取得は arXiv API、生成は Jules ダッシュボード、マージとデプロイは GitHub Actions、配信は Cloudflare Pages のフリープランという、有償サービス無しで完結する選択をしています。直近のコミットでは「冷徹+皮肉基調 + 絶対評価デレ極稀」「論文内容に絡めたパターン集」など、キャラクター発話パターンの調整が継続的に行われており、テストは 259 件存在します。

## 苦労した点・学んだこと

本業では GitHub Actions にあまり触れる機会がなく、仕様の理解に少し苦労しました。加えて GitHub 上の UI は非常に分かりづらく、自分が UI を作るときの反面教師にしようと思いました。
それ以外では、キャラクターの一貫性を保つことに試行錯誤しました。アーキテクチャの特性上、AI 側で会話を超えた記憶を保持していないため、そのうえで一貫したキャラクターを成立させる必要があり、ここは現在も試行錯誤中です。

## 現状とこれから

2026 年 5 月時点でアクティブに運用中。コンテンツ自動生成・自動マージ・自動デプロイの全工程が稼働しています。直近では既存記事の新仕様への書き直し、Vtuber 化を視野に入れた発話設計など、キャラクター層の継続的な調整が続いています。今後の方向性については、UIの洗練を中心に進めていく予定です。

## 関連・参考

- 関連プロジェクト: `unit-omega`（同じく自動生成型コンテンツサイトの系統）
