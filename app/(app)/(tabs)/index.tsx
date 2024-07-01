import {
  Card,
  GluestackUIProvider,
  Heading,
  Text,
  View,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { ArrowRight } from "@/components/ArrowRight";
import { TopBar } from "@/components/TopBar";
import { useAppSelector } from "@/store";
import { selectOrders } from "@/store/slices/orders";
import { Pressable, FlatList } from "react-native";
import { router } from "expo-router";

export default function index() {
  const ordersList = useAppSelector(selectOrders);

  return (
    <GluestackUIProvider config={config}>
      <View flex={1} backgroundColor="#fff">
        <View style={{ height: 70 }} />

        <TopBar text="Все заказы" />
        <View>
          <FlatList
            style={{height: "100%", paddingTop: 14}}
            data={ordersList}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  router.navigate({
                    pathname: "/(cards)/[id]",
                    params: { id: item.id },
                  });
                }}
              >
                <Card
                  bgColor={
                    item.status === "paid" ? "rgba(21, 124, 19, 0.15)" : "#FFFFFF"
                  }
                  size="lg"
                  variant="filled"
                  m="$0.5"
                  borderColor={item.status === "paid" ? "#157C13" : "#81838F"}
                  borderWidth="$1"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderRadius={4}
                >
                  <View gap={3}>
                    <Heading size="md">{item.id}</Heading>
                    <Text size="sm" color="$black">
                      {item.location}
                    </Text>
                    {item.status !== "transit" && (
                      <Text
                        size="sm"
                        color={item.status === "paid" ? "#157C13" : "#000000"}
                        fontWeight={500}
                      >
                        {item.status === "paid" ? "Оплачено" : "Ждет оплаты"}
                      </Text>
                    )}
                  </View>

                  <ArrowRight />
                </Card>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </GluestackUIProvider>
  );
}
