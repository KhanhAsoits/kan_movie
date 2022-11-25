import {makeAutoObservable} from "mobx";
import axios from "axios";
import {configs} from "../core/configs";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import SingleMovieStore from "./SingleMovieStore";
import PaypalStore from "./PaypalStore";
import {Alert} from "react-native";
import UserStore from "./UserStore";
import NotificationStore from "./NotificationStore";

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
    new_ticket = 0

    extraTotal = 0
    orderedTickets = []
    fetching = false

    setNewTicket = (value) => {
        this.new_ticket = value
    }
    onSyncTransaction = async () => {
        try {
            let newTransaction = {
                id: UUID(),
                items: {
                    movie: this.orderTicket.movie,
                    extras: this.orderTicket.extra,
                    amount: this.orderTicket.total,
                    date: new Date().getTime()
                },
                userId: UserStore.user.id
            }

            await axios.post(`${configs.local_api_base_uri}/transaction`, JSON.stringify({...newTransaction}), {
                headers: {
                    "Content-Type": "application/json"
                }
            })

        } catch (e) {
            console.log(e)
        }
    }

    onSyncTicket = async (ship, desc, result = true) => {
        try {
            PaypalStore.setProcessing(true)
            //create ticket
            if (result) {
                let res = (await axios.post(`${configs.local_api_base_uri}/ticket`, JSON.stringify({
                    ...this.orderTicket,
                    id: UUID(),
                    address: ship,
                    desc: desc,
                    userId: UserStore.user.id
                }), {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })).data

                if (res) {
                    this.setNewTicket(this.new_ticket + 1)
                }

                await this.onSyncTransaction()

                let discount_notification = {
                    id: UUID(),
                    userId: UserStore.user.id,
                    type: 'money',
                    success: true,
                    message: `You bank have discount $${this.orderTicket.total}`,
                }
                await this.onSyncNotification(discount_notification)
            }
            //    create notification
            let ticket_notification = {
                id: UUID(),
                userId: UserStore.user.id,
                type: 'ticket',
                success: result,
                message: result ? `You have booked an ticket of ${this.orderTicket.movie?.title} successfully` : 'You have cancel order.',
            }
            await this.onSyncNotification(ticket_notification)
            PaypalStore.setProcessing(false)
        } catch (e) {
            PaypalStore.setProcessing(false)
            console.log('err : ', e)
        }

    }

    onSyncNotification = async (notification) => {
        let res = (await axios.post(`${configs.local_api_base_uri}/notification`, JSON.stringify(notification), {
            headers: {
                "Content-Type": "application/json"
            }
        })).data
        if (res) {
            NotificationStore.setNewNo(NotificationStore.new_notification + 1)
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
        PaypalStore.setApprovalUrl(null)
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
            let res = (await axios.get(`${configs.local_api_base_uri}/ticket?userId=${UserStore.user.id}&_sort=createdAt&_order=desc`)).data
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