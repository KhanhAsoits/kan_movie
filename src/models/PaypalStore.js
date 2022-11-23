import {makeAutoObservable} from "mobx";
import {configs} from "../core/configs";
import axios from "axios";
import {Alert} from "react-native";

class PaypalStore {
    token = ''
    paymentId = ''
    transactionAmount = 0
    transactionDetail = {}
    approval_url = ''
    processing = false


    constructor() {
        makeAutoObservable(this)
    }


    setProcessing = (value) => {
        this.processing = value
    }
    setTransactionDetail = (value) => {
        this.transactionDetail = value
    }
    setTransactionAmount = (value) => {
        this.transactionAmount = value
    }

    setPaymentId = (value) => {
        this.paymentId = value
    }
    createAnOrder = async () => {
        try {
            this.setProcessing(true)
            let detail = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "transactions": [
                    {
                        "amount": {
                            "total": this.transactionAmount > 0 ? this.transactionAmount.toString() + ".00" : "10.00",
                            "currency": "USD",
                            "details": {
                                "subtotal": this.transactionAmount > 0 ? this.transactionAmount.toString() + ".00" : "10.00",
                                "tax": "0.00",
                                "shipping": "0.00",
                                "handling_fee": "0.00",
                                "shipping_discount": "0.00",
                                "insurance": "0.00"
                            }
                        }
                    }
                ],

                "redirect_urls": {
                    "return_url": "https://kan_movie.com/return",
                    "cancel_url": "https://kan_movie.com/cancel"
                }
            }
            this.setTransactionDetail(detail)
            //    fetch token
            await this.getToken()
            let payment = await this.createAnPayment()
            console.log(payment)
            if (payment) {
                if (payment?.id) {
                    this.setPaymentId(payment?.id)
                }
                let url = payment?.links.filter((url) => url.rel === "approval_url")[0]?.href
                if (url) {
                    this.setApprovalUrl(url)
                }
            }
            this.setProcessing(false)
        } catch (e) {
            this.setProcessing(false)
            Alert.alert('Notification', 'Disconnect.')
            console.log(e)
        }
    }

    setApprovalUrl = (url) => {
        this.approval_url = url
    }

    createAnPayment = async () => {
        return (await axios.post(`${configs.paypal_base_uri}/payments/payment`, JSON.stringify(this.transactionDetail), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        })).data
    }

    restoreToken = (token) => {
        this.token = token
    }

    getTransactionResult = async (PayerID) => {
        try {
            this.setProcessing(true)
            await this.getToken()
            let result = (await axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${this.paymentId}/execute`, JSON.stringify({payer_id: PayerID}), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                }
            })).data
            this.setProcessing(false)
            return result
        } catch (e) {
            this.setProcessing(false)
            Alert.alert('Notification', 'Something wrong.')
            console.log(e)
        }
    }
    getToken = async () => {
        try {
            let client_id = configs.paypal_client_id
            let client_secret = configs.paypal_client_secret
            const token = (await axios.post(`${configs.paypal_base_uri}/oauth2/token`, 'grant_type=client_credentials', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Language': 'en_US',
                },
                auth: {
                    username: client_id,
                    password: client_secret
                }
            })).data?.access_token
            console.log('get new token : ', token)
            if (token) {
                this.restoreToken(token)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

const paypalStore = new PaypalStore()
export default paypalStore