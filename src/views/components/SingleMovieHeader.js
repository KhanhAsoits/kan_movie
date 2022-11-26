import {ImageBackground, Platform, StyleSheet, TouchableOpacity} from "react-native";
import bg from "../../../assets/static/images/movie-preview.png";
import {Box} from "native-base/src";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../core/helper";
import {Image, View} from "native-base";
import {observer} from "mobx-react";
import 'react-native-get-random-values'
import {v4 as UUID} from "uuid";
import ExpoFastImage from "expo-fast-image";
import ThemeStore from "../../models/ThemeStore";

const SingleMovieHeader = ({image, background, handleBack}) => {

    return (
        <>
            <ImageBackground style={{...styles.responsiveBackground,backgroundColor:ThemeStore.baseProps.text_black_02}} source={{uri: background}} resizeMode={"cover"}>
                <Box flex={1} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} px={3}
                     height={10} mt={10}>
                    <TouchableOpacity activeOpacity={.6} onPress={handleBack}>
                        <Ionicons name={'chevron-back-outline'} color={'white'} size={36}></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.6} style={{
                        position: 'absolute',
                        width: 48,
                        left: SCREEN_WIDTH / 2 - 20,
                        top: 26
                    }}>
                        <View style={styles.outsideAni}>
                            <Ionicons name={'play-circle'} color={'white'} size={46}></Ionicons>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.6}>
                        <Ionicons name={'share-social-outline'} color={'white'} size={26}></Ionicons>
                    </TouchableOpacity>

                </Box>
            </ImageBackground>
            <View style={styles.boxThumbnail}>
                {Platform.OS === "android" ?
                    <ExpoFastImage
                        uri={image}
                        cacheKey={UUID()}
                        style={{...styles.responsiveThumbnail, backgroundColor: ThemeStore.baseProps.text_black_06}}
                    /> :
                    <Image
                        alt={'movie_img'}
                        source={{uri: image}}
                        style={{...styles.responsiveThumbnail, backgroundColor: ThemeStore.baseProps.text_black_06}}
                    />
                }
            </View>
            <View style={{height: SCREEN_HEIGHT / 5, backgroundColor: ThemeStore.baseProps.themeBg}}></View>
        </>
    )
}

export default observer(SingleMovieHeader)

const styles = StyleSheet.create({
    responsiveBackground: {
        flex: 1,
        position: "relative",
        height: SCREEN_HEIGHT / 3,
        flexDirection: "row",
        zIndex: 1
    },
    outsideAni: {
        borderRadius: 50,
        paddingLeft: 2.5,
        backgroundColor: 'rgba(255,255,255,.6)'
    },
    boxThumbnail: {
        position: "absolute",
        width: SCREEN_WIDTH / 1.6 - 55,
        height: SCREEN_HEIGHT / 2.9,
        top: SCREEN_HEIGHT / 5.8,
        alignSelf: "center",
        zIndex: 10
    },
    responsiveThumbnail: {
        borderRadius: 6,
        resizeMode: "cover",
        width: SCREEN_WIDTH / 1.6 - 50,
        height: SCREEN_HEIGHT / 2.9,
        zIndex: 10
    },
})