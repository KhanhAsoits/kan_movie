import {observer} from "mobx-react";
import {ScrollView} from "native-base/src";
import {MovieGenerator} from "../components/MovieGenerator";
import movieStore from "../../models/ShowingMoviesStore";
import {Loader} from "../components/Loader";
import {Dimensions, RefreshControl} from "react-native";
import {useCallback, useState} from "react";
import {Text} from "native-base";
import showingMoviesStore from "../../models/ShowingMoviesStore";

const ShowingScreen = ({id, movies, nav,handleLoad}) => {
    const ScreenWidth = Dimensions.get("window").width
    const [refreshing, setRefreshing] = useState(false)
    const handleRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 500)
        const bs = async () => {
            await showingMoviesStore.onGetShowingMovie()
        }
        bs()
    }, [])
    return (
        <ScrollView bgColor={'white'} px={3}
                    onScroll={handleLoad}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>
                    }
                    key={Math.random().toString()} flex={1}>
            <MovieGenerator movies={movies} width={ScreenWidth - 23} nav={nav}></MovieGenerator>
            {movieStore.fetching && <Loader></Loader>}
        </ScrollView>
    )
}

export default observer(ShowingScreen)