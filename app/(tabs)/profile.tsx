import { ArrowRight } from "@/components/ArrowRight";
import { TopBar } from "@/components/TopBar";
import { useAppDispatch, useAppSelector } from "@/store";
import { logOut } from "@/store/slices/auth";
import { selectUserData } from "@/store/slices/user";
import { Button, ButtonText, Text, View } from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function profile() {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  return (
    <View flex={1} justifyContent="space-between">
      <View>
        <View style={{ height: 70 }} />
        <TopBar text="Профиль" />
        <View alignItems="center" padding={20}>
          <View
            width={64}
            height={64}
            style={{ backgroundColor: "#828282" }}
            borderRadius={100}
          />
        </View>
        <View>
          <View
            flexDirection="row"
            justifyContent="space-between"
            height={48}
            alignItems="center"
            padding={14}
          >
            <Text fontWeight={500}>Имя</Text>
            <Text>{userData?.firstName} {userData?.lastName}</Text>
            <ArrowRight />
          </View>
          <View
            flexDirection="row"
            justifyContent="space-between"
            height={48}
            alignItems="center"
            padding={14}
          >
            <Text fontWeight={500}>Email</Text>
            <Text>{userData?.email}</Text>
            <ArrowRight />
          </View>
        </View>
      </View>
      <Button
        margin={14}
        marginBottom={21}
        size="lg"
        borderRadius={8}
        bgColor="#CE1D1D"
        onPress={() => {
          dispatch(logOut());
          
          router.navigate({
            pathname: "/sign_in",
          });
        }}
      >
        <ButtonText>Выйти</ButtonText>
      </Button>
    </View>
  );
}
