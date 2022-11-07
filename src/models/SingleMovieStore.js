import {makeAutoObservable} from "mobx";

class SingleMovieStore {

    active = 1

    constructor() {
        makeAutoObservable(this)
    }

    setActive(value) {
        this.active = value
    }

}

const singleMovieStore = new SingleMovieStore()
export default singleMovieStore