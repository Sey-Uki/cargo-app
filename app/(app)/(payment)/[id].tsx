import { ArrowLeft } from "@/components/ArrowLeft";
import { TopBar } from "@/components/TopBar";
import { useAppSelector } from "@/store";
import { selectOrders } from "@/store/slices/orders";
import { config } from "@gluestack-ui/config";
import { Button, ButtonText, FormControl, Heading } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { GluestackUIProvider, View } from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";

export default function Payment() {
  const { id } = useLocalSearchParams();
  const order = useAppSelector(selectOrders).find((item) => item.id === id);

  if (!order) {
    return <Text>Нет данных</Text>;
  }

  return (
    <GluestackUIProvider config={config}>
      <View style={{ height: 70 }} />
      <TopBar
        button={{
          jsx: <ArrowLeft />,
          onPress: () => router.back(),
        }}
        text="Оплата груза"
      />
      <View margin={15}>
        <Heading size="xl">Заказ #{id}</Heading>
        <View
          style={{
            backgroundColor: "#000000",
            height: 1,
            marginTop: 12,
            marginBottom: 12,
          }}
        />
        <Text size="xl" fontWeight="$medium" color="$black">
          Реквизиты для оплаты:
        </Text>
        <Text color="$black">220259896658889</Text>
        <Text color="$black">Получатель : Магомедов М.</Text>
        <View
          style={{
            backgroundColor: "#000000",
            height: 1,
            marginTop: 12,
            marginBottom: 12,
          }}
        />
        <View flexDirection="row" justifyContent="space-between">
          <Text size="xl" fontWeight="$medium" color="$black">
            К оплате
          </Text>
          <Text size="xl" fontWeight="$medium" color="$black">
            {order.cost}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#000000",
            height: 1,
            marginTop: 12,
            marginBottom: 12,
          }}
        />
        <Text size="xl" fontWeight="$medium" color="$black">
          Чек
        </Text>
        <Text color="#828282">Нажмите Прикрепить чек</Text>

        <FormControl gap={5} marginTop={15}>
          <Button bg="#0070FF" borderRadius="$md" height={52}>
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Скопировать реквизиты
            </ButtonText>
          </Button>
          <Button bg="$black" borderRadius="$md" height={52}>
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Прикрепить чек
            </ButtonText>
          </Button>
        </FormControl>
      </View>
    </GluestackUIProvider>
  );
}
