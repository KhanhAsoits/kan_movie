import {makeAutoObservable} from "mobx";
import axios from "axios";
import {configs} from "../core/configs";
import UserStore from "./UserStore";

class NotificationStore {
    notifications = []
    fetching = false
    new_notification = 0
    // page = 0
    // limit = 8

    constructor() {
        makeAutoObservable(this)
    }

    setNewNo = (value) => {
        this.new_notification = value
    }
    setNotification = (value) => {
        this.notifications = value
    }
    setFetching = (value) => {
        this.fetching = value
    }

    async onGetNotification() {
        try {
            this.setFetching(true)
            let res = (await axios.get(`${configs.local_api_base_uri}/notification?userId=${UserStore.user.id}`)).data
            this.setNotification(res)
            this.setFetching(false)
        } catch (e) {
            console.log(e)
        }
    }
}

const notificationStore = new NotificationStore();
export default notificationStore