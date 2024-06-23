import {
  Card,
  GluestackUIProvider,
  Heading,
  Text,
  View,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useLocalSearchParams } from "expo-router";
import { ArrowRight } from "@/components/ArrowRight";
import { TopBar } from "@/components/TopBar";

type Item = {
  id: string;
  weight: string;
  volume: string;
  cost: string;
  login: string;
  password: string;
};

export default function index() {
  const { user } = useLocalSearchParams<{ user: string }>();

  return (
    <GluestackUIProvider config={config}>
      <View style={{ height: 70 }} />

      <TopBar text="Все заказы" />

      <Card
        bgColor="#EDEDED"
        size="lg"
        variant="filled"
        m="$3"
        borderColor="#81838F"
        borderWidth="$1"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <View>
          <Heading mb="$1" size="md">
            {user}
          </Heading>
          <Text size="sm">На складе в Китае</Text>
        </View>

        <ArrowRight />
      </Card>
    </GluestackUIProvider>
  );
}
