import {makeAutoObservable} from 'mobx'

class ThemeStore {
    mode = "light"

    changing = false
    baseProps = {
        themeBg: this.mode === "light" ? '#ecf0f6' : '#0F1B2B',
        text_24: this.mode === "light" ? 'black' : 'white',
        text_black_06: this.mode === "light" ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,.6)',
        text_black_02: this.mode === "light" ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,.1)',
        text_black_03: this.mode === "light" ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,.3)',
        review_bg: this.mode === "light" ? 'secondary.50' : '#2B3543',
    }


    constructor() {
        makeAutoObservable(this)
    }

    setChanging = (value) => {
        this.changing = value
    }
    initBaseProps = () => {
        let changeProps = {
            themeBg: this.mode === "light" ? '#ecf0f6' : '#0F1B2B',
            text_24: this.mode === "light" ? 'black' : 'white',
            text_black_06: this.mode === "light" ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,.6)',
            text_black_02: this.mode === "light" ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,.1)',
            text_black_03: this.mode === "light" ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,.3)',
            review_bg: this.mode === "light" ? 'secondary.50' : '#2B3543',
        }
        this.setBaseProps({...this.baseProps, ...changeProps})
    }

    setBaseProps = (value) => {
        this.baseProps = value
    }

    setMode = (value) => {
        this.mode = value
    }
    wait = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    toggleMode = async () => {
        this.mode === "light" ? this.setMode('dark') : this.setMode('light')
        this.initBaseProps()
    }
}

const themeStore = new ThemeStore()
export default themeStore