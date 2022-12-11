import {Box, ScrollView, Text} from "native-base/src";
import {TouchableOpacity, Platform, StyleSheet} from "react-native";
import {HStack, Image} from "native-base";
import {SCREEN_WIDTH} from "../../core/helper";
import ExpoFastImage from "expo-fast-image";
import 'react-native-get-random-values'
import {v4 as UUID} from "uuid";
import {observer} from "mobx-react";
import ThemeStore from "../../models/ThemeStore";

const SingleMoviePhoto = ({photos, handleViewAllPhotos}) => {
    return (
        <>
            <Box my={2}>
                <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={18} color={ThemeStore.baseProps.text_24} fontWeight={'500'} mb={3}>Photos</Text>
                    <TouchableOpacity onPress={handleViewAllPhotos}>
                        <Text color={'blue.400'} fontSize={14} mb={3}>View All</Text>
                    </TouchableOpacity>
                </Box>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <HStack space={2} mb={6}>
                        {photos.slice(0, 4).map((val, index) => {
                            return (
                                <TouchableOpacity key={index.toString()}>
                                    {
                                        Platform.OS === 'android' ?
                                            <ExpoFastImage
                                                key={index.toString()}
                                                cacheKey={UUID()}
                                                uri={val?.image}
                                                style={{
                                                    ...styles.responsiveImage,
                                                    backgroundColor: ThemeStore.baseProps.text_black_06
                                                }}/>
                                            :
                                            <Image alt={'photos'} source={{uri: val?.image}} key={index.toString()}
                                                   style={{
                                                       ...styles.responsiveImage,
                                                       backgroundColor: ThemeStore.baseProps.text_black_06
                                                   }}/>
                                    }
                                </TouchableOpacity>
                            )
                        })}
                    </HStack>
                </ScrollView>
            </Box>
            {/*    end photos*/}
        </>
    )
}
const styles = StyleSheet.create({
    responsiveImage: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 5,
        borderRadius: 6,
        resizeMode: 'cover'
    }
})
export default observer(SingleMoviePhoto)