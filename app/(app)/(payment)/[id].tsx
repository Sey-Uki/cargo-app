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
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Payment() {
  const { id } = useLocalSearchParams();
  const order = useAppSelector(selectOrders).find((item) => item.id === id);

  if (!order) {
    return <Text>Нет данных</Text>;
  }
  const [copy, setCopy] = useState(false);
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("220259896658889");
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
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
          {copy && (
            <Button bg="#157C13" borderRadius="$md" height={52}>
              <ButtonText fontSize="$sm" fontWeight="$medium">
                Скопировано!
              </ButtonText>
            </Button>
          )}
          {!copy && (
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
