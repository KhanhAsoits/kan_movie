import {observer} from "mobx-react";
import {HStack, Text} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {TextInput} from "react-native";
import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";

const ProfileInputBox = ({val, setSate}) => {
    return (
        <>
            <Text mb={1} width={SCREEN_WIDTH - 100} fontSize={12} color={'gray.400'} textAlign={'left'}>
                {val.title.toUpperCase()}
            </Text>
            <HStack space={2} width={SCREEN_WIDTH - 100} borderRadius={6} borderWidth={2}
                    borderColor={'rgba(0,0,0,0.2)'} px={2}
                    py={3}>
                <Ionicons name={val.icon} size={val.size} color={'rgba(0,0,0,0.3)'}/>
                <TextInput onChangeText={text => {
                    setSate(val.title, text)
                }}
                           keyboardType={val.title === 'phone' ? 'number-pad' : val.title === 'email' ? "email-address" : "default"}
                           defaultValue={val.value}
                           maxLength={val.title === 'phone' ? 10 : 100}
                           style={{width: '90%', color: 'rgba(0,0,0,0.3)', fontSize: 12}}></TextInput>
            </HStack>
        </>

    )
}
export default observer(ProfileInputBox)