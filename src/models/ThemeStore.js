import {action, makeAutoObservable, makeObservable, observable, observe} from 'mobx'
import {} from ''
import {useColorMode} from "native-base";

class ThemeStore {
    mode = "light"
    baseProps = {
        light:{
            text:""
        },
        dark:{}
    }

    constructor() {
        makeObservable(this, {
            setMode: action,
            mode: observable,
        })
    }

    toggleRegister() {
        const {toggle} = useColorMode()


    }

    setMode(mode) {
        this.mode = mode
    }

}