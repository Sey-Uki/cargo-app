import { ImageItem } from "@/app/types/orders";
import { Image } from "@gluestack-ui/themed";
import { FlatList, Pressable } from "react-native";

type Props = {
  images: ImageItem[];
  setShowImgInfo?: any;
  showModal?: any;
};

export const ImageList = ({ images, setShowImgInfo, showModal }: Props) => {
  return (
    <FlatList
      data={images}
      horizontal
      contentContainerStyle={{ gap: 6 }}
      style={{ marginTop: 12 }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => {
              setShowImgInfo({ uri: item.src, alt: item.title });
              showModal(true);
            }}
          >
            <Image
              size="md"
              key={item.title}
              source={{
                uri: item.src,
              }}
              alt={item.title}
              borderRadius={8}
            />
          </Pressable>
        );
      }}
    />
  );
};
