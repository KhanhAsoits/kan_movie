import SingleMovie from "../views/screens/movie_detail/SingleMovie";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import HomeSwitchItem from "../core/types/HomeSwitchItem";
import SingleMovieStore from "../models/SingleMovieStore";
import DetailTabViewModel from "./DetailTabViewModel";
import ReviewTabViewModel from "./ReviewTabViewModel";
import ShowTimeTabViewModel from "./ShowTimeTabViewModel";
import {useNavigation} from "@react-navigation/native";

const SingleMovieViewModel = ({route}) => {
    const {movie_id} = route.params
    const nav = useNavigation()
    nav.addListener('beforeRemove', () => {
        SingleMovieStore.clearState()
    })
    const handleBack = () => {
        nav.goBack()
        SingleMovieStore.clearState()
    }
    const handleSwitch = (id) => {
        SingleMovieStore.setActive(id)
    }

    const handleRefresh = () => {
    }
    let detailTab = new HomeSwitchItem(1, 'Detail', 'single_movie/:id', {}, <DetailTabViewModel nav={nav}/>)

    let reviewTab = new HomeSwitchItem(2, 'Reviews', 'single_movie/:id/reviews', {}, <ReviewTabViewModel/>)
    let showtimeTab = new HomeSwitchItem(3, 'Showtime', 'single_movie/:id/show_time', {}, <ShowTimeTabViewModel nav={nav}/>)

    let tabLinks = [detailTab, reviewTab, showtimeTab]
    useEffect(() => {
        SingleMovieStore.setFetching(true)
        const async_bs = async () => {
            await SingleMovieStore.onGetMovie(movie_id)
            SingleMovieStore.setFetching(false)
        }
        setTimeout(() => {
            if (Object.keys(SingleMovieStore.movie).length === 0 || SingleMovieStore.movie.id !== movie_id) {
                async_bs()
            }
        }, 100)
        console.log('movie : ', SingleMovieStore.movie)
        console.log('fetching : ', SingleMovieStore.isFetching)
    }, [movie_id])

    return (
        <>
            <SingleMovie nav={nav} handleBack={handleBack} handleSwitch={handleSwitch} movie={SingleMovieStore.movie}
                         links={tabLinks}></SingleMovie>
        </>
    )
}
export default observer(SingleMovieViewModel)