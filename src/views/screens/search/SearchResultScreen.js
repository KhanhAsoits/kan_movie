import MovieGenerator from "../../components/MovieGenerator";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {observer} from "mobx-react";
import {BorderlessButton} from "react-native-gesture-handler";
import {Box} from "native-base";

const SearchResultScreen = ({movies}) => {


    return (
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
            search result
            <MovieGenerator movies={movies}></MovieGenerator>
        </Box>
    )

}
export default observer(SearchResultScreen)