import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Image, ScrollView, Text, VStack} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from "react-native";
import UserStore from "../../../models/UserStore";
import default_avatar from '../../../../assets/static/images/user.png'
import {SCREEN_WIDTH} from "../../../core/helper";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import {useNavigation} from "@react-navigation/native";

const ProfileScreen = ({route}) => {

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

    return (
        <NativeBaseProvider>
            <Box flex={1} bgColor={'white'} px={4}>
                <HStack justifyContent={'space-between'} my={6} alignItems={'center'}>
                    <Text color={'black'} fontSize={26} fontWeight={'500'} letterSpacing={1.5}>User Profile</Text>
                    <TouchableOpacity activeOpacity={.9}>
                        <Ionicons name={'help-circle-outline'} color={'black'} size={36}/>
                    </TouchableOpacity>
                </HStack>
                <ScrollView showsVerticalScrollIndicator={false} my={8}>
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
                              color={'black'}>{UserStore.user?.username}</Text>
                    </HStack>
                    <Box bgColor={'gray.100'} borderRadius={'4'} py={1} px={5} alignSelf={'center'}>
                        <Text fontSize={12} color={'green.400'}>MEMBER</Text>
                    </Box>

                    <Box flexDir={'row'} justifyContent={'space-between'} my={5} px={10} alignItems={'center'}>
                        <VStack>
                            <Text fontSize={30} textAlign={'center'} color={'black'}>123</Text>
                            <Text fontSize={12} color={'gray.400'} textAlign={'center'}>TOTAL POINT</Text>
                        </VStack>
                        <VStack>
                            <Text fontSize={30} textAlign={'center'} color={'black'}>06</Text>
                            <Text fontSize={12} color={'gray.400'} textAlign={'center'}>MOVIE WATCHED</Text>
                        </VStack>
                    </Box>
                    <VStack justifyContent={'center'} space={3} alignItems={'center'}>
                        {links.map((val, index) => {
                            return (
                                <TouchableOpacity activeOpacity={.9} onPress={() => {
                                    handleTo(nav, val.to)
                                }}>
                                    <HStack justifyContent={'flex-start'} borderRadius={6} borderWidth={2}
                                            width={SCREEN_WIDTH - 100} borderColor={'gray.200'} px={2} py={3}
                                            alignItems={'center'} space={2}>
                                        <Ionicons name={val.icon} color={'rgba(0,0,0,0.3)'} size={val.size}/>
                                        <Text>{val.title}</Text>
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