import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Image, ScrollView, Text, VStack} from "native-base";
import {ActivityIndicator, Alert, SafeAreaView, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SCREEN_WIDTH} from "../../../core/helper";
import UserStore from "../../../models/UserStore";
import default_avatar from "../../../../assets/static/images/user.png";
import ProfileInputBox from "../../components/ProfileInputBox";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import ThemeStore from "../../../models/ThemeStore";
import {useNavigation} from "@react-navigation/native";

const ProfileDetailScreen = ({
                                 handleBack,
                                 loading,
                                 handlePickImage,
                                 listInput,
                                 handleChangeBirthday,
                                 handleSaveChange
                             }) => {
    const nav = useNavigation()

    return (
        <SafeAreaView style={{flex: 1}}>
            <NativeBaseProvider>
                <Box bgColor={ThemeStore.baseProps.themeBg} flex={1}>
                    <HStack  px={4} borderBottomWidth={1} py={4} borderBottomColor={ThemeStore.baseProps.text_black_03} justifyContent={'space-between'} alignItems={'center'}>
                        <TouchableOpacity activeOpacity={.9} onPress={handleBack}>
                            <Ionicons name={'chevron-back'} color={ThemeStore.baseProps.text_24} size={30}/>
                        </TouchableOpacity>
                        <Text color={ThemeStore.baseProps.text_24} fontSize={22} fontWeight={'500'} letterSpacing={1.5}>Account
                            Information</Text>
                        {loading ?
                            <ActivityIndicator size={30} color={ThemeStore.baseProps.text_24}/> :
                            <TouchableOpacity activeOpacity={.9}>
                                <Ionicons name={'help-circle-outline'} color={ThemeStore.baseProps.text_24} size={30}/>
                            </TouchableOpacity>
                        }

                    </HStack>
                    <ScrollView px={3} pt={6} showsVerticalScrollIndicator={false}>
                        <Image style={{
                            width: SCREEN_WIDTH / 3,
                            height: SCREEN_WIDTH / 3,
                            borderRadius: 1000,
                            alignSelf: 'center'
                        }}
                               alt={'avatar'}
                               source={UserStore.userUpdate.avatar ? {uri: UserStore.userUpdate.avatar} : UserStore.user.avatar ? {uri: UserStore.user.avatar} : default_avatar}/>
                        <TouchableOpacity onPress={handlePickImage}>
                            <Box my={3} bgColor={'gray.100'} borderRadius={'4'} py={1} px={2} alignSelf={'center'}>
                                <Text fontSize={12} color={'green.400'}>Change Photo</Text>
                            </Box>
                        </TouchableOpacity>
                        <VStack justifyContent={'center'} space={3} alignItems={'center'}>
                            {listInput.map((val, index) => {
                                return (
                                    <ProfileInputBox val={val} setSate={UserStore.setUserUpdateData}/>
                                )
                            })}
                            <Text fontSize={20} my={2} textAlign={'center'} color={ThemeStore.baseProps.text_black_06}>What
                                your birthday ?</Text>
                            <RNDateTimePicker
                                textColor={ThemeStore.baseProps.text_24}
                                maximumDate={new Date(new Date().getFullYear() - 10, 1, 0)}
                                onChange={handleChangeBirthday}
                                style={{width: SCREEN_WIDTH - 100, alignSelf: 'center', height: 300}}
                                display={'spinner'}
                                value={UserStore.user.time !== '' ? new Date(parseInt(UserStore.user.time)) : new Date()}
                            />
                            <TouchableOpacity onPress={() => {
                                nav.navigate('change_password')
                            }}>
                                <Text textAlign={'center'} fontSize={16} fontWeight={'500'} letterSpacing={1.5}
                                      color={'red.300'}>Change
                                    Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={loading} onPress={handleSaveChange} style={{
                                backgroundColor: '#E51937',
                                width: SCREEN_WIDTH - 100,
                                alignSelf: 'center',
                                paddingVertical: 12,
                                borderRadius: 6,
                                marginBottom: 10
                            }}>
                                {loading ? <ActivityIndicator color={'white'} size={16}/>
                                    :
                                    <Text textAlign={'center'} fontSize={16} fontWeight={'500'} letterSpacing={1.5}
                                          color={'white'}>Save Change</Text>
                                }
                            </TouchableOpacity>
                        </VStack>
                    </ScrollView>
                </Box>
            </NativeBaseProvider>
        </SafeAreaView>
    )
}

export default observer(ProfileDetailScreen)