import {observer} from "mobx-react";
import HomeScreen from "../views/screens/HomeScreen";
import movieStore from "../models/MovieStore";
import HomeSwitchItem from "../core/types/HomeSwitchItem";
import {useState} from "react";
import ShowingScreen from "../views/screens/ShowingScreen";
import ComingSoonScreen from "../views/screens/ComingSoonScreen";

const HomeViewModel = ({route, nav}) => {

    let showingLink = new HomeSwitchItem(1, 'Now Showing', 'home/showing', {
        size: 20,
        name: 'play-circle-outline',
        color: 'white'
    }, <ShowingScreen/>)
    let comingSonLink = new HomeSwitchItem(2, 'Coming Soon', 'home/coming-son', {
        size: 20,
        name: 'alarm-outline',
        color: 'white'
    }, <ComingSoonScreen/>)

    const switchTabItems = [showingLink, comingSonLink]

    //tab active
    const [active, setActive] = useState(switchTabItems[0]?.id)
    //switch handle
    const handleSwitch = (id) => {
        setActive(id)
    }

    return (
        <HomeScreen
            handleSwitch={handleSwitch}
            active={active}
            links={switchTabItems}
            route={route}
            nav={nav}
            movies={movieStore.movies}
        >
        </HomeScreen>
    )

}

export default observer(HomeViewModel)