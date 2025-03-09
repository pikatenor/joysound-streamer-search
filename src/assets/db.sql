CREATE TABLE "meta" (
    "updated_at" datetime
);
-- INSERT INTO "meta" ("updated_at") VALUES ('2025-03-02');

CREATE TABLE "songs" (
    "id" integer NOT NULL,
    "song_no" integer NOT NULL,
    "title" text,
    "title_ruby" text,
    "artist" text,
    "artist_ruby" text,
    PRIMARY KEY (id, song_no)
);
-- INSERT INTO "songs" ("id", "song_no", "title", "title_ruby", "artist", "artist_ruby") VALUES
-- ('250281', '3715', '夢の中へ', 'ユメノナカヘ', '井上陽水', 'イノウエヨウスイ'),
-- ('250282', '344', '夢の中へ', 'ユメノナカヘ', '斉藤由貴', 'サイトウユキ'),
-- ('250283', '33509', '夢の中へ', 'ユメノナカヘ', '榎本温子/鈴木千尋', 'エノモトアツコスズキチヒロ'),
-- ('250293', '10895', '蒼の世界', 'アオノセカイ', 'レミオロメン', 'レミオロメン'),
-- ('250330', '15761', 'ピクニック', 'ピクニック', '天地総子・クラウン少女合唱団', 'アマチフサコクラウンショウジョガッショウダン');
