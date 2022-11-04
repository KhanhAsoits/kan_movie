import {observer} from "mobx-react";
import HomeScreen from "../views/screens/HomeScreen";
import HomeSwitchItem from "../core/types/HomeSwitchItem";
import {useEffect, useState} from "react";
import ShowingScreen from "../views/screens/ShowingScreen";
import ComingSoonScreen from "../views/screens/ComingSoonScreen";
import homeStore from "../models/HomeStore";
import comingSoonMovieStore from "../models/ComingSoonMovieStore";
import showingMoviesStore from "../models/ShowingMoviesStore";

const HomeViewModel = ({route, nav}) => {
    useEffect(() => {
        const bs_async = async () => {
            if (homeStore.active === 1) {
                await showingMoviesStore.onGetShowingMovie()
            } else {
                await comingSoonMovieStore.onGetComingSoonMovie()
            }
        }
        bs_async()
    }, [homeStore.active])

    //get movie when switch tab

    const handleLoadPageShowingMovie = (event) => {
        const spaceToEnd = 250
        if (event.layoutMeasurement.height + event.contentOffset.y >= event.contentSize.height - spaceToEnd) {
            console.log('here')
            // showingMoviesStore.onGetShowingMovieByPage()
        }
    }
    let showingLink = new HomeSwitchItem(1, 'Now Showing', 'home/showing', {
        size: 20,
        name: 'play-circle-outline',
        color: 'white'
    }, <ShowingScreen handleLoad={handleLoadPageShowingMovie} id={1} nav={nav}
                      movies={showingMoviesStore.showingMoviesByPage}/>)
    let comingSonLink = new HomeSwitchItem(2, 'Coming Soon', 'home/coming-son', {
        size: 20,
        name: 'alarm-outline',
        color: 'white'
    }, <ComingSoonScreen nav={nav} id={2} movies={comingSoonMovieStore.comingSoonMoviesByPage}/>)

    const switchTabItems = [showingLink, comingSonLink]

    useEffect(() => {
        homeStore.setActive(switchTabItems[0].id)
    }, [])

    const handleSwitch = (id) => {
        homeStore.setActive(id)
    }

    return (
        <HomeScreen
            handleSwitch={handleSwitch}
            active={homeStore.active}
            links={switchTabItems}
            route={route}
            nav={nav}
        >
        </HomeScreen>
    )

}

export default observer(HomeViewModel
)