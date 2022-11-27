import SearchResultScreen from "../views/screens/search/SearchResultScreen";
import {observer} from "mobx-react";
import {useNavigation} from "@react-navigation/native";
import SearchingMovieStore from "../models/SearchingMovieStore";
import {useEffect} from "react";

const SearchResultViewModel = ({route}) => {
    const nav = useNavigation()
    const handleBack = () => {
        if (SearchingMovieStore.query.trim().length > 0) {
            SearchingMovieStore.setQuery('')
        } else {
            nav.navigate('home_screen')
        }
    }

    useEffect(() => {
        nav.addListener('beforeRemove', (e) => {
            SearchingMovieStore.clearAllState()
        })
    }, [nav])

    useEffect(() => {
        const bs_sync = async () => {
            await SearchingMovieStore.onGetSearchingMovie()
        }
        bs_sync()
    }, [SearchingMovieStore.query])

    return (
        <SearchResultScreen movies={SearchingMovieStore.searchingMovieByPage} nav={nav} handleBack={handleBack}/>
    )
}
export default observer(SearchResultViewModel)