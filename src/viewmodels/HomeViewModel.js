import {observer} from "mobx-react";
import HomeScreen from "../views/screens/HomeScreen";
import movieStore from "../models/MovieStore";
import HomeSwitchItem from "../core/types/HomeSwitchItem";

const HomeViewModel = ({route, nav}) => {

    let showingLink = new HomeSwitchItem(1, 'Now Showing', 'home/showing', {size: 20, name: 'play-circle-outline', color: 'white'})
    let comingSonLink = new HomeSwitchItem(2, 'Coming Soon', 'home/coming-son', {
        size: 20,
        name: 'alarm-outline',
        color: 'white'
    })
    const switchTabItems = [showingLink, comingSonLink]


    return (
        <HomeScreen
            links={switchTabItems}
            route={route}
            nav={nav}
            movies={movieStore.movies}
        >
        </HomeScreen>
    )

}

export default observer(HomeViewModel)