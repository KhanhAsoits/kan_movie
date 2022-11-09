import {makeAutoObservable, runInAction} from "mobx";
import {configs} from "../core/configs";
import axios from "axios";
import movie from "../views/components/Movie";

class SingleMovieStore {

    active = 1

    isFetching = true
    isLoading = false

    movie = {}

    constructor() {
        makeAutoObservable(this)
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