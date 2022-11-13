import {makeAutoObservable, runInAction} from "mobx";
import BaseAPI from "../core/api";
import connectionStore from "./ConnectionStore";

class ShowingMoviesStore {

    showingMovies = []

    fetching = true

    showingMoviesByPage = new Set()

    showing_page = 1

    showing_limit = 8

    loading = false

    constructor() {
        makeAutoObservable(this)
    }


    setLoading(isLoading) {
        this.loading = isLoading
    }

    setFetching(isFetching) {
        this.fetching = isFetching
    }

    onGetShowingMovieByPage() {
        //if data not fetch check default data
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

    onGetShowingMovieByPageLoading() {
        runInAction(() => {
            if (!this.loading) {
                if (Math.round(this.showingMovies.length / this.showing_limit) - 1 > this.showing_page) {
                    this.setLoading(true)
                    this.showing_page += 1
                    let current_record = this.showing_page * this.showing_limit
                    let onPageMovies = this.showingMovies.slice(current_record, current_record + this.showing_limit)
                    onPageMovies.forEach((movie, index) => {
                        this.showingMoviesByPage.add(movie)
                    })
                    this.setLoading(false)
                }
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
                if (await connectionStore.checkConnection() === false) {
                    connectionStore.setConnected(false)
                }
                this.setFetching(false)
            }
        } catch (e) {
            console.log(e)
            this.setFetching(false)
            connectionStore.setConnected(false)
        }
    }
}

const movieStore = new ShowingMoviesStore();
export default movieStore