import MovieGenerator from "../../components/MovieGenerator";
import {observer} from "mobx-react";
import {Box, HStack} from "native-base";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {useNavigation} from "@react-navigation/native";
import {TextInput, StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ThemeStore from "../../../models/ThemeStore";
import SearchingMovieStore from "../../../models/SearchingMovieStore";
import {useEffect} from "react";
import Loader from "../../components/Loader";
import {SCREEN_HEIGHT} from "../../../core/helper";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";

const SearchResultScreen = ({movies}) => {
    const nav = useNavigation()
    const handleBack = () => {
        if (SearchingMovieStore.query.trim().length > 0) {
            SearchingMovieStore.setQuery('')
        } else {
            nav.navigate('home_screen')
        }
    }

    useEffect(() => {
        SearchingMovieStore.setFetching(true)
        setTimeout(() => {
            SearchingMovieStore.setFetching(false)
        }, 1000)
    }, [SearchingMovieStore.query])
    return (
        <NativeBaseProvider>
            <Box flex={1} px={4} py={6} bgColor={ThemeStore.baseProps.themeBg}>
                <HStack pl={2} py={1} px={1} bgColor={ThemeStore.baseProps.text_black_02} borderRadius={6}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                    <TextInput style={styles.searchInput} value={SearchingMovieStore.query} onChangeText={text => SearchingMovieStore.setQuery(text)} autoFocus={true}
                               placeholderTextColor={ThemeStore.baseProps.text_black_06}
                               placeholder={'Type title or movie name to search.'}/>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name={'close'} color={ThemeStore.baseProps.text_black_06} size={36}/>
                    </TouchableOpacity>
                </HStack>
                {SearchingMovieStore.fetching ?
                    <Loader height={SCREEN_HEIGHT - useBottomTabBarHeight() - 40}/>
                    :
                    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
                        <MovieGenerator movies={movies}></MovieGenerator>
                    </Box>
                }

            </Box>
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    searchInput: {
        fontSize:18,
        width: '90%',
    }
})
export default observer(SearchResultScreen)