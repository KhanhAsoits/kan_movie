import {observer} from "mobx-react";
import {ScrollView} from "native-base/src";
import {Dimensions, RefreshControl} from "react-native";
import showingMoviesStore from "../../../models/ShowingMoviesStore";
import MovieGenerator from "../../components/MovieGenerator";
import movieStore from "../../../models/ShowingMoviesStore";
import Loader from "../../components/Loader";
import {useNavigation} from "@react-navigation/native";
import ThemeStore from "../../../models/ThemeStore";

const ShowingScreen = ({id, movies, screenWidth, refreshing, handleRefresh}) => {

    const navigation = useNavigation()

    const handleLoad = (event) => {
        const spaceToEnd = 250
        if (event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - spaceToEnd) {
            showingMoviesStore.onGetShowingMovieByPageLoading()
        }
    }

    return (
        <ScrollView bgColor={ThemeStore.baseProps.themeBg} px={3}
                    scrollEventThrottle={16}
                    onScroll={handleLoad}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>
                    }
                    key={Math.random().toString()} flex={1}>

            <MovieGenerator comingSoon={false} movies={movies} width={screenWidth - 23}
                            nav={navigation}></MovieGenerator>
            {movieStore.fetching && <Loader></Loader>}
        </ScrollView>
    )
}

export default observer(ShowingScreen)