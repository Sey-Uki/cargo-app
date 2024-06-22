import {
  Card,
  GluestackUIProvider,
  Heading,
  Text,
  View,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Link, useLocalSearchParams, Stack } from "expo-router";

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
      <View style={{ height: 100 }} />
      <Text>Все заказы</Text>
      <Card size="lg" variant="filled" m="$3">
        <Heading mb="$1" size="md">
          {user}
        </Heading>
        <Text size="sm">На складе в Китае</Text>
      </Card>
      <Link href="/sign_in">Log out</Link>
    </GluestackUIProvider>
  );
}
