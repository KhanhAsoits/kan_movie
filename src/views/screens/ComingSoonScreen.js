import {observer} from "mobx-react";
import {Box, Text} from "native-base";
import {ScrollView} from "native-base/src/index";
import homeStore from "../../models/HomeStore";
import {Dimensions, RefreshControl} from "react-native";
import {useCallback, useEffect, useState} from "react";
import movieStore from "../../models/ShowingMoviesStore";
import MovieGenerator from "../components/MovieGenerator";
import comingSoonMovieStore from "../../models/ComingSoonMovieStore";
import {Loader} from "../components/Loader";
import showingMoviesStore from "../../models/ShowingMoviesStore";

const ComingSoonScreen = ({nav, id, movies, screenWidth, refreshing, handleRefresh}) => {
    const handleLoad = (event) => {
        const spaceToEnd = 250
        if (event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - spaceToEnd) {
            comingSoonMovieStore.onGetComingSoonMovieByPageLoading()
        }
    }
    return (
        <ScrollView flex={1}
                    bgColor={'white'} px={3}
                    onScroll={handleLoad}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>
                    }>
            <MovieGenerator movies={movies} width={screenWidth - 20} nav={nav}></MovieGenerator>
            {comingSoonMovieStore.fetching && <Loader></Loader>}
        </ScrollView>
    )
}

export default observer(ComingSoonScreen)