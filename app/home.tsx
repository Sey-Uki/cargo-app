import {
  Card,
  GluestackUIProvider,
  Heading,
  Text,
  View,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useLocalSearchParams } from "expo-router";

type Item = {
  id: string;
  weight: string;
  volume: string;
  cost: string;
  login: string;
  password: string;
};

const home = () => {
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
    </GluestackUIProvider>
  );
};

export default home;
