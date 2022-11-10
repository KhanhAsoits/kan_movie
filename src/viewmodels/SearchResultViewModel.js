import SearchResultScreen from "../views/screens/SearchResultScreen";
import {observer} from "mobx-react";

const SearchResultViewModel = ({route}) => {
    return (
        <SearchResultScreen movies={[]}/>
    )
}
export default observer(SearchResultViewModel)