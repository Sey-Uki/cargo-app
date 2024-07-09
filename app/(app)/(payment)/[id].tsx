import { ArrowLeft } from "@/components/ArrowLeft";
import { TopBar } from "@/components/TopBar";
import { useAppSelector } from "@/store";
import { selectOrders } from "@/store/slices/orders";
import {
  Button,
  ButtonText,
  FormControl,
  Heading,
  Text,
  View,
  Image,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getImage, uploadImageToFirebase } from "@/firebase-config";
import { Alert } from "react-native";
import axios from "axios";

const requisitesUrl = process.env.EXPO_PUBLIC_REQUISITES_API_URL as string;

export default function Payment() {
  const { id } = useLocalSearchParams();

  const orders = useAppSelector(selectOrders);

  const [isCopied, setIsCopied] = useState(false);

  const [image, setImage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [req, setReq] = useState<string[]>([]);

  const [cardNumber, cardHolder] = req

  useEffect(() => {
    setIsLoading(true);

    axios
      .get<{values: string[][]}>(requisitesUrl)
      .then(({ data: { values } }) => {
        setReq(values.flat());
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Ошибка при получении реквизитов", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const order = useMemo(() => {
    return orders.find((item) => item.id === id);
  }, [id, orders]);

  const copyToClipboard = useCallback(async () => {
    if (!cardNumber) return;

    await Clipboard.setStringAsync(cardNumber);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [cardNumber]);

  const pickImage = useCallback(async () => {
    try {
      const imageResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!imageResponse.canceled) {
        const { uri } = imageResponse.assets[0];

        await uploadImageToFirebase({
          uri,
          fileName: order?.id,
        });

        await getImage(order?.id)
          .then((uri) => setImage(uri))
          .catch((err) => console.error(err));
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(`Ошибка при загрузке изображения ${error.message}`);
      }
    }
  }, [order?.id]);

  useEffect(() => {
    getImage(order?.id)
      .then((uri) => setImage(uri))
      .catch((err) => console.error(err));
  }, [order?.id]);

  if (!order) {
    return <Text>Нет данных</Text>;
  }

  return (
    <View flex={1}>
      <View style={{ height: 70 }} />

      <TopBar
        button={{
          jsx: <ArrowLeft />,
          onPress: () => router.back(),
        }}
        text="Оплата груза"
      />

      <View margin={15} flex={1} justifyContent="space-between">
        <View>
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
          <Text color="$black">
            {isLoading && "Загрузка..."}

            {!isLoading && cardNumber && cardNumber}

            {!isLoading && !cardNumber && "Нет данных"}
          </Text>

          <Text color="$black">
            Получатель : {' '}
            {isLoading && "Загрузка..."}
            {!isLoading && cardHolder && cardHolder}
            {!isLoading && !cardHolder && "Нет данных"}
          </Text>
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
          {image && (
            <View marginTop={12}>
              <Image
                height={198}
                width={123}
                alt="Чек"
                source={{ uri: image }}
              />
            </View>
          )}
        </View>
        <FormControl gap={5} marginTop={15} paddingBottom={40}>
          {isCopied && (
            <Button bg="#157C13" borderRadius="$md" height={52}>
              <ButtonText fontSize="$sm" fontWeight="$medium">
                Скопировано!
              </ButtonText>
            </Button>
          )}
          {!isCopied && (
            <Button
              $active-opacity={0.5}
              bg="#0070FF"
              borderRadius="$md"
              height={52}
              onPress={copyToClipboard}
            >
              <ButtonText fontSize="$sm" fontWeight="$medium">
                Скопировать реквизиты
              </ButtonText>
            </Button>
          )}

          <Button
            bg="$black"
            borderRadius="$md"
            height={52}
            onPress={pickImage}
          >
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Прикрепить чек
            </ButtonText>
          </Button>
        </FormControl>
      </View>
    </View>
  );
}
