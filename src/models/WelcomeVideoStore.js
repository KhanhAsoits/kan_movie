import {makeAutoObservable} from "mobx";

class WelcomeVideoStore {


    muted = true
    play = true

    constructor() {
        makeAutoObservable(this)
    }

    setMuted(value) {
        this.muted = value
        console.log(this.muted)
    }

    setPlay(value) {
        this.play = value
    }
}

export default new WelcomeVideoStore()