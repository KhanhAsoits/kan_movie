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

const OrderTicket = ({route}) => {
    const {date, cinema, time} = route.params
    const [step, setStep] = useState(0)
    useEffect(() => {
        const data = {
            cinema: cinema,
            date: date,
            time: time,
            selectedSeats: [],
            movie: {
                id: SingleMovieStore.movie?.id,
                image: SingleMovieStore.movie?.image,
                title: SingleMovieStore.movie?.fullTitle
            }
        }
        TicketStore.setPreTicketData(data)
    }, [])
    useEffect(() => {
    }, [step])
    return (
        <NativeBaseProvider>
            <Box bgColor={'white'} flex={1}>
                {step === 0 ?
                    <OrderTicketLayout>
                        <OrderSeat seats={cinema.seats} setStep={setStep} cinema={cinema}/>
                    </OrderTicketLayout>
                    : step === 1 ?
                        <OrderTicketLayout>
                            <OrderExtra/>
                        </OrderTicketLayout>
                        : step === 2 ?
                            <Payment/>
                            : <ResultTransaction/>
                }
            </Box>

        </NativeBaseProvider>
    )
}
export default observer(OrderTicket)