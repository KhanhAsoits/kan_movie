import {Box, Image, Text} from "native-base/src/index";
import {Platform, StyleSheet, TouchableOpacity} from "react-native";
import {RatingGenerator} from "./RatingGenerator";
import {CalculatorRating, getRandomInt, handleMoving} from "../../core/helper";
import {Dimensions} from "react-native";
import {observer} from "mobx-react";
import ExpoFastImage from "expo-fast-image";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import ThemeStore from "../../models/ThemeStore";

const Movie = ({movie, nav, comingSoon}) => {
    const screenWidth = Dimensions.get('window').width
    return (
        <Box>
            <TouchableOpacity activeOpacity={.7} onPress={() => {
                handleMoving(nav, 'single_movie', {movie_id: movie.id, comingSoon: comingSoon})
            }}>
                {Platform.OS === "android" ?
                    <ExpoFastImage
                        uri={movie?.image}
                        cacheKey={UUID()}
                        style={{
                            ...styles.responsiveImg,
                            width: screenWidth / 2 - 18,
                            height: (screenWidth / 2 - 18) + (screenWidth / 2 - 18) / 1.5,
                        }}
                    />
                    :
                    <Image
                        alt={'movie_img'}
                        source={{uri: movie?.image}}
                        style={{
                            ...styles.responsiveImg,
                            width: screenWidth / 2 - 18,
                            height: (screenWidth / 2 - 18) + (screenWidth / 2 - 18) / 1.5,
                        }}
                    />
                }

                <Box my={2}>
                    <RatingGenerator total={5} per={CalculatorRating(movie?.imDbRating)}/>
                    <Text width={160} height={6} color={ThemeStore.baseProps.text_24}  overflow={"hidden"} fontSize={16}
                          fontWeight={"500"}>{movie?.title}</Text>
                    <Box width={160} overflow={"hidden"} justifyContent={"flex-start"} alignItems={'center'}
                         flexDir={'row'}>
                        <Text height={6} fontSize={12}
                              style={{color: ThemeStore.baseProps.text_black_06, opacity: .6}}>
                            {movie.genreList.length > 0 ? movie?.genreList?.[getRandomInt(movie?.genreList.length)]?.value : "None"}
                        </Text>
                        <Box mb={1} mx={2} style={{...styles.dot,backgroundColor:ThemeStore.baseProps.text_black_06}}></Box>
                        <Text height={6} fontSize={11}
                              style={{color: ThemeStore.baseProps.text_black_06, opacity: .6}}>
                            {movie?.runtimeStr} | {movie?.contentRating || movie?.releaseState}
                        </Text>
                    </Box>
                </Box>
            </TouchableOpacity>
        </Box>
    )
}

export default observer(Movie)

const styles = StyleSheet.create({
    responsiveImg: {
        borderRadius: 4,
        resizeMode: "cover"
    },
    dot: {
        width: 4,
        height: 4,
        opacity: .4,
        borderRadius: 50
    }
})

