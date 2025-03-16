export interface Song {
  id: number;
  song_no: number;
  group_id: number;
  title: string;
  artist_id: number;
  artist: string;
  aux_info: string | null;
}

export type LastUpdate = Date;
