import SearchResultScreen from "../views/screens/search/SearchResultScreen";
import {observer} from "mobx-react";

const SearchResultViewModel = ({route}) => {
    return (
        <SearchResultScreen movies={[]}/>
    )
}
export default observer(SearchResultViewModel)