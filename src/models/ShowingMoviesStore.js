import {makeAutoObservable, runInAction} from "mobx";
import BaseAPI from "../core/api";
import {checkConnection} from "../core/helper";
import connectionStore from "./ConnectionStore";

class ShowingMoviesStore {

    showingMovies = []


    fetching = true

    showingMoviesByPage = new Set()

    showing_page = 1

    showing_limit = 8

    constructor() {
        makeAutoObservable(this)
    }

    setFetching(isFetching) {
        this.fetching = isFetching
    }

    setPage(page) {
        this.showing_page = page
    }

    nextPage() {
        if (Math.ceil(this.showingMovies.length / this.showing_limit) <= this.showing_page + 1) {
            this.showing_page += 1
        }
    }

    onGetShowingMovieByPage() {
        runInAction(() => {
            if (Math.ceil(this.showingMovies.length / this.showing_limit) >= this.showing_page + 1) {
                let current_record = this.showing_page * this.showing_limit
                let onPageMovies = this.showingMovies.slice(current_record, current_record + this.showing_limit)
                onPageMovies.forEach((movie, index) => {
                    this.showingMoviesByPage.add(movie)
                })
            }
        })
    }

    async onGetShowingMovie() {
        try {
            if (await connectionStore.checkConnection() === true && this.showingMovies.length === 0) {
                let res = await BaseAPI.get('InTheaters')
                runInAction(() => {
                    this.fetching = true
                    this.showingMovies = res.items
                    this.onGetShowingMovieByPage()
                    this.fetching = false
                })
            } else {
                this.setFetching(false)
            }
        } catch (e) {
            console.log(e)
            this.setFetching(false)
        }
    }
}

const movieStore = new ShowingMoviesStore();
export default movieStore