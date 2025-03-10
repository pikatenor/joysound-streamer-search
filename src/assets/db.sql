CREATE TABLE "meta" (
    "updated_at" datetime
);
INSERT INTO "meta" ("updated_at") VALUES ('2025-03-10 18:51:20');

CREATE TABLE "songs" (
    "id" integer NOT NULL,
    "song_no" integer NOT NULL,
    "group_id" integer NOT NULL,
    "title" text,
    "title_ruby" text,
    "artist" text,
    "artist_ruby" text,
    "info" text,
    PRIMARY KEY (id, song_no)
);

INSERT INTO "songs" ("id", "song_no", "group_id", "title", "title_ruby", "artist", "artist_ruby", "info") VALUES
('250281', '3715', '3715', '夢の中へ', 'ユメノナカヘ', '井上陽水', 'イノウエヨウスイ', ''),
('254566', '50763', '36233', '唄い人', 'ウタイビト', '清木場俊介', 'キヨキバシュンスケ', '映画「探偵事務所5" ～5ナンバーで呼ばれる探偵たちの物語～」主題歌'),
('692773', '249842', '297469', 'あ', 'ア', 'クリープハイプ', 'クリープハイプ', ''),
('843105', '425277', '666570', 'ああ情熱のバンバラヤー', 'アアジョウネツノバンバラヤー', 'LinQ', 'リンク', 'テレビ東京系アニメ「妖怪ウォッチ」オープニング曲 / ニンテンドー3DSソフト「妖怪ウォッチバスターズ2 秘宝伝説バンバラヤー ソード/マグナム」エンディング曲'),
('946410', '621851', '990029', '01', 'ゼロイチ', '女王蜂', 'ジョオウバチ', 'TVアニメ『アンデッドアンラック』オープニングテーマ');
