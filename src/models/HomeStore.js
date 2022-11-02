import {makeAutoObservable} from 'mobx'

class HomeStore {
    //
    isLoading = true
    heroes = []

    constructor() {
        makeAutoObservable(this)
    }

    addHero(hero) {
        this.heroes.push(hero)
    }

    deleteHero(id) {
        this.heroes.slice(this.heroes.findIndex(id), 1)
    }
}

const homeStore = new HomeStore()
export default homeStore;