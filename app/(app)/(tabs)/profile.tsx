import { ProfileText } from "@/components/ProfileText";
import { TopBar } from "@/components/TopBar";
import { useAppDispatch, useAppSelector } from "@/store";
import { logOut } from "@/store/slices/auth";
import { selectUserData } from "@/store/slices/user";
import { Button, ButtonText, View } from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function Profile() {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  return (
    <View flex={1} backgroundColor="#fff">
      <View style={{ height: 70 }} />
      <TopBar text="Профиль" />
      <View
        justifyContent="space-between"
        backgroundColor="#F2F2F7"
        flex={1}
        paddingHorizontal={16}
      >
        <View>
          <ProfileText
            infoText={"Имя"}
            userText={`${userData?.firstName} ${userData?.lastName}`}
          />

          <ProfileText infoText={"Email"} userText={userData?.email} />

          <ProfileText infoText={"Телефон"} userText={"+7 (999) 999 99-99"} />

          <ProfileText infoText={"Код"} userText={"6438819"} />
        </View>

        <Button
          marginBottom={21}
          size="lg"
          borderRadius={8}
          bgColor="#CE1D1D"
          onPress={() => {
            dispatch(logOut());
            router.replace("/sign_in");
          }}
        >
          <ButtonText>Выйти</ButtonText>
        </Button>
      </View>
    </View>
  );
}
