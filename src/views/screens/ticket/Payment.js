import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import TicketStore from "../../../models/TicketStore";
import {Box, HStack, Image, ScrollView, Text, VStack} from "native-base";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../core/helper";
import bg from '../../../../assets/static/images/movie-preview.png'
import PaypalStore from "../../../models/PaypalStore";
import {ActivityIndicator, Alert, TextInput, TouchableOpacity} from "react-native";
import WebView from "react-native-webview";
import {useState} from "react";

const Payment = ({setStep, setResultTransaction}) => {
    const handlePaypalRequest = async () => {
        PaypalStore.setTransactionAmount(TicketStore.orderTicket.total)
        await PaypalStore.createAnOrder()
    }

    const [shippingAddress, setShippingAddress] = useState('')
    const [desc, setDesc] = useState('')
    const onGetTransactionResult = async (webViewState) => {
        if (webViewState.url.includes('https://kan_movie.com/')) {
            PaypalStore.setApprovalUrl(null)
            if (webViewState.url.includes('https://kan_movie.com/return')) {
                const PayerID = webViewState.url.slice(webViewState.url.indexOf('PayerID') + "PayerID".length + 1, webViewState.url.length)
                let result = await PaypalStore.getTransactionResult(PayerID)
                if (result?.failed_transactions.length > 0) {
                    setResultTransaction(false)
                    setStep(c => c + 1)
                } else {
                    await TicketStore.onSyncTicket(shippingAddress, desc)
                    setResultTransaction(true)
                    setStep(c => c + 1)
                }
            } else {
                setResultTransaction(false)
                setStep(c => c + 1)
            }
        }
    }

    return (
        <>
            {PaypalStore.approval_url ?
                <WebView
                    source={{uri: PaypalStore.approval_url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onNavigationStateChange={onGetTransactionResult}
                    startInLoadingState={true}
                />
                :
                <NativeBaseProvider>
                    <Box flex={1} px={4} style={{height: 200, overflow: 'hidden'}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Box shadow={1} width={SCREEN_WIDTH - 35} alignSelf={'center'} my={3}>
                                <HStack space={3} bgColor={'white'} overflow={'hidden'} p={5} borderRadius={8}>
                                    <Image source={{uri: TicketStore.orderTicket.movie.image} || bg}
                                           alt={'movie thumbnail'}
                                           style={{width: SCREEN_WIDTH / 4, height: SCREEN_HEIGHT / 5}}
                                           resizeMode={'cover'}
                                           borderRadius={12}/>
                                    <VStack>
                                        <Text width={SCREEN_WIDTH / 1.7} fontSize={20}
                                              fontWeight={'500'}>{TicketStore.orderTicket.movie?.title}</Text>
                                        <Text width={SCREEN_WIDTH / 1.7} fontSize={16}
                                              fontWeight={'300'}
                                              color={'gray.400'}>
                                            {TicketStore.orderTicket.time?.hours} : {TicketStore.orderTicket.time?.minute} - {TicketStore.orderTicket.time?.hours + 2} : {TicketStore.orderTicket.time?.minute} {TicketStore.orderTicket.time.hours > 12 ? 'PM' : 'AM'}
                                        </Text>
                                        <Text width={SCREEN_WIDTH / 1.7} fontSize={16}
                                              fontWeight={'300'} color={'gray.400'}>
                                            {TicketStore.orderTicket.date.date.slice(0, 16)}
                                        </Text>
                                        <Text width={SCREEN_WIDTH / 1.7} fontSize={16}
                                              fontWeight={'300'} color={'gray.400'}>
                                            Seats:
                                            {TicketStore.orderTicket.selectedSeats.map((val, index) => {
                                                return val.name + val.position
                                            }).join(',')}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Box>
                            <VStack>
                                <Text fontSize={12} color={'gray.400'}>ADDRESS</Text>
                                <TextInput onChangeText={text => setShippingAddress(text)} style={{
                                    marginTop: 6,
                                    width: SCREEN_WIDTH - 33,
                                    borderRadius: 8,
                                    paddingVertical: 10,
                                    borderColor: "rgba(0,0,0,0.4)",
                                    borderWidth: 1,
                                    fontSize: 14, paddingHorizontal: 6,
                                }}/>
                                <Text mt={6} fontSize={12} color={'gray.400'}>NOTICE FOR SELLER</Text>
                                <TextInput onChangeText={text => setDesc(text)} style={{
                                    marginTop: 6,
                                    minHeight: 100,
                                    paddingHorizontal: 6,
                                    fontSize: 14,
                                    width: SCREEN_WIDTH - 33,
                                    borderRadius: 8,
                                    paddingVertical: 10,
                                    borderColor: "rgba(0,0,0,0.4)",
                                    borderWidth: 1
                                }}
                                           multiline={true}
                                           numberOfLines={100}
                                />
                            </VStack>
                        </ScrollView>
                        <VStack bgColor={'white'} mb={3} px={5} width={SCREEN_WIDTH}
                                alignSelf={'center'}
                                justifyContent={'center'} alignItems={'center'}
                        >
                            <HStack width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                                <Text fontSize={14} color={'gray.400'}>TOTAL COST</Text>
                                <Text fontSize={30} color={'red.400'}>${TicketStore.orderTicket.total}</Text>
                            </HStack>
                            <TouchableOpacity
                                onPress={handlePaypalRequest}
                                disabled={PaypalStore.processing}
                                style={{
                                    width: SCREEN_WIDTH - 30,
                                    paddingVertical: 10,
                                    backgroundColor: 'red',
                                    borderRadius: 8
                                }}>
                                {PaypalStore.processing ?
                                    <ActivityIndicator color={'white'} size={24}/> :
                                    <Text textAlign={'center'} fontSize={16} color={'white'}>Place Order With
                                        Paypal</Text>
                                }
                            </TouchableOpacity>
                        </VStack>
                    </Box>
                </NativeBaseProvider>
            }
        </>
    )
}
export default observer(Payment)