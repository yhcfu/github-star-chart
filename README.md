# GitHub スター履歴

Next.js（App Router）+ GraphQL（Urql）のアプリケーションです。  
GitHub GraphQL APIを使用して、リポジトリのスター履歴を表示します。

> 注: GitHub GraphQL APIのスター履歴は100件ずつのcursorベースページネーションのみでしか取得できないため、大量にスター履歴を持つリポジトリを対象にすると、全てを取得するのに膨大な時間がかかる場合があります（アプリではこの操作ができないようにデフォルトで制限されています）

## 環境構築手順

1. リポジトリをクローンします。

   ```sh
   git clone https://github.com/yhcfu/github-star-chart.git
   ```

2. 必要な依存関係をインストールします（以降の手順はnpmでも可）

   ```sh
   pnpm install
   ```

3. 環境変数を設定します。`.env.example` を `.env` にコピーし、必要な値を設定します。

   ```sh
   cp .env.example .env
   ```

4. 開発サーバーを起動します。

   ```sh
   pnpm dev
   ```

5. ブラウザで `http://localhost:3000` にアクセスしてアプリケーションを確認します。

## 使用したライブラリと選定理由

Urqlなどでクライアントキャッシュを活用するシンプルなSPAで十分と思いReact Router v7で作り始めましたが、Next.jsのサーバーキャッシュがGraphQLでも使えそうなことを知り、サーバー側でのフェッチ戦略に振り切ったアプリケーションを作りたくなり、Next.jsに乗り換えました。

### コアライブラリ

#### Next.js 15（App Router）:

- 強力なキャッシュ戦略が利用できるため
- 今知識を抑えておけば今後活用する機会が多いと感じたため
- GraphQLとApp Routerの相性や今後の付き合い方を学びたかったため
- 使ったことがなく、使ってみたかったから

#### Tailwind CSS:

- EmotionなどのCSS-in-JSライブラリを長らく使っていたが、Server Componentsの時代はゼロランタイムが重要であると感じたため
- 後述するHeadless UIライブラリのshadcn/uiとの相性が良いため
- AIの自動生成やコード補完との相性が良いため（開発効率が上がる）
- 使ったことがなく、使ってみたかったから

#### shadch/ui

- Tailwind CSSとの相性が良いため
- UIライブラリやその依存ライブラリのバージョンアップなどに辟易しており、コードの所有権と制御権を利用者に与えるというshadch/uiのコンセプトが気に入ったため
- 使ったことがなく、使ってみたかったから

#### Recharts

- shadow/uiやTailwind CSSとの相性が良いため
- 数あるグラフ描画ライブラリの中で、自分が一番好きな見た目だったから

### GraphQLクライアント

#### Urql

- 軽量で拡張性が高く、[機能のカバー範囲が広い](https://commerce.nearform.com/open-source/urql/docs/comparison/#core-features)ため
- 使うことが確定しているgql.tadaがスポンサーをしているため（今後のサポートが期待できる）
- 使い慣れているため

#### gql.tada

- TypeScriptでGraphQLのクエリを書くのであればこのツール意外考えられないため

### フォームバリデーション

（一箇所のみですが）

#### valibot

- 有名なzodはバンドルサイズの肥大化やAPIの複雑化が気になったため
- 使ったことがなく、使ってみたかったから

#### conform

- Server Actionsとのシームレスな統合が提供されているため
- 使ったことがなく、使ってみたかったから

### プログラミング支援AI

### v0

- Server Componentsの考え方を学んだりGraphQLのデータフェチ戦略を考えることに時間を割きたく、大まかなデザインや雛形の生成をAIに任せたかったため
- Vercel製なのでNext.jsと相性がよく、プロジェクトへの統合がスムーズに感じられたため

### GitHub Copilot

- 普段から使用しているため、引き続き利用した
- Googleで検索する代わりに質問したり、冗長なロジックをリファクタリングすることが多い

### その他、エコシステム

#### Biome

- ESLintより軽量、軽快、ゼロコンフィグでうれしいため

#### Prettier

- すべてをBiomeに寄せたかったが、Tailwind CSSの並び替えや改行に対応したプラグインがESLintかPrettierにしか存在しないため、やむなく利用

#### lefthook

- huskey+lint-stagedの代替として利用
- 設定が簡単でありがたいため
