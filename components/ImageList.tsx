import { Image } from "@gluestack-ui/themed";
import { FlatList } from "react-native";

export const ImageList = ({ images }: any) => {
  return (
    <FlatList
      data={images}
      horizontal
      contentContainerStyle={{gap: 6}}
      style={{marginTop: 12}}
      showsHorizontalScrollIndicator={false}
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
