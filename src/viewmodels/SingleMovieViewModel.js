import SingleMovie from "../views/screens/SingleMovie";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import HomeSwitchItem from "../core/types/HomeSwitchItem";
import SingleMovieStore from "../models/SingleMovieStore";
import DetailTabViewModel from "./DetailTabViewModel";
import ReviewTabViewModel from "./ReviewTabViewModel";
import ShowTimeTabViewModel from "./ShowTimeTabViewModel";
import {useNavigation} from "@react-navigation/native";
import {BackHandler} from "react-native";

const SingleMovieViewModel = ({route}) => {
    const {movie_id} = route.params
    const [refreshing, setRefreshing] = useState(false)
    const nav = useNavigation()
    const handleBack = () => {
        SingleMovieStore.clearState()
        nav.goBack()
    }
    const handleSwitch = (id) => {
        SingleMovieStore.setActive(id)
    }
    const handleRefresh = () => {
    }
    let detailTab = new HomeSwitchItem(1, 'Detail', 'single_movie/:id', {}, <DetailTabViewModel/>)

    let reviewTab = new HomeSwitchItem(2, 'Reviews', 'single_movie/:id/reviews', {}, <ReviewTabViewModel/>)
    let showtimeTab = new HomeSwitchItem(3, 'Showtime', 'single_movie/:id/show_time', {}, <ShowTimeTabViewModel/>)

    let tabLinks = [detailTab, reviewTab, showtimeTab]
    useEffect(() => {
        const async_bs = async () => {
            await SingleMovieStore.onGetMovie(movie_id)
        }
        if (Object.keys(SingleMovieStore.movie).length === 0 || SingleMovieStore.movie.id !== movie_id) {
            SingleMovieStore.clearState()
            async_bs()
        }
        const backHandle = BackHandler.addEventListener("hardwareBackPress", function () {
            nav.goBack()
        })
        return () => backHandle.remove()
    }, [movie_id])

    BackHandler.addEventListener("hardwareBackPress", function () {
        SingleMovieStore.clearState()
        return true
    })
    return (
        <>
            <SingleMovie handleBack={handleBack} handleSwitch={handleSwitch} movie={SingleMovieStore.movie}
                         links={tabLinks}></SingleMovie>
        </>
    )
}
export default observer(SingleMovieViewModel)