import {makeAutoObservable} from "mobx";
import axios from "axios";
import {configs} from "../core/configs";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import SingleMovieStore from "./SingleMovieStore";
import PaypalStore from "./PaypalStore";
import {Alert} from "react-native";

class TicketStore {

    orderTicket = {
        selectedSeats: [],
        cinema: {},
        date: {},
        time: {},
        movie: {},
        total: 0,
        extra: []
    }

    extraTotal = 0
    orderedTickets = []
    fetching = false

    onSyncTicket = async (ship, desc) => {
        try {
            PaypalStore.setProcessing(true)
            let res = await axios.post(`${configs.local_api_base_uri}/ticket`, JSON.stringify({
                ...this.orderTicket,
                id: UUID(),
                address: ship,
                desc: desc
            }), {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            if (res) {
                //    create transaction his
                let newTransaction = {
                    id: UUID,
                    items: {
                        movie: this.orderTicket.movie,
                        extras: this.orderTicket.extra,
                        amount: this.orderTicket.total,
                        date: new Date().getTime()
                    }
                }
                await axios.post(`${configs.local_api_base_uri}/transaction`, JSON.stringify(newTransaction), {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                PaypalStore.setProcessing(false)
                return true
            }
            return false
        } catch (e) {
            PaypalStore.setProcessing(false)
            console.log(e)
        }

    }

    constructor() {
        makeAutoObservable(this)
    }

    setExtraTotal = (value) => {
        this.extraTotal = value
    }
    setOrderTicketSelectSeat = (value) => {
        this.orderTicket.selectedSeats = value
    }

    setOrderTicketTotal = (value) => {
        this.orderTicket.total = value
    }
    setPreTicketData = (value) => {
        this.orderTicket = value
    }

    setOrderTicketExtra = (value, calc = true) => {
        this.orderTicket.extra = value
        if (calc) {
            let total = this.orderTicket.extra.reduce((cur, val) => {
                return cur + (val?.quantity * val?.price)
            }, 0)
            this.setExtraTotal(total)
        } else {
            this.setOrderTicketTotal(this.orderTicket.total - this.extraTotal)
        }
    }

    clearOrderTicket = () => {
        this.setPreTicketData({
            ...this.orderTicket,
            selectedSeats: [],
            movie: {},
            total: 0,
            extra: []
        })
    }

    setFetching = (value) => {
        this.fetching = value
    }

    onSetOrderedTicket = (value) => {
        this.orderedTickets = value
    }

    async onGetTicket() {
        try {
            this.setFetching(true)
            let res = (await axios.get(`${configs.local_api_base_uri}/ticket`)).data
            this.onSetOrderedTicket(res)
            setTimeout(() => {
                this.setFetching(false)
            }, 1000)
        } catch (e) {
            console.log(e)
            Alert.alert('Notification', 'Something wrong,try again.')
        }
    }
}

const ticketStore = new TicketStore()
export default ticketStore