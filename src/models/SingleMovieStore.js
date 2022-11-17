import {makeAutoObservable} from "mobx";
import {configs} from "../core/configs";
import axios from "axios";

class SingleMovieStore {

    active = 1

    isFetching = true
    isLoading = false
    reviewFetching = false


    movie = {}

    id = null

    reviews = []

    showtime = {
        dates: [],
        cinemas: [],
        times: []
    }
    showTimeFetching = false
    showTimeGetFetching = false

    constructor() {
        makeAutoObservable(this)
    }

    setShowTimeDates(dates) {
        this.showtime.dates = dates
    }

    setShowTimeCinema(cinemas) {
        this.showtime.cinemas = cinemas
    }

    setShowTime(times) {
        this.showtime.times = times
    }

    setShowtimeGetFetching(value) {
        this.showTimeGetFetching = value
    }

    setReviewFetching(value) {
        this.reviewFetching = value
    }


    setFetching(value) {
        this.isFetching = value
    }

    setActive(value) {
        this.active = value
    }

    clearState() {
        this.setFetching(true)
        this.movie = {}
    }

    setShowTimeFetching(value) {
        this.showTimeFetching = value
    }

    async onGetShowTimeData(movieId) {

        this.setShowTimeFetching(true)
        await this.onGetCinemas()
        await this.onGetDates()
        if (this.showtime.cinemas.length > 0 && this.showtime.dates.length > 0) {
            await this.onGetShowTime(movieId, this.showtime.cinemas[0].id, this.showtime.dates[0].id)
        }
        this.setShowTimeFetching(false)
    }

    setMovie(value) {
        this.movie = value
    }

    async onGetReviews() {
        try {
            if (this.reviews.length === 0 && !this.reviewFetching) {
                this.setReviewFetching(true)
                console.log(`${configs.api_en_base_uri}/Reviews/${configs.token}/${this.movie?.id}`)
                let res = (await axios.get(`${configs.api_en_base_uri}/Reviews/${configs.token}/${this.movie?.id}`)).data
                if (res?.items) {
                    this.reviews = res.items
                } else {
                    console.log('err')
                }
                this.setReviewFetching(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async onGetMovie(id) {
        try {
            let uri = `${configs.api_en_base_uri}/Title/${configs.token}/${id}/FullActor,FullCast,Posters,Images,Trailer,Ratings,`
            console.log(uri)
            let result = (await axios.get(uri)).data
            this.setMovie(result)
        } catch (e) {
            console.log(e)
        }
    }


    async onGetShowTime(cinemaId, date) {

        try {
            let res = (await axios.get(`${configs.local_api_base_uri}/showtime/${this.movie?.id}/${cinemaId}/${date}`)).data
            this.setShowTime(res)
        } catch (e) {
            console.log(e)
        }
    }


    async onGetDates() {
        try {
            const header = {
                "Content-Type": "application/json"
            }
            console.log(`${configs.local_api_base_uri}/date`, {header})
            let res = (await axios.get(`${configs.local_api_base_uri}/date`)).data
            this.setShowTimeDates(res)
        } catch (e) {
            console.log(e)
        }
    }

    async onGetCinemas() {
        try {
            let res = (await axios.get(`${configs.local_api_base_uri}/cinema`)).data
            this.setShowTimeCinema(res)
        } catch (e) {
            console.log(e)
        }
    }
}

const singleMovieStore = new SingleMovieStore()
export default singleMovieStore