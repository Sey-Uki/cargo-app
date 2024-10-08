import { getOrderById } from "@/app/api/orders";
import { OrderItem } from "@/app/types/orders";
import { ArrowLeft } from "@/components/ArrowLeft";
import { TopBar } from "@/components/TopBar";

import {
  Button,
  ButtonText,
  CloseIcon,
  FormControl,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalContent,
  Pressable,
  Text,
  ModalCloseButton,
  View,
  Spinner,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function Info() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderItem>();

  const [showInvoice, setShowInvoice] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    getOrderById(id as string)
      .then((data) => setOrder(data as OrderItem))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (!order) {
    return <Text color="$black">Нет данных</Text>;
  }

  return (
    <View flex={1}>
      <View style={{ height: 70 }} />
      {isLoading && (
        <View height="100%" backgroundColor="#F2F2F7">
          <Spinner color="$emerald600" paddingTop={50} size="large" />
        </View>
      )}
      <TopBar
        button={{
          jsx: <ArrowLeft />,
          onPress: () => router.back(),
        }}
        text={`#${order.code}`}
      />

      <View margin={15} flex={1} justifyContent="space-between">
        <View>
          <Heading size="xl">Заказ #{order.id}</Heading>
          {/* <Image
            source={order.img}
            style={{ width: "100%", height: 150 }}
            marginBottom={17}
            marginTop={27}
            alt="Груз"
          /> */}
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
              <Text color="$black">
                {/* {order.location
                  .split("-")
                  [order.location.split("-").length - 1].trim()} */}
              </Text>
            </View>
            <View flexDirection="row" justifyContent="space-between">
              <Text color="$black">Статус</Text>
              <Text color="$black">
                {order.status === "paid" ? "Оплачено" : "Ждет оплаты"}
              </Text>
            </View>
          </View>

          <Pressable onPress={() => setShowInvoice(true)} ref={ref}>
            <Text underline marginTop={15} color="#81838F">
              Накладная
            </Text>
          </Pressable>

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
          <Button
            bg="$black"
            borderRadius="$md"
            height={52}
            onPress={() => {
              router.navigate({
                pathname: "/(traking)/[id]",
                params: { id: order.id },
              });
            }}
          >
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
            setShowInvoice(false);
          }}
          finalFocusRef={ref}
        >
          <ModalBackdrop />
          <ModalContent style={{ flex: 0.5 }}>
            <ModalCloseButton alignSelf="flex-end">
              <Icon as={CloseIcon} width={30} height={30} />
            </ModalCloseButton>
            {/* <Image
              source={order.invoice}
              style={{ width: "100%", objectFit: "cover", flex: 1 }}
              alt="Накладная"
            /> */}
          </ModalContent>
        </Modal>
      </View>
    </View>
  );
}
