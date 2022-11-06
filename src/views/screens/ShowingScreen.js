import {observer} from "mobx-react";
import {ScrollView} from "native-base/src";
import {Dimensions, RefreshControl} from "react-native";
import showingMoviesStore from "../../models/ShowingMoviesStore";
import MovieGenerator from "../components/MovieGenerator";
import movieStore from "../../models/ShowingMoviesStore";
import {Loader} from "../components/Loader";

const ShowingScreen = ({id, movies, nav, screenWidth, refreshing, handleRefresh}) => {

    const handleLoad = (event) => {
        const spaceToEnd = 250
        if (event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - spaceToEnd) {
            showingMoviesStore.onGetShowingMovieByPageLoading()
        }
    }

    return (
        <ScrollView bgColor={'white'} px={3}
                    onScroll={handleLoad}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>
                    }
                    key={Math.random().toString()} flex={1}>

            <MovieGenerator movies={movies} width={screenWidth - 23} nav={nav}></MovieGenerator>
            {movieStore.fetching && <Loader></Loader>}
        </ScrollView>
    )
}

export default observer(ShowingScreen)