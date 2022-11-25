import {makeAutoObservable} from 'mobx'

class ThemeStore {
    mode = "light"


    baseProps = {
        themeBg: this.mode === "light" ? 'white' : '#0F1B2B',
        text_24: this.mode === "light" ? 'black' : 'white',
        text_black_06: this.mode === "light" ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,.6)',
        text_black_02: this.mode === "light" ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,.2)',
        review_bg:this.mode === "light" ? 'secondary.50' : '#2B3543',
    }


    constructor() {
        makeAutoObservable(this)
    }

    initBaseProps = () => {
        let changeProps = {
            themeBg: this.mode === "light" ? 'white' : '#0F1B2B',
            text_24: this.mode === "light" ? 'black' : 'white',
            text_black_06: this.mode === "light" ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,.6)',
            text_black_02: this.mode === "light" ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,.2)',
            review_bg:this.mode === "light" ? 'secondary.50' : '#2B3543',
        }
        this.setBaseProps({...this.baseProps, ...changeProps})
    }

    setBaseProps = (value) => {
        this.baseProps = value
    }

    setMode = (value) => {
        this.mode = value
    }
    toggleMode = () => {
        this.mode === "light" ? this.setMode('dark') : this.setMode('light')
        this.initBaseProps()
    }
}

const themeStore = new ThemeStore()
export default themeStore