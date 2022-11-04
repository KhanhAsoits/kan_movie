import {observer} from "mobx-react";
import {Box, Text} from "native-base";
import {ScrollView} from "native-base/src/index";
import homeStore from "../../models/HomeStore";
import {Dimensions, RefreshControl} from "react-native";
import {useCallback, useEffect, useState} from "react";
import movieStore from "../../models/ShowingMoviesStore";
import {MovieGenerator} from "../components/MovieGenerator";
import comingSoonMovieStore from "../../models/ComingSoonMovieStore";
import {Loader} from "../components/Loader";

const ComingSoonScreen = ({nav, id, movies}) => {
    const ScreenWidth = Dimensions.get("window").width
    const [refreshing, setRefreshing] = useState(false)
    const handleRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 500)
        const bs = async () => {
            await comingSoonMovieStore.onGetComingSoonMovie()
        }
        bs()
    }, [])

    return (
        <ScrollView flex={1}
                    bgColor={'white'} px={3}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>
                    }>
            <MovieGenerator movies={movies} width={ScreenWidth - 20} nav={nav}></MovieGenerator>
            {comingSoonMovieStore.fetching && <Loader></Loader>}

        </ScrollView>
    )
}

export default observer(ComingSoonScreen)