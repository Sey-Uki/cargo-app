import { getOrderById } from "@/app/api/orders";
import { TRACKING, TRACKING_STATUSES } from "@/app/data/orders";
import { OrderItem } from "@/app/types/orders";
import { ArrowLeft } from "@/components/ArrowLeft";
import { TopBar } from "@/components/TopBar";
import { localizeDate } from "@/utils";

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
  ArrowRightIcon,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image } from "react-native";

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
    return (
      <>
        <View style={{ height: 70 }} />
        {isLoading && (
          <View height="100%" backgroundColor="#F2F2F7">
            <Spinner color="$emerald600" paddingTop={50} size="large" />
          </View>
        )}
        <Text color="$black">Нет данных</Text>
      </>
    );
  }

  return (
    <View flex={1} backgroundColor="white">
      <View style={{ height: 70 }} />
      <TopBar
        button={{
          jsx: <ArrowLeft />,
          onPress: () => router.back(),
        }}
        text={`#${order.code} от ${localizeDate(new Date(order.createdate))}`}
      />

      <View flex={1} backgroundColor="#F2F2F7">
        <View
          borderBottomRightRadius={8}
          borderBottomLeftRadius={8}
          padding={16}
          justifyContent="space-between"
          backgroundColor="white"
        >
          <View>
            <Heading marginBottom={12} size="xl">
              Отправка
            </Heading>
            <View>
              <Text color="#939090" size="sm">
                Статус
              </Text>
              <View flexDirection="row" justifyContent="space-between">
                <Text fontWeight={500} size="md" color="$black">
                  {
                    TRACKING_STATUSES[
                      order.tracking?.[order.tracking.length - 1].status
                    ]
                  }
                </Text>
                <Icon as={ArrowRightIcon} color="#939090" />
                <Text color="#797676">
                  {TRACKING_STATUSES[
                    TRACKING[
                      TRACKING.indexOf(
                        order.tracking?.[order.tracking.length - 1].status
                      ) + 1
                    ]
                  ] || ""}
                </Text>
              </View>
              <View
                marginVertical={12}
                style={{ backgroundColor: "#E6E6E6", height: 1 }}
              />
            </View>
            <View gap={10}>
              <View flexDirection="row">
                <View marginRight={139}>
                  <Text color="#797676" size="sm">
                    Вес
                  </Text>
                  <Text color="$black" size="md" fontWeight={500}>
                    {order.invoice.weight} кг
                  </Text>
                </View>
                <View>
                  <Text color="#797676" size="sm">
                    Объем
                  </Text>
                  <Text color="$black" size="md" fontWeight={500}>
                    {order.invoice.volume} м³
                  </Text>
                </View>
              </View>
              <View>
                <Text color="#797676" size="sm">
                  Стоимость за 1 кг
                </Text>
                <Text color="$black" size="md" fontWeight={500}>
                  {order.invoice.price} ₽
                </Text>
              </View>
            </View>
            <View
              marginVertical={12}
              style={{ backgroundColor: "#E6E6E6", height: 1 }}
            />
            <Pressable onPress={() => setShowInvoice(true)} ref={ref}>
              <Text color="#0070FF" fontWeight={500} size="sm">
                Открыть накладную от Magic Trans
              </Text>
            </Pressable>
          </View>
        </View>
        {/* <View
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
          </View> */}

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
            <Image
              source={{ uri: order.magicTransImage?.src }}
              style={{ width: "100%", objectFit: "cover", flex: 1 }}
              alt={order.magicTransImage?.title}
            />
          </ModalContent>
        </Modal>
      </View>
    </View>
  );
}
