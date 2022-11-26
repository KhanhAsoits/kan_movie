import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Image, ScrollView, Text, VStack} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ActivityIndicator, TouchableOpacity} from "react-native";
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
        {title: 'Transaction History', icon: 'logo-bitcoin', to: '', size: 22},
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
        <NativeBaseProvider>
            <Box flex={1} bgColor={ThemeStore.baseProps.themeBg} px={4}>
                <HStack justifyContent={'space-between'} my={6} alignItems={'center'}>
                    <Text color={ThemeStore.baseProps.text_24} fontSize={26} fontWeight={'500'} letterSpacing={1.5}>User
                        Profile</Text>
                    <TouchableOpacity activeOpacity={.9}>
                        <Ionicons name={'help-circle-outline'} color={'black'} size={36}/>
                    </TouchableOpacity>
                </HStack>
                <ScrollView showsVerticalScrollIndicator={false} my={0}>
                    <Image style={{
                        width: SCREEN_WIDTH / 3,
                        height: SCREEN_WIDTH / 3,
                        borderRadius: 1000,
                        alignSelf: 'center'
                    }}
                           alt={'avatar'}
                           source={UserStore.user?.avatar ? {uri: UserStore.user?.avatar} : default_avatar}/>
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

                                    <HStack justifyContent={loading ? 'space-between' : 'flex-start'} borderRadius={6}
                                            borderWidth={2}
                                            width={SCREEN_WIDTH - 100} borderColor={ThemeStore.baseProps.text_black_06}
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
        </NativeBaseProvider>
    )
}

export default observer(ProfileScreen)