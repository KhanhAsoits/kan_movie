import {makeAutoObservable, runInAction} from 'mobx'
import {configs} from "../core/configs";
import {Alert} from "react-native";
import axios from "axios";
import AuthStore from "./AuthStore";

class UserStore {
    user = {
        id: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        birthday: '',
        time: '',
        avatar: ''
    }

    autoLogin = false

    userUpdate = {
        username: '',
        email: '',
        phone: '',
        password: '',
        birthday: '',
        time: '',
        avatar: ''
    }

    constructor() {
        makeAutoObservable(this)
    }

    setUserUpdateName = (value) => {
        this.userUpdate.username = value
    }

    setUserUpdateEmail = (value) => {
        this.userUpdate.email = value
    }

    setUserUpdatePassword = (value) => {
        this.userUpdate.password = value
    }

    setUserUpdateBirthday = (value) => {
        this.userUpdate.birthday = value
    }

    setUserUpdatePhone = (value) => {
        this.userUpdate.phone = value
    }

    setUserUpdateTime = (value) => {
        this.userUpdate.time = value
    }

    setUser = (value) => {
        this.user = value
    }

    setLogin = (value) => {
        this.isLogin = value
    }

    async onFetchUser() {

    }

    setUserUpdateData = (type, value) => {

        switch (type) {
            case 'username':
                this.setUserUpdateName(value)
                break;
            case 'email':
                this.setUserUpdateEmail(value)
                break;
            case 'phone':
                this.setUserUpdatePhone(value)
                break;
            case 'birthday':
                this.setUserUpdateBirthday(value)
                break;
            case 'time':
                this.setUserUpdateTime(value)
                break;
            default:
                break;
        }

    }
    onGetUpdateInfo = () => {
        if (this.onCheckChange()) {
            console.log(this.userUpdate)
            let updateInfo = {...this.user}
            for (let item in this.user) {
                for (let update_item in this.userUpdate) {
                    if (this.userUpdate[update_item] !== '') {
                        if (this.user[item] !== this.userUpdate[update_item]) {
                            updateInfo[update_item] = this.userUpdate[update_item]
                            break;
                        }
                    }
                }
            }
            return updateInfo
        }
        return null
    }

    onUpdate = async () => {
        let updateInfo = this.onGetUpdateInfo()
        if (updateInfo !== null) {
            let uri = `${configs.local_api_base_uri}/users/${this.user?.id}`
            let res = (await axios.put(uri, JSON.stringify(updateInfo), {headers: {"Content-Type": "application/json"}})).data
            if (res) {
                this.setUser(res)
                this.clearUserUpdateState()
                Alert.alert('Notification', 'Saved.')
            }
        } else {
            Alert.alert('Notification', 'Nothing To Saved.')
        }
    }
    onCheckChange = () => {
        let isChange = false
        for (let update_item in this.userUpdate) {
            if (this.userUpdate[update_item] !== '') {
                isChange = true
                break
            }
        }
        return isChange
    }

    clearUserUpdateState() {
        this.setUserUpdateName('')
        this.setUserUpdatePhone('')
        this.setUserUpdateEmail('')
        this.setUserUpdateBirthday('')
        this.setUserUpdateTime('')
        this.setUserUpdatePassword('')
        this.setUserUpdateAvatar('')
    }

    setUserUpdateAvatar = (result) => {
        this.userUpdate.avatar = result
    }

    onCheckOldPassword = async (password) => {
        try {
            let res = await axios.get(`${configs.local_api_base_uri}/users?password=${AuthStore.onHashPassword(password)}`)
            if (res.data?.length > 0) {
                return true
            }
            return false
        } catch (e) {
            console.log(e)
        }
    }
    onChangePassword = async (password) => {
        try {

            let updatePassword = {...this.user, password: AuthStore.onHashPassword(password)}
            let res = (await axios.put(`${configs.local_api_base_uri}/users/${this.user.id}`, JSON.stringify(updatePassword), {
                headers: {
                    "Content-Type": "application/json"
                }
            })).data
            if (res) {
                console.log(res)
                this.setUser(res)
                AuthStore.setIsLogin(false)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

const userStore = new UserStore()
export default userStore