import { ReactNode } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  IconButton,
  Link,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import { BsGithub } from "react-icons/bs";
import { useAppContext } from "../AppContext";
import { useLastUpdatedDate } from "../hooks/useLastUpdatedDate";

const GITHUB_URL = "https://github.com/pikatenor/joysound-streamer-search"

interface InfoDialogProps {
  children?: ReactNode;
}

export const InfoDialog = ({ children: trigger }: InfoDialogProps) => {

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
        {trigger || (
          <Button size="sm" variant="plain" color="fg.muted" aria-label="open 'About this app'">
            <Text fontSize="xs">このアプリについて</Text>
          </Button>
        )}
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
                  このアプリでは、<Link href="https://store.steampowered.com/app/2939590" target="_blank" rel="noopener noreferrer">カラオケJOYSOUND for STREAMER <LuExternalLink /></Link> の収録楽曲を検索することができます。
                </Text>
                <Text>
                  曲名とアーティスト名から部分一致で検索できます。ひらがな・カタカナのみで入力すると読みがなでも検索します。
                </Text>
                <Text>
                  このアプリはJOYSOUND運営（株式会社エクシング）とは無関係の非公式アプリであり、情報の正確性を保証するものではありません。実際の収録内容については公式サイト・SNSやカラオケJOYSOUNDゲーム内でご確認ください。
                </Text>
                {formattedDate && (
                  <Text fontSize="sm" color="gray.500">
                    楽曲データ最終更新日: {formattedDate}
                  </Text>
                )}
                <HStack gap="1">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    asChild
                    aria-label="github link"
                  >
                    <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                      <BsGithub />
                    </Link>
                  </IconButton>
                </HStack>
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
