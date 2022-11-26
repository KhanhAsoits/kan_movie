import SingleMovie from "../views/screens/movie_detail/SingleMovie";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import HomeSwitchItem from "../core/types/HomeSwitchItem";
import SingleMovieStore from "../models/SingleMovieStore";
import DetailTabViewModel from "./DetailTabViewModel";
import ReviewTabViewModel from "./ReviewTabViewModel";
import ShowTimeTabViewModel from "./ShowTimeTabViewModel";
import {useNavigation} from "@react-navigation/native";
import ConnectionStore from "../models/ConnectionStore";
import {ErrorScreen} from "../views/screens/errors/ErrorScreen";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";

const SingleMovieViewModel = ({route}) => {
    const {movie_id,showTime} = route.params
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

    let detailTab = new HomeSwitchItem(1, 'Detail', 'single_movie/:id', {}, <DetailTabViewModel nav={nav}/>)

    let reviewTab = new HomeSwitchItem(2, 'Reviews', 'single_movie/:id/reviews', {}, <ReviewTabViewModel/>)
    let showtimeTab = new HomeSwitchItem(3, 'Showtime', 'single_movie/:id/show_time', {}, <ShowTimeTabViewModel
        showTime={showTime}
        nav={nav}/>)

    let tabLinks = [detailTab, reviewTab, showtimeTab]
    useEffect(() => {

        SingleMovieStore.setFetching(true)
        const async_bs = async () => {
            if (await ConnectionStore.checkConnection()) {
                if (await ConnectionStore.checkConnection()) {
                    await SingleMovieStore.onGetMovie(movie_id)
                }
            }
            SingleMovieStore.setFetching(false)
        }
        setTimeout(() => {
            if (Object.keys(SingleMovieStore.movie).length === 0 || SingleMovieStore.movie.id !== movie_id) {
                async_bs()
            }
        }, 100)

    }, [movie_id, ConnectionStore.connected])

    return (
        <>
            {ConnectionStore.connected ?
                <SingleMovie nav={nav} handleBack={handleBack} handleSwitch={handleSwitch}
                             movie={SingleMovieStore.movie}
                             links={tabLinks}></SingleMovie>
                :
                <NativeBaseProvider>
                    <ErrorScreen message={'Disconnect >.<'}/>
                </NativeBaseProvider>
            }
        </>
    )
}
export default observer(SingleMovieViewModel)