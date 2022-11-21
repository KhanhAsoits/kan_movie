import {makeAutoObservable} from "mobx";
import Base64 from 'crypto-js/enc-base64';
import axios from "axios";
import {configs} from "../core/configs";
import {Alert} from "react-native";
import UserStore from "./UserStore";

class AuthStore {
    isLogin = false
    loginFetching = false
    authInfo = {
        username: "",
        password: ""
    }
    isSignInValid = false;

    constructor() {
        makeAutoObservable(this)
    }


    await(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
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

    async onPostLogin() {
        this.setLoginFetching(true)
        let isSuccess = true
        await this.await(1000)
        let uri = `${configs.local_api_base_uri}/users?email=${this.authInfo.username}`
        let res = (await axios.get(uri)).data
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

    onHashPassword() {
        this.authInfo.password = Base64.stringify(this.authInfo.password);
    }



    setSignInValid(b) {
        this.isSignInValid = b
    }
}

const authStore = new AuthStore();
export default authStore