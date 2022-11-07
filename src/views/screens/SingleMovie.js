import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, ScrollView, Text} from "native-base/src/index";
import {ImageBackground, StyleSheet, TouchableOpacity} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../core/helper";
import bg from '../../../assets/static/images/movie-preview.png'
import Ionicons from "react-native-vector-icons/Ionicons";
import {HStack, Image, View} from "native-base";
import {RatingGenerator} from "../components/RatingGenerator";
import {SwitchTabViewModel} from "../../viewmodels/SwitchTabViewModel";
import SingleMovieStore from "../../models/SingleMovieStore";
import {observer} from "mobx-react";
import {TabContentViewModel} from "../../viewmodels/TabContentViewModel";

const SingleMovie = ({movie, links, handleSwitch}) => {

    return (
        <NativeBaseProvider>
            <Box flex={1} bgColor={'green.300'}>

                <ScrollView style={{zIndex: 1}} flex={1} bgColor={'red.300'}>
                    <ImageBackground style={styles.responsiveBackground} source={bg} resizeMode={"cover"}
                                     blurRadius={1}>
                        <Box flex={1} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} px={3}
                             height={10} mt={10}>
                            <TouchableOpacity activeOpacity={.6}>
                                <Ionicons name={'chevron-back-outline'} color={'white'} size={36}></Ionicons>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.6} style={{
                                position: 'absolute',
                                width: 40,
                                height: 40,
                                left: SCREEN_WIDTH / 2 - 20,
                                top: 30
                            }}>
                                <View style={styles.outsideAni}>
                                    <Ionicons name={'play-circle'} color={'white'} size={36}></Ionicons>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.6}>
                                <Ionicons name={'share-social-outline'} color={'white'} size={26}></Ionicons>
                            </TouchableOpacity>

                        </Box>
                    </ImageBackground>
                    <View style={styles.boxThumbnail}>
                        <Image source={bg} style={styles.responsiveThumbnail} alt={'thumbnail'}></Image>
                    </View>
                    {/*<View style={styles.overlay}></View>*/}
                    <View style={{height: SCREEN_HEIGHT / 5, backgroundColor: "white"}}></View>
                    <View bgColor={'white'}>
                        <Text fontSize={20} fontWeight={'500'} textAlign={'center'}>
                            John Wick 3: Farabellum
                        </Text>
                        <Text textAlign={'center'} fontSize={12} fontWeight={'500'} color={'gray.300'}>2hr 10m |
                            R</Text>
                        <Text textAlign={'center'} fontSize={12} fontWeight={'500'} color={'blue.300'}>Action, Crime,
                            Thriller</Text>
                        <HStack justifyContent={'center'} my={3} space={2} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={30} color={'gray.900'}>
                                4.6/5
                            </Text>
                            <RatingGenerator per={5} total={5} cSize={16}></RatingGenerator>
                        </HStack>

                        <SwitchTabViewModel handleSwitch={handleSwitch} active={SingleMovieStore.active} links={links}
                                            cStyle={{
                                                text: {marginVertical: 0, fontSize: 14},
                                                button: styles.cSwitchBtn
                                            }}></SwitchTabViewModel>
                        <TabContentViewModel active={SingleMovieStore.active} ></TabContentViewModel>
                    </View>
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(SingleMovie)

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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    cSwitchBtn: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: .33,
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 50
    }
})