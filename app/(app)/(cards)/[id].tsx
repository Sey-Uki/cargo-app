import { ArrowLeft } from "@/components/ArrowLeft";
import { TopBar } from "@/components/TopBar";
import { useAppSelector } from "@/store";
import { selectOrders } from "@/store/slices/orders";
import { config } from "@gluestack-ui/config";
import {
  Button,
  ButtonText,
  FormControl,
  GluestackUIProvider,
  Heading,
  Modal,
  ModalBackdrop,
  ModalContent,
  Text,
} from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";

export default function Info() {
  const { id } = useLocalSearchParams();
  const order = useAppSelector(selectOrders).find((item) => item.id === id);

  const [showInvoice, setShowInvoice] = useState(false)

  const ref = useRef(null)

  if (!order) {
    return <Text color="$black">Нет данных</Text>;
  }

  return (
    <GluestackUIProvider config={config}>
      <View style={{ height: 70 }} />

      <TopBar
        button={{
          jsx: <ArrowLeft />,
          onPress: () => router.back(),
        }}
        text="Информация"
      />

      <View margin={15} flex={1} justifyContent="space-between">
        <View>
          <Heading size="xl">Заказ #{order.id}</Heading>
          <Image
            source={order.img}
            style={{ width: "100%", height: 150 }}
            marginBottom={17}
            marginTop={27}
            alt="Груз"
          />
          <View gap={11}>
            <View flexDirection="row" justifyContent="space-between">
              <Text color="$black">Вес</Text>
              <Text color="$black">{order.weight}</Text>
            </View>
            <View flexDirection="row" justifyContent="space-between">
              <Text color="$black">Объем</Text>
              <Text color="$black">{order.volume}</Text>
            </View>
            <View flexDirection="row" justifyContent="space-between">
              <Text color="$black">Трекинг</Text>
              <Text color="$black">{order.location}</Text>
            </View>
            <View flexDirection="row" justifyContent="space-between">
              <Text color="$black">Статус</Text>
              <Text color="$black">
                {order.status === "paid" ? "Оплачено" : "Ждет оплаты"}
              </Text>
            </View>
          </View>

          <Button onPress={() => setShowInvoice(true)} ref={ref}>
            <ButtonText underline marginTop={15} color="#81838F">
              Накладная
            </ButtonText>
          </Button>

          <View
            marginTop={36}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Text size="xl" fontWeight="$medium" color="$black">
              Итого
            </Text>
            <Text size="xl" fontWeight="$medium" color="$black">
              {order.cost}
            </Text>
          </View>
        </View>
        <FormControl gap={5} marginTop={15} paddingBottom={40}>
          <Button bg="$black" borderRadius="$md" height={52}>
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Отслеживание
            </ButtonText>
          </Button>
          <Button
            bg="#157C13"
            borderRadius="$md"
            height={52}
            onPress={() => {
              router.navigate({
                pathname: "/(payment)/[id]",
                params: { id: order.id },
              });
            }}
          >
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Оплатить
            </ButtonText>
          </Button>
        </FormControl>

        <Modal
          isOpen={showInvoice}
          onClose={() => {
            setShowInvoice(false)
          }}
          finalFocusRef={ref}
        >
          <ModalBackdrop onFocus={() => setShowInvoice(false)} />
          <ModalContent style={{ flex: 0.5 }}>
            <Image
              source={order.invoice}
              style={{ width: "100%", objectFit: 'cover', flex: 1 }}
              marginBottom={17}
              marginTop={27}
              alt="Накладная"
            />
          </ModalContent>
        </Modal>

      </View>
    </GluestackUIProvider>
  );
}
