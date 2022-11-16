import {makeAutoObservable} from 'mobx'

class HomeStore {
    active = 1

    showHeader = true

    searching = false

    constructor() {
        makeAutoObservable(this)
    }

    setSearching(value) {
        this.searching = value
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