import {makeAutoObservable} from 'mobx'

class HomeStore {
    active = 1

    showHeader = true

    constructor() {
        makeAutoObservable(this)
    }

    setActive(value) {
        this.active = value
    }

    setHidden(value) {
        this.showHeader = value
    }
}

const homeStore = new HomeStore()
export default homeStore;