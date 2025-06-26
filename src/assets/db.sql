PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "songs" (
    "id" integer NOT NULL,
    "song_no" integer NOT NULL,
    "group_id" integer NOT NULL,
    "title" text,
    "title_ruby" text,
    "artist_id" integer NOT NULL,
    "artist" text,
    "artist_ruby" text,
    "info" text,
    PRIMARY KEY (id, song_no)
  );
INSERT INTO songs VALUES(946410,621851,990029,'01','ゼロイチ',213971,'女王蜂','ジョオウバチ','TVアニメ『アンデッドアンラック』オープニングテーマ');
INSERT INTO songs VALUES(692773,249842,297469,'あ','ア',206387,'クリープハイプ','クリープハイプ','');
INSERT INTO songs VALUES(843105,425277,666570,'ああ情熱のバンバラヤー','アアジョウネツノバンバラヤー',232945,'LinQ','リンク','テレビ東京系アニメ「妖怪ウォッチ」オープニング曲 / ニンテンドー3DSソフト「妖怪ウォッチバスターズ2 秘宝伝説バンバラヤー ソード/マグナム」エンディング曲');
INSERT INTO songs VALUES(254566,50763,36233,'唄い人','ウタイビト',7878,'清木場俊介','キヨキバシュンスケ','映画「探偵事務所5" ～5ナンバーで呼ばれる探偵たちの物語～」主題歌');
INSERT INTO songs VALUES(250281,3715,3715,'夢の中へ','ユメノナカヘ',4883,'井上陽水','イノウエヨウスイ','');
CREATE TABLE IF NOT EXISTS "meta" (
    "updated_at" datetime
  );
INSERT INTO meta VALUES('2025-06-26 17:27:16');
COMMIT;
