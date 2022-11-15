import {makeAutoObservable, runInAction} from "mobx";
import connectionStore from "./ConnectionStore";
import BaseAPI from "../core/api";

class ComingSoonMovieStore {

    comingSoonMovies = []
    comingSoonMoviesByPage = new Set()

    coming_page = 1
    coming_limit = 8

    fetching = true

    loading = false

    setLoading(isLoading) {
        this.loading = isLoading
    }

    constructor(props) {
        makeAutoObservable(this)
    }

    setFetching(isFetching) {
        this.fetching = isFetching
    }

    onGetComingSoonMoviePage() {
        let current_record = this.coming_page * this.coming_limit
        let onPageMovies = this.comingSoonMovies.slice(current_record, current_record + this.coming_limit)
        let tpm = [...this.comingSoonMoviesByPage]
        onPageMovies.forEach((movie, index) => {
            tpm.push(movie)
        })
        this.setMovieByPage(tpm)
    }

    setMovieByPage(value) {
        this.comingSoonMoviesByPage = new Set(value)
    }

    setMovie(value) {
        this.comingSoonMovies = value
    }

    async onGetComingSoonMovie() {
        try {
            if (await connectionStore.checkConnection() === true && this.comingSoonMovies.length === 0) {
                this.setFetching(true)
                let res = await BaseAPI.get('ComingSoon')
                this.setMovie(res.items)
                this.onGetComingSoonMoviePage()
                this.setFetching(false)
            } else {
                this.setFetching(false)
            }
        } catch (e) {
            console.log(e)
            this.setFetching(false)
        }
    }

    setPage(value) {
        this.coming_page = value
    }

    onGetComingSoonMovieByPageLoading() {
        runInAction(() => {
            if (!this.loading) {
                if (Math.round(this.comingSoonMovies.length / this.coming_limit) - 1 > this.coming_page) {
                    this.setLoading(true)
                    this.setPage(this.coming_page + 1)
                    let current_record = this.coming_page * this.coming_limit
                    let onPageMovies = this.comingSoonMovies.slice(current_record, current_record + this.coming_limit)
                    runInAction(() => {
                        onPageMovies.forEach((movie, index) => {
                            this.comingSoonMoviesByPage.add(movie)
                        })
                    })
                    this.setLoading(false)
                }
            }
        })
    }
}

const comingSoonMovieStore = new ComingSoonMovieStore();
export default comingSoonMovieStore