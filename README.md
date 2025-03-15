# joysound-streamer-search

![deploy status](https://github.com/pikatenor/joysound-streamer-search/actions/workflows/firebase-hosting-merge.yml/badge.svg)

[カラオケ JOYSOUND for STREAMER](https://store.steampowered.com/app/2939590/) の収録楽曲を検索できる非公式アプリケーションです。

このアプリは JOYSOUND 運営（株式会社エクシング）とは無関係の非公式アプリであり、情報の正確性を保証するものではありません。実際の収録内容については公式アプリ内でご確認ください。

## Develop

    npm ci
    npm run dev

this application uses [sqlite-wasm](https://github.com/sqlite/sqlite-wasm) for searching. the sqlite3 DB is located in `assets/db.sqlite` and `assets/db.sql` contains its schema and some example records.
