import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Image, ScrollView, Text, VStack} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ActivityIndicator, SafeAreaView, TouchableOpacity} from "react-native";
import UserStore from "../../../models/UserStore";
import default_avatar from '../../../../assets/static/images/user.png'
import {SCREEN_WIDTH} from "../../../core/helper";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import {useNavigation} from "@react-navigation/native";
import ThemeStore from "../../../models/ThemeStore";
import title from "react-native-paper/src/components/Typography/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStore from "../../../models/AuthStore";
import {useState} from "react";

const ProfileScreen = ({route}) => {

    const [loading, setLoading] = useState(false)
    const links = [
        {title: 'Account information', icon: 'person', to: 'profile_detail', size: 20},
        {title: 'Transaction History', icon: 'logo-bitcoin', to: 'transaction_history', size: 22},
        {title: 'Privacy Policy', icon: 'shield', to: '', size: 20},
        {title: 'Logout', icon: 'log-out-outline', to: '', size: 24}
    ]
    const nav = useNavigation()
    const handleTo = (nav, to, params = {}) => {
        nav.navigate(to, params)
    }

    const handleLogout = async () => {
        setLoading(true)
        setTimeout(async () => {
            await AsyncStorage.removeItem('@AuthorizeId')
            UserStore.setUser({
                id: '',
                username: '',
                email: '',
                phone: '',
                password: '',
                birthday: '',
                time: '',
                avatar: ''
            })
            AuthStore.setIsLogin(false)
            setLoading(false)
        }, 500)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <NativeBaseProvider>
                <Box flex={1} bgColor={ThemeStore.baseProps.themeBg}>
                    <HStack style={{height:80}}  px={4} borderBottomWidth={1} borderBottomColor={ThemeStore.baseProps.text_black_03} justifyContent={'space-between'} alignItems={'center'}>
                        <Text color={ThemeStore.baseProps.text_24} fontSize={28} shadow={1} fontWeight={'500'} letterSpacing={1.5}>User
                            Profile</Text>
                        <TouchableOpacity onPress={ThemeStore.toggleMode} activeOpacity={.9} style={{
                            borderRadius: 100,
                            padding: 6,
                        }}>
                            {ThemeStore.changing ?
                                <ActivityIndicator color={ThemeStore.baseProps.text_24} size={20}/> :
                                <Ionicons name={ThemeStore.mode === 'light' ? 'moon' : 'sunny'}
                                          color={ThemeStore.baseProps.text_24} size={22}/>
                            }

                        </TouchableOpacity>
                    </HStack>
                    <Box py={6} flex={1}>
                        <ScrollView  px={4} showsVerticalScrollIndicator={false} my={0}>
                            <Box alignSelf={"center"}>
                                <Image style={{
                                    width: SCREEN_WIDTH / 3,
                                    height: SCREEN_WIDTH / 3,
                                    borderRadius: 1000,
                                    alignSelf: 'center'
                                }}
                                       alt={'avatar'}
                                       source={{uri: UserStore.user?.avatar} || default_avatar}/>
                            </Box>
                            <HStack justifyContent={'center'} alignItems={'center'} my={2}>
                                <Text fontSize={23} textAlign={'center'} fontWeight={'500'} letterSpacing={1.1}
                                      color={ThemeStore.baseProps.text_24}>{UserStore.user?.username}</Text>
                            </HStack>
                            <Box bgColor={'gray.100'} borderRadius={'4'} py={1} px={5} alignSelf={'center'}>
                                <Text fontSize={12} color={'green.400'}>MEMBER</Text>
                            </Box>

                            <Box flexDir={'row'} justifyContent={'space-between'} my={5} px={10} alignItems={'center'}>
                                <VStack>
                                    <Text fontSize={30} textAlign={'center'} color={ThemeStore.baseProps.text_24}>123</Text>
                                    <Text fontSize={12} color={'gray.400'} textAlign={ThemeStore.baseProps.text_24}>TOTAL
                                        POINT</Text>
                                </VStack>
                                <VStack>
                                    <Text fontSize={30} textAlign={'center'} color={ThemeStore.baseProps.text_24}>06</Text>
                                    <Text fontSize={12} color={'gray.400'} textAlign={ThemeStore.baseProps.text_24}>MOVIE
                                        WATCHED</Text>
                                </VStack>
                            </Box>
                            <VStack justifyContent={'center'} space={3} alignItems={'center'}>
                                {links.map((val, index) => {
                                    return (
                                        <TouchableOpacity activeOpacity={.9} onPress={() => {
                                            if (val.title === "Logout") {
                                                handleLogout()
                                                return;
                                            }
                                            handleTo(nav, val.to)
                                        }}>

                                            <HStack justifyContent={loading ? 'space-between' : 'flex-start'}
                                                    borderRadius={6}
                                                    borderWidth={2}
                                                    width={SCREEN_WIDTH - 100}
                                                    borderColor={ThemeStore.baseProps.text_black_03}
                                                    px={2} py={3}
                                                    alignItems={'center'}>

                                                {val.title === "Logout" && loading ?
                                                    <ActivityIndicator color={ThemeStore.baseProps.text_black_06}/> :
                                                    <HStack space={2}>
                                                        <Ionicons name={val.icon} color={ThemeStore.baseProps.text_black_06}
                                                                  size={val.size}/>
                                                        <Text color={ThemeStore.baseProps.text_black_06}>{val.title}</Text>
                                                    </HStack>
                                                }
                                            </HStack>
                                        </TouchableOpacity>
                                    )
                                })}
                            </VStack>
                        </ScrollView>
                    </Box>
                </Box>
            </NativeBaseProvider>
        </SafeAreaView>
    )
}

export default observer(ProfileScreen)