import {makeAutoObservable} from "mobx";
import {checkConnection} from "../core/helper";

class ConnectionStore {

    connected = true

    constructor() {
        makeAutoObservable(this)
    }

    setConnected(isConnected) {
        this.connected = isConnected
    }

    async reloadConnection() {
        this.setConnected(this.checkConnection())
    }

    async checkConnection() {
        return await checkConnection()
    }
}

const connectionStore = new ConnectionStore();
export default connectionStore