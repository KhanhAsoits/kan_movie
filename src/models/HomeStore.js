import {makeAutoObservable} from 'mobx'

class HomeStore {
    active = 1

    constructor() {
        makeAutoObservable(this)
    }

    setActive(value) {
        this.active = value
    }
}

const homeStore = new HomeStore()
export default homeStore;