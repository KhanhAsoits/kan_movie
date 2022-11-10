import SearchResultScreen from "../views/screens/SearchResultScreen";
import {observer} from "mobx-react";
import {useEffect} from "react";
import SearchingMovieStore from "../models/SearchingMovieStore";

const SearchResultViewModel = ({route}) => {

    useEffect(() => {
        const getSync = async () => {
            await SearchingMovieStore.onGetShowingMovie();
        }
        if (!SearchingMovieStore.fetching) {
            console.log('fetch : ', SearchingMovieStore.fetching)
            getSync()
        }
    }, [SearchingMovieStore.query])
    return (
        <SearchResultScreen movies={SearchingMovieStore.showingMovies}/>
    )
}
export default observer(SearchResultViewModel)