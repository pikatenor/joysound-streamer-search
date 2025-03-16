import {
    Button,
    CloseButton,
    Dialog,
    Link,
    Portal,
    Stack,
    Text,
} from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

export const PrivacyPolicyDialog = () => {
    return (
        <Dialog.Root placement="center">
            <Dialog.Trigger asChild>
                <Button size="sm" variant="plain" color="fg.muted">
                    <Text fontSize="xs">プライバシーポリシー</Text>
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>プライバシーポリシー</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack gap="2">
                                <Text>
                                    当サイトでは、アクセスログの収集・解析にGoogleアナリティクスを使用しています。
                                </Text>
                                <Text>
                                    Googleアナリティクスはデータの収集のためにCookieを使用しています。
                                    このデータは匿名で収集されており、個人を特定するものではありません。
                                    また、収集されるログは、Google社のプライバシーポリシーに基づいて管理されます。
                                </Text>
                                <Text>
                                    <Link href="https://marketingplatform.google.com/about/" target="_blank" rel="noopener noreferrer">
                                        Google アナリティクス <LuExternalLink />
                                    </Link>
                                </Text>
                                <Text>
                                    <Link href="https://policies.google.com/privacy?hl=ja&gl=jp" target="_blank" rel="noopener noreferrer">
                                        Google プライバシーポリシー <LuExternalLink />
                                    </Link>
                                </Text>
                                <Text>
                                    Google アナリティクス オプトアウト アドオンを利用してGoogleアナリティクスのトラッキングを拒否することが可能です。
                                    アナリティクスの利用を拒否する場合は、下記リンクよりアドオンをダウンロードして、ご利用のブラウザにインストールしてください。

                                </Text>
                                <Text>
                                    <Link href="https://tools.google.com/dlpage/gaoptout?hl=ja" target="_blank" rel="noopener noreferrer">
                                        Google アナリティクス オプトアウト アドオン <LuExternalLink />
                                    </Link>
                                </Text>
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
