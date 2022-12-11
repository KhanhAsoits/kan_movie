import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {observer} from "mobx-react";
import {Box, HStack, ScrollView, Text, VStack} from "native-base";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ThemeStore from "../../../models/ThemeStore";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import UserStore from "../../../models/UserStore";
import Loader from "../../components/Loader";
import {SCREEN_HEIGHT} from "../../../core/helper";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";

const TransactionHistory = () => {

    const [fetching, setFetching] = useState(false)

    const nav = useNavigation()
    const handleBack = () => {
        nav.goBack()
    }

    useEffect(() => {
        setFetching(true)
        const onGetTransactionSync = async () => {
            await UserStore.onGetTransaction()
        }
        setTimeout(() => {
            onGetTransactionSync()
            setFetching(false)
        }, 500)
    }, [])
    useEffect(() => {

    }, [UserStore.transactions])

    return (
        <NativeBaseProvider>
            <Box flex={1} bgColor={ThemeStore.baseProps.themeBg} px={3}>
                <HStack justifyContent={'space-between'} my={8} alignItems={'center'}>
                    <TouchableOpacity activeOpacity={.9} onPress={handleBack}>
                        <Ionicons name={'chevron-back'} color={ThemeStore.baseProps.text_24} size={30}/>
                    </TouchableOpacity>
                    <Text color={ThemeStore.baseProps.text_24} fontSize={20} fontWeight={'500'} letterSpacing={1.5}>Transaction
                        History</Text>
                    <Text> </Text>
                </HStack>
                {UserStore.transactions.length <= 0 &&
                    <Box height={SCREEN_HEIGHT - useBottomTabBarHeight() - 100} justifyContent={'center'}
                         alignItems={'center'}><Text color={ThemeStore.baseProps.text_24} fontSize={18}
                                                     textAlign={'center'}>Nothing here.</Text></Box>}
                <ScrollView showsVerticalScrollIndicator={false} py={2}>

                    {fetching ?
                        <Loader height={SCREEN_HEIGHT - useBottomTabBarHeight() - 60}></Loader>
                        :
                        <VStack space={3} justifyContent={'center'} alignItems={'center'}>
                            {UserStore.transactions.map((val, index) => {
                                return (
                                    <HStack justifyContent={'space-between'} alignItems={'center'}
                                            bgColor={ThemeStore.baseProps.themeBg} shadow={2} borderRadius={8}
                                            width={'96%'}
                                            p={2}>

                                        <HStack justifyContent={'center'} alignItems={'center'} space={2}>
                                            <Box backgroundColor={'green.50'} p={3} borderRadius={100}>
                                                <Ionicons name={'wallet'} color={'#47CFFF'} size={26}/>
                                            </Box>
                                            <VStack>
                                                <Text fontSize={16} fontWeight={'500'}
                                                      color={ThemeStore.baseProps.text_24}>Booked Ticket</Text>
                                                <Text fontSize={14}
                                                      color={ThemeStore.baseProps.text_black_06}>{val.items.movie.title}</Text>
                                            </VStack>
                                        </HStack>
                                        <VStack>
                                            <Text fontSize={16} fontWeight={'500'} color={'red.500'}
                                                  textAlign={'right'}>-
                                                ${val.items.amount}</Text>
                                            <Text fontSize={14}
                                                  color={ThemeStore.baseProps.text_black_06}>{new Date(val.items.date).toDateString()}</Text>
                                        </VStack>
                                    </HStack>
                                )
                            })}
                        </VStack>
                    }
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(TransactionHistory)