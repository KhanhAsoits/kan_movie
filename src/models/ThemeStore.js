import {makeAutoObservable} from 'mobx'

class ThemeStore {
    mode = "light"


    baseProps = {
        themeBg: this.mode === "light" ? 'white' : 'black',
        text_24: this.mode === "light" ? 'black' : 'white',
        text_black_06: this.mode === "light" ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,.3)'
    }


    constructor() {
        makeAutoObservable(this)
    }

    initBaseProps = () => {
        let changeProps = {
            themeBg: this.mode === "light" ? 'white' : 'black',
            text_24: this.mode === "light" ? 'black' : 'white'
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