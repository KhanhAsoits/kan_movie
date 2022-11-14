import {makeAutoObservable, runInAction} from "mobx";
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

    constructor() {
        makeAutoObservable(this)
    }

    setReviewFetching(value) {
        this.reviewFetching = value
    }

    async onGetReviews() {
        try {
            if (this.reviews.length === 0 && !this.reviewFetching) {
                this.setReviewFetching(true)
                let res = (await axios.get(`${configs.api_en_base_uri}/Reviews/${configs.token}/${this.movie?.id}`)).data
                console.log(`${configs.api_en_base_uri}/Reviews/${configs.token}/${this.movie?.id}`)
                if (res?.items) {
                    this.reviews = res.items
                    console.log('items : ', res.items[0])
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
            this.isFetching = true
            let uri = `${configs.api_en_base_uri}/Title/${configs.token}/${id}/FullActor,FullCast,Posters,Images,Trailer,Ratings,`
            console.log(uri)
            let result = (await axios.get(uri)).data
            runInAction(() => {
                this.movie = result
                this.isFetching = false
            })
        } catch (e) {
            console.log(e)
        }
    }

    setFetching(value) {
        this.isFetching = value
    }

    setActive(value) {
        this.active = value
    }

    clearState() {
        console.log('clear state')
        this.setFetching(true)
        this.movie = {}
    }

}

const singleMovieStore = new SingleMovieStore()
export default singleMovieStore