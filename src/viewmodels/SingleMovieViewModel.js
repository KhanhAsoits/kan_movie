import SingleMovie from "../views/screens/SingleMovie";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import homeStore from "../models/HomeStore";
import HomeSwitchItem from "../core/types/HomeSwitchItem";
import ShowingScreen from "../views/screens/ShowingScreen";
import showingMoviesStore from "../models/ShowingMoviesStore";
import SingleMovieStore from "../models/SingleMovieStore";
import DetailTabViewModel from "./DetailTabViewModel";
import ReviewTabViewModel from "./ReviewTabViewModel";
import ShowTimeTabViewModel from "./ShowTimeTabViewModel";

const SingleMovieViewModel = ({route, nav}) => {
    const [refreshing, setRefreshing] = useState(false)
    const handleSwitch = (id) => {
        SingleMovieStore.setActive(id)
    }
    const handleRefresh = () => {
    }
    let detailTab = new HomeSwitchItem(1, 'Detail', 'single_movie/:id', {},<DetailTabViewModel/>)

    let reviewTab = new HomeSwitchItem(2, 'Reviews', 'single_movie/:id/reviews', {},<ReviewTabViewModel/>)
    let showtimeTab = new HomeSwitchItem(3, 'Showtime', 'single_movie/:id/show_time', {},<ShowTimeTabViewModel/>)
    let tabLinks = [detailTab, reviewTab, showtimeTab]
    useEffect(() => {
        homeStore.setHidden(false)
    }, [])
    return (
        <SingleMovie handleSwitch={handleSwitch} movie={{}} links={tabLinks}></SingleMovie>
    )
}
export default observer(SingleMovieViewModel)