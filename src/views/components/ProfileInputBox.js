import {observer} from "mobx-react";
import {HStack, Text} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {TextInput} from "react-native";
import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";
import ThemeStore from "../../models/ThemeStore";

const ProfileInputBox = ({val, setSate}) => {
    return (
        <>
            <Text mb={1} width={SCREEN_WIDTH - 100} fontSize={12} color={ThemeStore.baseProps.text_black_06}
                  textAlign={'left'}>
                {val.title.toUpperCase()}
            </Text>
            <HStack space={2} width={SCREEN_WIDTH - 100} borderRadius={6} borderWidth={2}
                    borderColor={ThemeStore.baseProps.text_black_06} px={2}
                    py={3}>
                <Ionicons name={val.icon} size={val.size} color={ThemeStore.baseProps.text_black_06}/>
                <TextInput onChangeText={text => {
                    setSate(val.title, text)
                }}
                           keyboardType={val.title === 'phone' ? 'number-pad' : val.title === 'email' ? "email-address" : "default"}
                           defaultValue={val.value}
                           maxLength={val.title === 'phone' ? 10 : 100}
                           style={{width: '90%', color: ThemeStore.baseProps.text_24, fontSize: 12}}></TextInput>
            </HStack>
        </>

    )
}
export default observer(ProfileInputBox)