import {makeAutoObservable} from 'mobx'

class UserStore {
    user = {}
    autoLogin = false


    constructor() {
        makeAutoObservable(this)
    }

    setUser(value) {
        this.user = value
    }

    setLogin(value) {
        this.isLogin = value
    }

    async onFetchUser() {

    }
}

const userStore = new UserStore()
export default userStore