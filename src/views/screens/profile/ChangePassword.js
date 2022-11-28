import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Text, VStack} from "native-base";
import ThemeStore from "../../../models/ThemeStore";
import {ActivityIndicator, Alert, TextInput, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import UserStore from "../../../models/UserStore";

const ChangePassword = () => {
    const nav = useNavigation()
    const [loading, setLoading] = useState(false)
    const handleBack = () => {
        nav.goBack()
    }
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const handleChangePassword = async () => {
        setLoading(true)
        setTimeout(async () => {
            if (newPassword.trim().length >= 8 && newPassword.trim().length >= 8) {
                if (oldPassword !== newPassword) {
                    if (await UserStore.onCheckOldPassword(oldPassword)) {
                        await UserStore.onChangePassword()
                    } else {
                        Alert.alert('Waning', 'Old password incorrect.')
                    }
                } else {
                    Alert.alert('Waning', 'New password can not contain old password')
                }

            } else {
                Alert.alert('Notification', 'Password must be rather than 8 character.')
            }
            setLoading(false)
        }, 500)

    }
    return (
        <NativeBaseProvider>
            <Box flex={1} px={4} bgColor={ThemeStore.baseProps.themeBg}>
                <HStack justifyContent={'space-between'} my={8} alignItems={'center'}>
                    <TouchableOpacity activeOpacity={.9} onPress={handleBack}>
                        <Ionicons name={'chevron-back'} color={ThemeStore.baseProps.text_24} size={30}/>
                    </TouchableOpacity>
                    <Text color={ThemeStore.baseProps.text_24} fontSize={22} fontWeight={'500'} letterSpacing={1.5}>Change
                        Password</Text>
                    {loading ?
                        <ActivityIndicator size={30} color={ThemeStore.baseProps.text_24}/> :
                        <></>
                    }
                </HStack>
                <VStack space={2}>
                    <VStack>
                        <TextInput
                            onChangeText={text => setOldPassword(text)}
                            placeholder={'Old password'}
                            placeholderTextColor={ThemeStore.baseProps.text_black_02}
                            style={{
                                width: '100%',
                                backgroundColor: ThemeStore.baseProps.text_black_02,
                                fontSize: 16,
                                paddingVertical: 16,
                                paddingHorizontal: 12,
                                borderRadius: 8,
                                color: ThemeStore.baseProps.text_black_06
                            }}
                        />
                    </VStack>
                    <VStack>
                        <TextInput
                            onChangeText={text => setNewPassword(text)}
                            placeholder={'New password'}
                            placeholderTextColor={ThemeStore.baseProps.text_black_02}
                            style={{
                                width: '100%',
                                backgroundColor: ThemeStore.baseProps.text_black_02,
                                fontSize: 16,
                                paddingVertical: 16,
                                paddingHorizontal: 12,
                                borderRadius: 8,
                                color: ThemeStore.baseProps.text_black_06
                            }}
                        />
                    </VStack>
                    <TouchableOpacity
                        onPress={handleChangePassword}
                        style={{width: '100%', backgroundColor: 'red', paddingVertical: 12, borderRadius: 10}}>
                        <Text textAlign={'center'} color={'white'} fontSize={18} fontWeight={'500'}>Save</Text>
                    </TouchableOpacity>
                </VStack>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(ChangePassword)