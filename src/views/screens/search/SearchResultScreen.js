import MovieGenerator from "../../components/MovieGenerator";
import {observer} from "mobx-react";
import {Box, HStack, ScrollView} from "native-base";
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
import showingMoviesStore from "../../../models/ShowingMoviesStore";

const SearchResultScreen = ({movies, nav, handleBack}) => {
    const handleLoad = (event) => {
        const spaceToEnd = 250
        if (event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - spaceToEnd) {
            SearchingMovieStore.onGetSearchMovieByPage(SearchingMovieStore.searchingMovie)
        }
    }
    return (
        <NativeBaseProvider>
            <Box flex={1} px={4} py={6} bgColor={ThemeStore.baseProps.themeBg}>
                <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} onScroll={handleLoad}>
                    <HStack pl={2} py={1} px={1} bgColor={ThemeStore.baseProps.text_black_02} borderRadius={6}
                            justifyContent={'space-between'}
                            alignItems={'center'}>
                        <TextInput  style={styles.searchInput} value={SearchingMovieStore.query}
                                   onChangeText={text => SearchingMovieStore.setQuery(text)} autoFocus={true}
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
                            <MovieGenerator nav={nav} movies={movies}></MovieGenerator>
                        </Box>
                    }
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    searchInput: {
        fontSize: 18,
        width: '90%',
        color:ThemeStore.baseProps.text_24
    }
})
export default observer(SearchResultScreen)