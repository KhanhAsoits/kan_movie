import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, ScrollView, Text} from "native-base/src/index";
import {observer} from "mobx-react";
import SingleMovieHeader from "../components/SingleMovieHeader";
import SingleMovieTitle from "../components/SingleMovieTitle";
import SingleMovieTab from "../components/SingleMovieTab";
import singleMovieStore from "../../models/SingleMovieStore";
import Loader from "../components/Loader";

const SingleMovie = ({movie, links, handleSwitch, handleBack}) => {

    return (
        <NativeBaseProvider>
            {singleMovieStore.isFetching ?
                <Loader></Loader> :
                <Box flex={1} bgColor={'white'}>
                    <ScrollView style={{zIndex: 1}} flex={1} bgColor={'white'}>
                        <SingleMovieHeader handleBack={handleBack} image={movie?.image}
                                           background={movie?.trailer?.thumbnailUrl}></SingleMovieHeader>
                        <SingleMovieTitle title={movie.fullTitle} contentRating={movie?.contentRating}
                                          rating={movie?.imDbRating} generics={movie?.genres} time={movie?.runtimeStr}/>
                        <SingleMovieTab handleSwitch={handleSwitch} links={links}/>
                    </ScrollView>
                </Box>
            }
        </NativeBaseProvider>
    )
}
export default observer(SingleMovie)

