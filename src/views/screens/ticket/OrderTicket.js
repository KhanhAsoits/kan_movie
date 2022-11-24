import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {useEffect, useState} from "react";
import OrderSeat from "./OrderSeat";
import OrderExtra from "./OrderExtra";
import Payment from "./Payment";
import ResultTransaction from "./ResultTransaction";
import OrderTicketLayout from "./OrderTicketLayout";
import {Box} from "native-base";
import TicketStore from "../../../models/TicketStore";
import SingleMovieStore from "../../../models/SingleMovieStore";
import {useNavigation} from "@react-navigation/native";
import {Alert} from "react-native";

const OrderTicket = ({route}) => {
    const {date, cinema, time} = route.params
    const [step, setStep] = useState(0)
    const nav = useNavigation()
    const [transactionResult, setTransactionResult] = useState(true)

    useEffect(() => {
        const data = {
            cinema: cinema,
            date: date,
            time: time,
            selectedSeats: [],
            movie: {
                id: SingleMovieStore.movie?.id,
                image: SingleMovieStore.movie?.trailer?.thumbnailUrl,
                title: SingleMovieStore.movie?.fullTitle
            }
        }
        TicketStore.setPreTicketData(data)
    }, [])
    useEffect(() => {
        if (step === 1) {
            TicketStore.setOrderTicketExtra([], false)
        }
    }, [step])
    useEffect(() => {
        nav.addListener('beforeRemove', (e) => {
            if (TicketStore.orderTicket.selectedSeats.length <= 0) {
                return;
            }
            e.preventDefault()

            if (TicketStore.orderTicket.selectedSeats.length > 0) {
                Alert.alert('Discard?', 'Do you want leave?', [
                    {
                        style: "cancel", text: 'No', onPress: () => {
                        }
                    },
                    {
                        style: "destructive", text: 'leave', onPress: () => {
                            TicketStore.clearOrderTicket()
                            nav.dispatch(e.data.action)
                        }
                    }
                ])
            }
        })
    }, [nav])
    return (
        <NativeBaseProvider>
            <Box bgColor={'white'} flex={1}>
                {step === 0 ?
                    <OrderTicketLayout setStep={setStep} isShowDetail={true}>
                        <OrderSeat seats={cinema.seats} setStep={setStep} cinema={cinema}/>
                    </OrderTicketLayout>
                    : step === 1 ?
                        <OrderTicketLayout setStep={setStep} isShowDetail={false} title={'Extra Items'}>
                            <OrderExtra setStep={setStep}/>
                        </OrderTicketLayout>
                        : step === 2 ?
                            <OrderTicketLayout setStep={setStep} isShowDetail={false} title={'Payment'}>
                                <Payment setResultTransaction={setTransactionResult} setStep={setStep}/>
                            </OrderTicketLayout>
                            : <ResultTransaction nav={nav} result={transactionResult}/>
                }
            </Box>

        </NativeBaseProvider>
    )
}
export default observer(OrderTicket)