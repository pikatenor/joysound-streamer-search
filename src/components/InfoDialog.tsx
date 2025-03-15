import { useAppContext } from "../AppContext";
import { useLastUpdatedDate } from "../hooks/useLastUpdatedDate";
import {
  CloseButton,
  Dialog,
  IconButton,
  Link,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuExternalLink, LuInfo } from "react-icons/lu";

export const InfoDialog = () => {
  const { initialized } = useAppContext();
  const { lastUpdated } = useLastUpdatedDate(initialized);

  const formattedDate = lastUpdated?.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <IconButton>
          <LuInfo />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>カラオケJOYSOUND for STREAMER 検索</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="2">
                <Text>
                  このアプリでは、<Link href="https://store.steampowered.com/app/2939590" target="_blank">カラオケJOYSOUND for STREAMER <LuExternalLink /></Link> の収録楽曲を検索することができます。
                </Text>
                <Text>
                  曲名とアーティスト名から部分一致で検索できます。ひらがな・カタカナのみで入力すると読みがなでも検索します。
                </Text>
                <Text>
                  このアプリはJOYSOUND運営（株式会社エクシング）とは無関係の非公式アプリであり、情報の正確性を保証するものではありません。実際の収録内容については公式アプリ内でご確認ください。
                </Text>
                {formattedDate && (
                  <Text fontSize="sm" color="gray.500">
                    データ最終更新日: {formattedDate}
                  </Text>
                )}
              </Stack>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
