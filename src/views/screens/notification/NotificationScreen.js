import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, ScrollView, Text, VStack} from "native-base";
import ThemeStore from "../../../models/ThemeStore";
import React, {useEffect} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import NotificationStore from "../../../models/NotificationStore";
import Loader from "../../components/Loader";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../core/helper";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {SafeAreaView, TouchableOpacity} from "react-native";

const NotificationScreen = () => {

    useEffect(() => {
        const sync = async () => {
            await NotificationStore.onGetNotification()
        }
        if (NotificationStore.notifications.length <= 0) {
            sync()
        }
    }, [])

    useEffect(() => {
        const sync = async () => {
            await NotificationStore.onGetNotification()
            NotificationStore.setNewNo(0)
        }
        if (NotificationStore.new_notification > 0) {
            sync()
        }
    }, [NotificationStore.new_notification])


    const NotificationBox = ({item}) => {
        return (

            <HStack space={3} borderBottomWidth={.5} borderColor={ThemeStore.baseProps.text_black_06}
                    borderBottomStyle={'dashed'} flexDir={'row'} py={6} justifyContent={'flex-start'}
                    alignItems={'center'}>
                <Box bgColor={'green.50'} p={4} borderRadius={100}>
                    <Ionicons name={'notifications'} color={'#4CD964'} size={26}/>
                </Box>
                <VStack>
                    <Text width={SCREEN_WIDTH / 1.3} fontSize={14} fontWeight={'500'}
                          color={ThemeStore.baseProps.text_24}>
                        {item.message}
                    </Text>
                    <Text color={ThemeStore.baseProps.text_black_06} fontSize={12}>
                        {new Date(item.createdAt).toString().slice(0, 16)}
                    </Text>
                </VStack>
            </HStack>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <NativeBaseProvider>
                <Box borderBottomWidth={1} borderBottomColor={ThemeStore.baseProps.text_black_03} shadow={5} style={{height: 80}} justifyContent={'center'} px={6}
                     bgColor={ThemeStore.baseProps.themeBg}>
                    <Text fontSize={30} color={ThemeStore.baseProps.text_24} fontWeight={'500'} shadow={1}
                          my={3}>Notification</Text>
                </Box>

                {NotificationStore.fetching ?
                    <Loader height={SCREEN_HEIGHT - 80 - useBottomTabBarHeight()}></Loader>
                    :
                    <Box flex={1} bgColor={ThemeStore.baseProps.themeBg}>
                        <ScrollView showsVerticalScrollIndicator={false} px={4}>
                            {NotificationStore.notifications.length <= 0 &&
                                <Box flex={1} height={SCREEN_HEIGHT - useBottomTabBarHeight() - 80}
                                     justifyContent={'center'} alignItems={'center'}>
                                    <Text color={ThemeStore.baseProps.text_black_06} fontSize={18}>Nothing here.</Text>
                                </Box>
                            }
                            {
                                NotificationStore.notifications.map((val, index) => {
                                    return (
                                        <NotificationBox item={val}/>
                                    )
                                })
                            }
                        </ScrollView>
                    </Box>
                }
            </NativeBaseProvider>
        </SafeAreaView>
    )
}
export default observer(NotificationScreen)