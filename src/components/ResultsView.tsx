import { useDeferredValue } from "react";
import {
  Center,
  EmptyState,
  List,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { Song } from "../types/entity";
import { SongList } from "./SongList";

interface ResultsViewProps {
  songs: Song[];
  loading: boolean;
}

export const ResultsView = ({ songs, loading }: ResultsViewProps) => {
  const deferedSongs = useDeferredValue(songs);

  if (loading) {
    return (
      <Center p={8}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (songs.length === 0) {
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
    <SongList songs={deferedSongs} />
  );
};
