import { EmailAndPhone } from "@/components/EmailAndPhone";
import { ProfileField } from "@/components/ProfileField";
import { useAppDispatch, useAppSelector } from "@/store";
import { logOut } from "@/store/slices/auth";
import { selectUserData } from "@/store/slices/user";
import { Button, ButtonText, Heading, Text, View } from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function Profile() {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOut());
    router.replace("/sign_in");
  };

  return (
    <View flex={1} backgroundColor="#fff">
      <View style={{ height: 70 }} />

      <Heading textAlign="center" paddingBottom={9}>
        Профиль
      </Heading>
      <View
        justifyContent="space-between"
        backgroundColor="#F2F2F7"
        flex={1}
        paddingHorizontal={16}
      >
        <View gap={32} marginTop={32}>
          <ProfileField
            title="Имя"
            text={`${userData?.firstName || "Имя"} ${userData?.lastName}`}
          />
          <View>
            <Text
              color="#797676"
              paddingBottom={7}
              paddingLeft={16}
              fontFamily="SFProText-Regular"
              fontSize={14}
            >
              E-MAIL И ТЕЛЕФОН
            </Text>
            <EmailAndPhone
              email={userData?.email || "email"}
              phone={userData?.phone || "Телефон"}
            />
          </View>
          <ProfileField title="Код" text={userData?.code || "Код"} />
        </View>

        <Button
          marginBottom={21}
          size="lg"
          borderRadius={12}
          bgColor="#ffffff"
          onPress={onLogOut}
        >
          <ButtonText
            color="#FF3B30"
            fontFamily="SFProText-Medium"
            fontSize={16}
            softShadow="1"
          >
            Выйти
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}
