import {
  Box,
  Center,
  EmptyState,
  List,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { Song } from "../utils/database";
import { SongCard } from "./SongCard";
import { memo } from "react";

interface SongListProps {
  songs: Song[];
  loading: boolean;
  empty: boolean;
}

export const SongList = memo(function SongList({ songs, loading, empty }: SongListProps) {
  if (loading) {
    return (
      <Center p={8}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (empty) {
    return (
      <EmptyState.Root size="lg">
        <EmptyState.Content>
          <EmptyState.Indicator>
            <LuSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>検索結果なし</EmptyState.Title>
            <EmptyState.Description>
              No songs found matching your search criteria.
            </EmptyState.Description>
          </VStack>
          <List.Root variant="marker">
            <List.Item>曲名・アーティスト名を部分一致で検索します</List.Item>
            <List.Item>ひらがな・カタカナのみで入力すると読みがなでも検索します（前方一致）</List.Item>
          </List.Root>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

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
