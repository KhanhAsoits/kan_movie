import {makeAutoObservable, runInAction} from "mobx";
import BaseAPI from "../core/api";
import connectionStore from "./ConnectionStore";
import axios from "axios";
import {configs} from "../core/configs";

class SearchingMovieStore {

    showingMovies = []

    query = ''

    fetching = false

    showingMoviesByPage = new Set()

    showing_page = 1

    showing_limit = 8

    loading = false

    his_movie = []

    constructor() {
        makeAutoObservable(this)
    }

    setLoading(isLoading) {
        this.loading = isLoading
    }

    setFetching(isFetching) {
        this.fetching = isFetching
    }

    onGetSearchMovieByPage() {
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

    onGetSearchMovieByPageLoading() {
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

    searchInLocal() {
        let reg = `/*.${this.query}.*/`
        let localResult = this.showingMovies.filter((val, index) => {
            return val?.title.match(reg)
        })
        return localResult ? localResult : []
    }


    async onGetShowingMovie() {
        try {
            if (await connectionStore.checkConnection() === true && this.showingMovies.length === 0) {
                let searchInLocal = false
                let res = this.showingMovies
                if (this.showingMovies.length === 0) {
                    if (this.query.trim() !== "") {
                        res = (await axios.get(`${configs.api_en_base_uri}/SearchMovie/${configs.token}/${this.query}`)).data
                        console.log('fetch')
                    } else {
                        searchInLocal = true
                    }
                } else {
                    searchInLocal = true
                }
                runInAction(() => {
                    this.fetching = true
                    if (!searchInLocal) {
                        console.log('fetch online')
                        this.showingMovies = res?.results
                    } else {
                        console.log('fetch local')
                        this.his_movie = this.showingMovies
                        this.showingMovies = this.searchInLocal()
                    }
                    console.log('after fetch  : ', this.showingMovies)
                    this.onGetSearchMovieByPage()
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

    setQuery(text) {
        this.query = text
    }
}

const searchingMovieStore = new SearchingMovieStore();
export default searchingMovieStore