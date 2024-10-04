import { ImageItem } from "@/app/types/orders";
import { Image } from "@gluestack-ui/themed";
import { FlatList } from "react-native";

type Props = {
  images: ImageItem[];
};

export const ImageList = ({ images }: Props) => {
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
          <Image
            size="md"
            source={{
              uri: item.src,
            }}
            alt={item.title}
            borderRadius={8}
          />
        );
      }}
    />
  );
};
