import { Modal, ModalContent } from "@gluestack-ui/themed";
import { TopBar } from "./TopBar";
import { Image } from "@gluestack-ui/themed";
import { useCallback } from "react";
import { Alert } from "react-native";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

type Props = {
  title: string;
  text?: string;
  showModal: boolean;
  onHideModal: () => void;
  img: {
    uri: string | undefined;
    alt: string | undefined;
  };
};

export const ImageModal = ({
  title,
  text,
  showModal,
  onHideModal,
  img,
}: Props) => {
  const getPermission = useCallback(async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Ошибка", "Необходимо разрешение на доступ к медиафайлам");

      return false;
    }

    return true;
  }, []);

  const onDowload = useCallback(async () => {
    if (!img.uri || !img.alt) return;

    const permission = await getPermission();

    if (!permission) return;

    try {
      const { uri: localUri } = await FileSystem.downloadAsync(
        img.uri,
        FileSystem.documentDirectory + img.alt
      );

      const asset = await MediaLibrary.createAssetAsync(localUri);
      const album = await MediaLibrary.getAlbumAsync("Eleven Cargo");

      if (album === null) {
        await MediaLibrary.createAlbumAsync("Eleven Cargo", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert("Сохранено");
    } catch (error) {
      Alert.alert("Ошибка", "Необходимо разрешение на доступ к медиафайлам");
      console.error(error);
    }
  }, [img]);

  return (
    <Modal isOpen={showModal}>
      <ModalContent
        style={{ height: "100%", paddingVertical: 60, width: "100%" }}
      >
        <TopBar
          left={{ text: "Назад", onPress: onHideModal }}
          right={{ text: "Скачать", onPress: onDowload }}
          title={title}
          text={text}
        />
        <Image
          source={{ uri: img.uri }}
          style={{ objectFit: "contain", flex: 1, width: "100%" }}
          alt={img.alt}
        />
      </ModalContent>
    </Modal>
  );
};
