import {Box, ScrollView, Text} from "native-base";
import {SCREEN_WIDTH} from "../../../core/helper";
import {useState} from "react";
import SingleMovieStore from "../../../models/SingleMovieStore";
import SingleMovieCast from "../../components/SingleMovieCast";
import SingleMovePhoto from "../../components/SingleMovePhoto";
import SingleMovieRelated from "../../components/SingleMovieVideo";
import {Platform} from "react-native";
import ThemeStore from "../../../models/ThemeStore";

export const DetailScreen = ({route, nav}) => {


    const handleViewAllPhoto = () => {
        nav.navigate('photo-review', {photos: SingleMovieStore.movie?.images?.items})
    }
    const handleViewAllCast = () => {
        nav.navigate('cast-review', {casts: SingleMovieStore.movie?.actorList})
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{width: SCREEN_WIDTH}} bgColor={ThemeStore.baseProps.themeBg} mt={0} mb={5}
                    showsVerticalScrollIndicator={Platform.OS === "android"}>
            <Box mx={5}>
                <Text fontSize={18} color={ThemeStore.baseProps.text_24}>
                    {SingleMovieStore.movie?.title}
                </Text>
                <Text fontSize={14} color={ThemeStore.baseProps.text_black_06}>
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