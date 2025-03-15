import { memo } from "react";
import {
  Box,
  VStack,
} from "@chakra-ui/react";
import { Song } from "../types/entity";
import { SongCard } from "./SongCard";

interface SongListProps {
  songs: Song[];
}

export const SongList = memo(({ songs }: SongListProps) => {
  return (
    <Box width="100%">
      <VStack gap="4" align="stretch">
        {songs.map((song) => (
          <SongCard key={`${song.id}-${song.song_no}`} song={song} />
        ))}
      </VStack>
    </Box>
  );
});
