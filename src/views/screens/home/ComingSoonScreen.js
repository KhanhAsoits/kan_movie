import {observer} from "mobx-react";
import {ScrollView} from "native-base/src/index";
import {RefreshControl} from "react-native";
import MovieGenerator from "../../components/MovieGenerator";
import comingSoonMovieStore from "../../../models/ComingSoonMovieStore";
import Loader from "../../components/Loader";
import {useNavigation} from "@react-navigation/native";

const ComingSoonScreen = ({movies, screenWidth, refreshing, handleRefresh}) => {
    const handleLoad = (event) => {
        const spaceToEnd = 250
        if (event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - spaceToEnd) {
            comingSoonMovieStore.onGetComingSoonMovieByPageLoading()
        }
    }
    const nav = useNavigation()
    return (
        <ScrollView flex={1}
                    scrollEventThrottle={16}
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