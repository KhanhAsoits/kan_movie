import {Box, ScrollView, Text} from "native-base/src";
import {Platform, TouchableOpacity} from "react-native";
import {HStack, Image} from "native-base";
import {SCREEN_WIDTH} from "../../core/helper";
import {observer} from "mobx-react";
import ExpoFastImage from "expo-fast-image";
import {v4 as UUID} from "uuid";
import {StyleSheet} from "react-native";

const SingleMovieRelated = ({videos}) => {
    return (
        <Box my={2}>
            <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize={18} color={'black'} fontWeight={'500'} mb={3}>Similars</Text>
                <TouchableOpacity>
                    <Text color={'blue.400'} fontSize={14} mb={3}>View All</Text>
                </TouchableOpacity>
            </Box>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <HStack space={2}>
                    {videos.slice(0, 5).map((val, index) => {
                        return (
                            <TouchableOpacity key={index.toString()}>
                                {Platform.OS === "android" ?
                                    <ExpoFastImage
                                        key={index.toString()}
                                        cacheKey={UUID()}
                                        uri={val?.image}
                                        style={styles.responsiveImg}/>
                                    : <Image alt={'similar'} source={{uri: val?.image}} style={styles.responsiveImg}/>
                                }
                            </TouchableOpacity>
                        )
                    })}
                </HStack>
            </ScrollView>
        </Box>

    )
}
const styles = StyleSheet.create({
    responsiveImg: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 5,
        borderRadius: 6,
        resizeMode: 'cover'
    }
})
export default observer(SingleMovieRelated)