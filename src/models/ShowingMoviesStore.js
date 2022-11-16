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

    setMovie(value) {
        this.showingMovies = value
    }

    onGetShowingMovieByPage() {
        //if data not fetch check default data
        if (Math.ceil(this.showingMovies.length / this.showing_limit) >= this.showing_page + 1) {

            let current_record = this.showing_page * this.showing_limit
            let onPageMovies = this.showingMovies.slice(current_record, current_record + this.showing_limit)
            let tmp = [...this.showingMoviesByPage]
            onPageMovies.forEach((movie, index) => {
                tmp.push(movie)
            })
            this.setShowingMovieByPage(tmp)
        }
    }

    setShowingMovieByPage(value) {
        this.showingMoviesByPage = new Set(value)
    }

    setShowingPage(value) {
        this.showing_page = value
    }

    onGetShowingMovieByPageLoading() {
        if (!this.loading) {
            if (Math.round(this.showingMovies.length / this.showing_limit) - 1 > this.showing_page) {
                this.setLoading(true)
                this.setShowingPage(this.showing_page + 1)
                let current_record = this.showing_page * this.showing_limit
                let onPageMovies = this.showingMovies.slice(current_record, current_record + this.showing_limit)
                runInAction(() => {
                    onPageMovies.forEach((movie, index) => {
                        this.showingMoviesByPage.add(movie)
                    })
                    this.setLoading(false)
                })
            }
        }
    }

    async onGetShowingMovie() {
        try {
            if (await connectionStore.checkConnection() === true && this.showingMovies.length === 0) {
                this.setFetching(true)
                let res = await BaseAPI.get('InTheaters')
                this.setMovie(res.items)
                this.onGetShowingMovieByPage()
                this.setFetching(false)
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