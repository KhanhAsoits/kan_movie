import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Center, HStack, Image, ScrollView, Text, VStack} from "native-base";
import ThemeStore from "../../../models/ThemeStore";
import {numberTokenGenerator, SCREEN_HEIGHT} from "../../../core/helper";
import Barcode from "@adrianso/react-native-barcode-builder/index";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import TicketStore from "../../../models/TicketStore";
import Loader from "../../components/Loader";

const TicketScreen = () => {
    const bottomTabHeight = useBottomTabBarHeight()

    useEffect(() => {

        const bsSync = async () => {
            await TicketStore.onGetTicket()
        }

        if (TicketStore.orderedTickets.length <= 0) {
            bsSync()
        }
    }, [])
    useEffect(() => {
        console.log(TicketStore.orderedTickets[0]?.movie?.image)
    }, [TicketStore.orderedTickets])

    const TicketBox = ({ticket}) => {
        const getUniqName = (seat) => {
            let uni = []
            seat.forEach((val, index) => {
                if (uni.length === 0) {
                    uni.push(val.name)
                }
                uni.forEach((val_, index_) => {
                    if (val_ !== val.name) {
                        uni.push(val.name)
                    }
                })
            })
            console.log(uni)
            return uni.join(", ")
        }
        return (
            <Box borderRadius={8} justifyContent={'center'} alignItems={'center'}
                 height={SCREEN_HEIGHT - bottomTabHeight - 70}>
                <Image borderTopRadius={8} alt={'movie thumbnail'} resizeMode={'cover'}
                       source={{uri: ticket?.movie?.image}}
                       width={'100%'} height={SCREEN_HEIGHT / 5}/>
                <VStack borderBottomRadius={8} bgColor={ThemeStore.baseProps.themeBg} px={4} pt={3} pb={5}
                        space={2}>
                    <Text fontSize={22} color={ThemeStore.baseProps.text_24}>{ticket.movie?.title}</Text>
                    <VStack>
                        <Text fontSize={14} color={ThemeStore.baseProps.text_black_06}>THEATRE</Text>
                        <Text fontSize={17} fontWeight={'500'}
                              color={ThemeStore.baseProps.text_24}>{ticket.cinema?.name}</Text>

                    </VStack>
                    <HStack justifyContent={'space-between'}
                            alignItems={'center'} flexWrap={'wrap'}>
                        <VStack width={'50%'}>
                            <Text fontSize={14} color={ThemeStore.baseProps.text_black_06}>DATE</Text>
                            <Text color={ThemeStore.baseProps.text_24} fontWeight={'500'}
                                  fontSize={17}>{ticket.date?.date.slice(0, 16)}</Text>
                        </VStack>
                        <VStack width={'50%'}>
                            <Text fontSize={14} color={ThemeStore.baseProps.text_black_06}>TIME</Text>
                            <Text color={ThemeStore.baseProps.text_24} fontWeight={'500'}
                                  fontSize={17}>
                                {ticket.time?.hours} : {ticket.time?.minute} - {ticket.time?.hours + 2} : {ticket.time?.minute} {ticket.time.hours > 12 ? 'PM' : 'AM'}
                            </Text>
                        </VStack>
                    </HStack>
                    <HStack justifyContent={'space-between'}
                            alignItems={'center'} flexWrap={'wrap'}>
                        <VStack width={'50%'}>
                            <Text fontSize={14} color={ThemeStore.baseProps.text_black_06}>POSITION</Text>
                            <Text color={ThemeStore.baseProps.text_24} fontWeight={'500'}
                                  fontSize={17}>{getUniqName(ticket.selectedSeats)}</Text>
                        </VStack>
                        <VStack width={'50%'}>
                            <Text fontSize={14} color={ThemeStore.baseProps.text_black_06}>SEAT</Text>
                            <Text color={ThemeStore.baseProps.text_24} fontWeight={'500'}
                                  fontSize={17}>{ticket.selectedSeats.map((val,index)=>{return val?.name + val?.position}).join(", ")}</Text>
                        </VStack>

                    </HStack>
                    <Box borderRadius={8}>
                        <Barcode format="CODE128" value={'hello world'} style={{width: '100%', height: 80}}/>

                    </Box>
                    <HStack justifyContent={'space-between'} alignItems={'center'}>
                        <Text fontSize={18} color={ThemeStore.baseProps.text_24}>PAR</Text>
                        <Text textAlign={'right'} letterSpacing={10} fontSize={18}
                              color={ThemeStore.baseProps.text_24}>{numberTokenGenerator(14)}</Text>
                    </HStack>
                </VStack>
            </Box>
        )
    }
    return (
        <NativeBaseProvider>
            <Box shadow={5} style={{heigt:80}} justifyContent={'center'} px={6} bgColor={ThemeStore.baseProps.themeBg}>
                <Text fontSize={30} color={ThemeStore.baseProps.text_24} fontWeight={'500'} shadow={1}
                      my={3}>Tickets</Text>
            </Box>
            {TicketStore.fetching ?
                <Loader height={SCREEN_HEIGHT - useBottomTabBarHeight() - 88}></Loader>
                :
                <Box flex={1} px={6} bgColor={ThemeStore.baseProps.themeBg}>
                    <FlatList showsVerticalScrollIndicator={false} data={TicketStore.orderedTickets}
                              pagingEnabled={true}
                              renderItem={({item, index}) => <TicketBox ticket={item}/>}/>
                </Box>
            }
        </NativeBaseProvider>
    )
}
export default observer(TicketScreen)
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bottomBar: {
        padding: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    result: {
        marginTop: 24,
    },
})