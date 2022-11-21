import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {useState} from "react";
import OrderSeat from "./OrderSeat";
import OrderExtra from "./OrderExtra";
import Payment from "./Payment";
import ResultTransaction from "./ResultTransaction";

const OrderTicket = ({route}) => {
    const {date, cinema, time} = route.params

    const [step, setStep] = useState(0)

    return (
        <NativeBaseProvider>
            {step === 0 ?
                <OrderSeat/>
                : step === 1 ?
                    <OrderExtra/>
                    : step === 2 ?
                        <Payment/>
                        : <ResultTransaction/>
            }
        </NativeBaseProvider>
    )
}
export default observer(OrderTicket)