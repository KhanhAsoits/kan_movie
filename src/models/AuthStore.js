import {makeAutoObservable} from "mobx";
import axios from "axios";
import {configs} from "../core/configs";
import {Alert} from "react-native";
import UserStore from "./UserStore";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import * as Aes from 'crypto-js/aes'
import * as Crypto from "crypto-js";

class AuthStore {
    isLogin = false
    loginFetching = false
    authInfo = {
        username: "",
        password: ""
    }
    userSignUp = {
        username: '',
        email: '',
        phone: '',
        password: '',
        birthday: '',
        time: '',
        avatar: ''
    }
    isSignInValid = false;
    emailValidCode = '';

    constructor() {
        makeAutoObservable(this)
    }


    await(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    onGetEmailValidCode = async () => {

        try {
            let res = (await axios.get(`${configs.local_api_base_uri}/mail/verify/${this.userSignUp.email}`)).data
            if (res) {
                this.onSetEmailValidCode(res?.opt)
            }
        } catch (e) {
            console.log(e)
        }
    }
    onSetEmailValidCode = (value) => {
        this.emailValidCode = value
    }

    async onGetUserById(id) {
        try {
            let isSuccess = true
            await this.await(1000)
            let uri = `${configs.local_api_base_uri}/users/${id}`
            let res = (await axios.get(uri)).data
            console.log('res:', res)

            if (res.length <= 0) {
                isSuccess = false
                Alert.alert("notification", "Something wrong when auto login,please sign in again!")
            } else {
                UserStore.setUser(res)
            }
            return isSuccess
        } catch (e) {
            console.log(e)
        }
    }

    onCheckEmailExit = async () => {
        try {
            let res = (await axios.get(`${configs.local_api_base_uri}/users?email=${this.userSignUp.email}`)).data
            console.log(res)
            return res.length <= 0;
        } catch (e) {
            console.log(e)
        }
    }

    async onPostLogin() {
        this.setLoginFetching(true)
        let isSuccess = true
        await this.await(1000)
        console.log(authStore.authInfo.password)
        let uri = `${configs.local_api_base_uri}/users?email=${this.authInfo.username}&password=${this.onHashPassword(this.authInfo.password)}`
        let res = (await axios.get(uri)).data
        console.log(uri)

        if (res.length <= 0) {
            isSuccess = false
            Alert.alert("notification", "Email or password incorrect!")
        } else {
            console.log(res)
            UserStore.setUser(res[0])
        }
        this.setLoginFetching(false)
        return isSuccess
    }

    setLoginFetching(value) {
        this.loginFetching = value
    }

    setIsLogin(value) {
        this.isLogin = value
    }

    setUserName(value) {
        this.authInfo.username = value
    }

    setPassword(value) {
        this.authInfo.password = value
    }

    onHashPassword(password) {
        return Crypto.HmacSHA1(password, configs.auth_secret).toString()
    }

    setSignInValid(b) {
        this.isSignInValid = b
    }

    setUserEmail = (value) => {
        this.userSignUp.email = value
    }

    setUserPassword = (value) => {
        this.userSignUp.password = value
    }
    setUserSignUpName = (value) => {
        this.userSignUp.username = value
    }
    setUserSignUpBirthDay = (val) => {
        this.userSignUp.birthday = val
    }
    setPhone = (val) => {
        this.userSignUp.phone = val
    }
    setTime = (val) => {
        this.userSignUp.time = val
    }
    setAvatar = (val) => {
        this.userSignUp.avatar = val
    }

    onCheckNameAndPhone = async () => {
        let isValid = true
        try {
            let res = await axios.get(`${configs.local_api_base_uri}/users?username=${this.userSignUp.username}`)
            if (res.data?.length > 0) {
                Alert.alert('Waning','Username has taken.')
                return false
            }
            let phone_res = await axios.get(`${configs.local_api_base_uri}/users?phone=${this.userSignUp.phone}`)
            if (phone_res.data?.length > 0) {
                Alert.alert('Waning','Phone has taken.')
                return  false
            }
            return true
        } catch (e) {
            return false
            console.log(e)
        }
    }

    async onSignUp() {
        try {
            let res_reg_up = (await axios.post(`${configs.local_api_base_uri}/users`, JSON.stringify({
                ...this.userSignUp,
                password: this.onHashPassword(this.userSignUp.password),
                id: UUID()
            }), {
                headers: {
                    "Content-Type": "application/json"
                }
            })).data

            if (res_reg_up) {
                UserStore.setUser(res_reg_up)
            }
        } catch (e) {
            console.log(e)
        }
    }

    clearUserSignUp() {
        this.setUserSignUpName('')
        this.setUserEmail('')
        this.setUserSignUpBirthDay('')
        this.setTime('')
        this.setPhone('')
        this.setAvatar('')
        this.setPassword('')
    }
}

const authStore = new AuthStore();
export default authStore