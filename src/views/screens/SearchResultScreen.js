import MovieGenerator from "../components/MovieGenerator";
import {observer} from "mobx-react";
import {Box, ScrollView, Text} from "native-base";
import Loader from "../components/Loader";
import SearchingMovieStore from "../../models/SearchingMovieStore";

const SearchResultScreen = ({movies}) => {
    return (
        <Box flex={1} bgColor={'white'} justifyContent={'center'} alignItems={'center'}>
            <ScrollView flex={1} px={4}>
                <MovieGenerator movies={movies}></MovieGenerator>
                {SearchingMovieStore.fetching && <Loader></Loader>}
                {SearchingMovieStore.loading && <Loader></Loader>}
            </ScrollView>
        </Box>
    )

}
export default observer(SearchResultScreen)