import {observer} from "mobx-react";
import HomeScreen from "../views/screens/HomeScreen";
import HomeSwitchItem from "../core/types/HomeSwitchItem";
import {useCallback, useEffect, useState} from "react";
import ShowingScreen from "../views/screens/ShowingScreen";
import ComingSoonScreen from "../views/screens/ComingSoonScreen";
import homeStore from "../models/HomeStore";
import comingSoonMovieStore from "../models/ComingSoonMovieStore";
import showingMoviesStore from "../models/ShowingMoviesStore";
import {Dimensions} from "react-native";
import connectionStore from "../models/ConnectionStore";
import SingleMovieVIewModel from "./SingleMovieViewModel";
import {createStackNavigator} from "@react-navigation/stack";
import {useFocusEffect} from "@react-navigation/native";
import SingleMovieStore from "../models/SingleMovieStore";

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
    }, [homeStore.active, connectionStore.connected])

    const ScreenWidth = Dimensions.get("window").width
    //get movie when switch tab

    //refresh controller
    const [refreshing, setRefreshing] = useState(false)
    const handleRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 500)
        const bs = async () => {
            if (homeStore.active === 1) {
                await showingMoviesStore.onGetShowingMovie()
            } else {
                await comingSoonMovieStore.onGetComingSoonMovie()
            }
        }
        bs()
    }, [])

    //tab data
    let showingLink = new HomeSwitchItem(1, 'Now Showing', 'home/showing', {
        size: 20,
        name: 'play-circle-outline',
        color: 'white'
    }, <ShowingScreen
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        screenWidth={ScreenWidth}
        id={1} nav={nav}
        movies={showingMoviesStore.showingMoviesByPage}/>)
    let comingSonLink = new HomeSwitchItem(2, 'Coming Soon', 'home/coming-son', {
        size: 20,
        name: 'alarm-outline',
        color: 'white'
    }, <ComingSoonScreen handleRefresh={handleRefresh} refreshing={refreshing} screenWidth={ScreenWidth} nav={nav}
                         id={2}
                         movies={comingSoonMovieStore.comingSoonMoviesByPage}/>)

    const switchTabItems = [showingLink, comingSonLink]


    useEffect(() => {
        SingleMovieStore.clearState()
        homeStore.setActive(switchTabItems[0].id)
    }, [])



    const handleSwitch = (id) => {
        homeStore.setActive(id)
    }

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={'home_screen'}
                          children={(props) => <HomeScreen {...props} active={homeStore.active}
                                                           links={switchTabItems}
                                                           handleSwitch={handleSwitch}/>}></Stack.Screen>
            <Stack.Screen name={'single_movie'} options={{
                headerShown: false
            }} component={SingleMovieVIewModel}></Stack.Screen>
        </Stack.Navigator>
    )

}

export default observer(HomeViewModel
)