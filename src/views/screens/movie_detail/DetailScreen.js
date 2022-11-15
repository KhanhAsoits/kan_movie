import {Box, ScrollView, Text} from "native-base";
import {SCREEN_WIDTH} from "../../../core/helper";
import {useState} from "react";
import SingleMovieStore from "../../../models/SingleMovieStore";
import SingleMovieCast from "../../components/SingleMovieCast";
import SingleMovePhoto from "../../components/SingleMovePhoto";
import SingleMovieRelated from "../../components/SingleMovieVideo";

export const DetailScreen = ({route, nav}) => {


    const handleViewAllPhoto = () => {
        nav.navigate('photo-review', {photos: SingleMovieStore.movie?.images?.items})
    }
    const handleViewAllCast = () => {
        nav.navigate('cast-review', {casts: SingleMovieStore.movie?.actorList})
    }
    return (
        <ScrollView style={{width: SCREEN_WIDTH}} bgColor={'white'} mt={0} mb={5} showsVerticalScrollIndicator={false}>
            <Box mx={5}>
                <Text fontSize={18} color={'black'}>
                    {SingleMovieStore.movie?.title}
                </Text>
                <Text fontSize={14} color={'gray.400'}>
                    {SingleMovieStore.movie?.plot}
                </Text>
                {/*cast and crew*/}
                <SingleMovieCast handleViewAllCast={handleViewAllCast} casts={SingleMovieStore.movie?.actorList}/>
                {/*end casts and crew*/}
                {/*    photos*/}
                <SingleMovePhoto handleViewAllPhotos={handleViewAllPhoto}
                                 photos={SingleMovieStore.movie?.images?.items}/>
                {/*photos*/}
                <SingleMovieRelated videos={SingleMovieStore.movie?.similars}/>
                {/*<SingleMovieBlogPost/>*/}
            </Box>
        </ScrollView>
    )
}