import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Center, HStack, Text, VStack} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SCREEN_WIDTH} from "../../../core/helper";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import TicketStore from "../../../models/TicketStore";
import {useState} from "react";

const ResultTransaction = ({result, nav}) => {
    const [loadingToReturn, setLoadingToReturn] = useState(false)
    const handleGoBackHome = () => {
        setLoadingToReturn(true)
        setTimeout(() => {
            TicketStore.clearOrderTicket()
            setLoadingToReturn(false)
            nav.navigate('home_screen')
        }, 1000)
    }

    return (
        <NativeBaseProvider>
            <Box flex={1} justifyContent={'center'} alignItems={'center'} px={4}>
                <Box shadow={2} borderRadius={8} px={4} py={9} width={SCREEN_WIDTH - 30} alignSelf={'center'}
                     bgColor={'white'}>
                    <VStack space={1}>
                        <Center alignSelf={'center'} width={20} borderRadius={100}
                                bgColor={result ? 'green.50' : 'red.50'} p={3}>
                            <Ionicons name={result ? 'checkmark-outline' : 'close-outline'} size={50}
                                      color={result ? '#4CD964' : 'red'}/>
                        </Center>
                        <Text fontSize={26} textAlign={'center'}>{result ? 'Congratulations' : 'Cancel'}</Text>
                        <Text fontSize={14} color={'gray.400'} textAlign={'center'}>
                            {result ? 'You booked the movie successful.' : 'You cancel order.'}
                        </Text>
                        <Box my={6} h={.1} bgColor={'gray.400'}></Box>
                        <HStack justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'}>
                            <VStack width={'50%'}>
                                <Text color={'gray.400'}>THEATRE</Text>
                                <Text fontWeight={'500'} fontSize={17}>{TicketStore.orderTicket.cinema?.name}</Text>
                            </VStack>
                            <VStack width={'50%'}>
                                <Text color={'gray.400'}>SEAT</Text>
                                <Text fontWeight={'500'}
                                      fontSize={17}>{TicketStore.orderTicket.selectedSeats.map((val) => {
                                    return val?.name + val?.position
                                }).join(",")}</Text>
                            </VStack>
                        </HStack>
                        <HStack justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'}>
                            <VStack width={'50%'}>
                                <Text color={'gray.400'}>DATE</Text>
                                <Text fontWeight={'500'}
                                      fontSize={17}>{TicketStore.orderTicket.date?.date?.slice(0, 16)}</Text>
                            </VStack>
                            <VStack width={'50%'}>
                                <Text color={'gray.400'}>TIME</Text>
                                <Text fontWeight={'500'}
                                      fontSize={17}>
                                    {TicketStore.orderTicket.time?.hours} : {TicketStore.orderTicket.time?.minute} - {TicketStore.orderTicket.time?.hours + 2} : {TicketStore.orderTicket.time?.minute} {TicketStore.orderTicket.time?.hours > 12 ? 'PM' : 'AM'}
                                </Text>
                            </VStack>
                        </HStack>
                    </VStack>
                </Box>
                <TouchableOpacity activeOpacity={.9} onPress={handleGoBackHome}>
                    <Box width={SCREEN_WIDTH - 30} py={3} borderRadius={6} my={3}
                         bgColor={result ? 'green.400' : 'red.400'}>
                        {loadingToReturn ? <ActivityIndicator color={'white'} size={30}/> :
                            <Text textAlign={'center'} color={'white'} fontSize={20}>Go back home</Text>
                        }
                    </Box>
                </TouchableOpacity>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(ResultTransaction)