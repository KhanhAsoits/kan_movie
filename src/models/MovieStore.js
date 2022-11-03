import {makeAutoObservable} from "mobx";

class MovieStore {


    movies = []

    page = 1

    limit = 8

    constructor() {
        makeAutoObservable(this)
    }

    onGetMovie() {
        //    get by page
    }
}

const movieStore = new MovieStore();
export default movieStore