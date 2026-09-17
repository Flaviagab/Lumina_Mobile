import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function PdfViewer() {
    const { url } = useLocalSearchParams<{ url: string }>();

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <WebView
                source={{ uri: `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(url)}` }}
                style={{ flex: 1 }}
                mixedContentMode="always"
                originWhitelist={["*"]}
            />
        </SafeAreaView>
    );
}