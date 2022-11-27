import {makeAutoObservable, runInAction} from "mobx";
import BaseAPI from "../core/api";
import connectionStore from "./ConnectionStore";
import axios from "axios";
import {configs} from "../core/configs";

class SearchingMovieStore {

    searchingMovie = []

    fetching = false

    searchingMovieByPage = []

    localMovie = []

    showing_page = 1

    showing_limit = 8

    loading = false

    query = ''

    constructor() {
        makeAutoObservable(this)
    }

    setQuery = (value) => {
        this.query = value
    }

    setLoading(isLoading) {
        this.loading = isLoading
    }

    setFetching(isFetching) {
        this.fetching = isFetching
    }

    onSetSearchingMovieByPage = (value) => {
        this.searchingMovieByPage = value
    }

    onSetPage = (value) => {
        this.showing_page = value
    }

    onGetSearchMovieByPage(movies) {
        runInAction(() => {
            if (Math.ceil(movies.length / this.showing_limit) >= this.showing_page + 1) {
                let current_record = this.showing_page * this.showing_limit
                let onPageMovies = movies.slice(current_record, current_record + this.showing_limit)
                onPageMovies.forEach((movie, index) => {
                    this.searchingMovieByPage.push(movie)
                })
                this.onSetPage(this.showing_page + 1)
            }
        })
    }

    onSearchingInLocal = () => {
        let tmp = []
        this.localMovie.forEach((val, index) => {
            if (val?.title === this.query) {
                tmp.push(val)
            }
        })
        return tmp.length > 0 ? tmp : null
    }
    onSaveSearchingMovieInLocal = (movies) => {
        let tmp = new Array(this.localMovie)
        this.localMovie.forEach((val, index) => {
            movies.forEach((val_, index) => {
                if (val_?.title !== val?.title) {
                    tmp.push(val_)
                }
            })
        })
        this.onSetLocalMovie(new Set(tmp))
    }
    onSetLocalMovie = (value) => {
        this.localMovie = value
    }

    onSetMovie = (value) => {
        this.searchingMovie = value
    }
    onGetSearchingMovie = async () => {
        try {
            if (await connectionStore.checkConnection() === true && !this.fetching) {
                if (this.query.trim() !== '') {
                    let isLocal = true
                    this.setFetching(true)
                    if (this.localMovie.length > 0) {
                        let localRes = this.onSearchingInLocal()
                        if (localRes !== null && localRes.length > 0) {
                            console.log('searching in local:', localRes)
                            this.onGetSearchMovieByPage(localRes)
                        } else {
                            isLocal = false
                        }
                    } else {
                        isLocal = false
                    }
                    if (!isLocal) {
                        let res = (await axios.get(`${configs.api_en_base_uri}/SearchMovie/${configs.token}/${this.query}`)).data
                        console.log(`${configs.api_en_base_uri}/SearchMovie/${configs.token}/${this.query}`)
                        if (res) {
                            console.log('searching in online : ', res.results)
                            this.onSetLocalMovie(res.results)
                            this.onSetMovie(res.results)
                            this.onGetSearchMovieByPage(res.results)
                        }
                    }
                    this.setFetching(false)
                }
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

    clearAllState() {
        this.onSetMovie([])
        this.onSetSearchingMovieByPage([])
        this.onSetLocalMovie([])
        this.onSetPage(0)
        this.setFetching(false)
    }
}

const searchingMovieStore = new SearchingMovieStore();
export default searchingMovieStore