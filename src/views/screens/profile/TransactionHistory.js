import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {observer} from "mobx-react";
import {Box, HStack, ScrollView, Text, VStack} from "native-base";
import {ActivityIndicator, SafeAreaView, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ThemeStore from "../../../models/ThemeStore";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import UserStore from "../../../models/UserStore";
import Loader from "../../components/Loader";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../core/helper";
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

    const TransactionBox = ({trans}) => {
        return (
            <HStack width={SCREEN_WIDTH} pr={8} justifyContent={'space-between'} alignItems={'center'}>
                <Box p={3} bgColor={'green.50'} borderRadius={100}>
                    <Ionicons name={'wallet'} color={'rgba(25,220,255,1)'} size={20}></Ionicons>
                </Box>
                <VStack width={'40%'}>
                    <Text color={ThemeStore.baseProps.text_24} fontSize={14} fontWeight={'500'}>Booked Ticket</Text>
                    <Text color={ThemeStore.baseProps.text_black_06} fontSize={14} numberOfLines={1}>{trans.items.movie.title}</Text>
                </VStack>
                <VStack width={'40%'}>
                    <Text color={'red.400'} textAlign={'right'} fontSize={14} fontWeight={'500'}>-${trans?.items.amount}</Text>
                    <Text color={ThemeStore.baseProps.text_black_06} textAlign={'right'} fontSize={14} numberOfLines={1}>{new Date(trans.items.date).toUTCString()}</Text>
                </VStack>
            </HStack>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <NativeBaseProvider>
                <Box flex={1} bgColor={ThemeStore.baseProps.themeBg}>
                    <HStack justifyContent={'space-between'} px={3} borderBottomWidth={1} py={4}
                            borderBottomColor={ThemeStore.baseProps.text_black_03} alignItems={'center'}>
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
                    <ScrollView showsVerticalScrollIndicator={false} py={2} px={3}>

                        {fetching ?
                            <Loader height={SCREEN_HEIGHT - useBottomTabBarHeight() - 60}></Loader>
                            :
                            <VStack space={6} px={3} width={SCREEN_WIDTH} justifyContent={'center'}
                                    alignItems={'center'}>
                                {UserStore.transactions.map((val, index) => {
                                    return (
                                        <TransactionBox trans={val}></TransactionBox>
                                    )
                                })}
                            </VStack>
                        }
                    </ScrollView>
                </Box>
            </NativeBaseProvider>
        </SafeAreaView>
    )
}
export default observer(TransactionHistory)