import {Box, Image, Text} from "native-base/src/index";
import {StyleSheet, TouchableOpacity} from "react-native";
import {RatingGenerator} from "./RatingGenerator";
import {CalculatorRating, getRandomInt} from "../../core/helper";
import {Dimensions} from "react-native";

export const Movie = ({movie, nav}) => {
    const screenWidth = Dimensions.get('window').width
    return (
        <Box>
            <TouchableOpacity activeOpacity={.7}>
                <Image source={{uri: movie?.image}} style={{
                    ...styles.responsiveImg,
                    width: screenWidth / 2 - 18,
                    height: (screenWidth / 2 - 18) + (screenWidth / 2 - 18) / 1.5,
                }} alt={'movie - thumbnail'}></Image>
                <Box my={2}>
                    <RatingGenerator total={5} per={CalculatorRating(movie?.imDbRating)}/>
                    <Text width={160} height={6} overflow={"hidden"} fontSize={16}
                          fontWeight={"500"}>{movie?.title}</Text>
                    <Box width={160} overflow={"hidden"} justifyContent={"flex-start"} alignItems={'center'}
                         flexDir={'row'}>
                        <Text height={6} fontSize={12}
                              style={{color: "#0F1B2B", opacity: .6}}>
                            {movie.genreList.length > 0 ? movie?.genreList?.[getRandomInt(movie?.genreList.length)]?.value : "None"}
                        </Text>
                        <Box mb={1} mx={2} style={styles.dot}></Box>
                        <Text height={6} fontSize={11}
                              style={{color: "#0F1B2B", opacity: .6}}>
                            {movie?.runtimeStr} | {movie?.contentRating || movie?.releaseState}
                        </Text>
                    </Box>
                </Box>
            </TouchableOpacity>
        </Box>
    )
}

const styles = StyleSheet.create({
    responsiveImg: {

        borderRadius: 4,
        resizeMode: "cover"
    },
    dot: {
        width: 4,
        height: 4,
        backgroundColor: "#0F1B2B",
        opacity: .4,
        borderRadius: 50
    }
})

