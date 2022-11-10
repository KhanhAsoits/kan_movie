import {Box, ScrollView, Text} from "native-base/src";
import {TouchableOpacity} from "react-native";
import {HStack, Image} from "native-base";
import {SCREEN_WIDTH} from "../../core/helper";
import ExpoFastImage from "expo-fast-image";
import 'react-native-get-random-values'
import {v4 as UUID} from "uuid";
import {observer} from "mobx-react";

const SingleMoviePhoto = ({photos,handleViewAllPhotos}) => {
    return (
        <>
            <Box my={2}>
                <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={18} color={'black'} fontWeight={'500'} mb={3}>Photos</Text>
                    <TouchableOpacity onPress={handleViewAllPhotos}>
                        <Text color={'blue.400'} fontSize={14} mb={3}>View All</Text>
                    </TouchableOpacity>
                </Box>
                <ScrollView horizontal={true}>
                    <HStack space={2}>
                        {photos.slice(0, 4).map((val, index) => {
                            return (
                                <ExpoFastImage
                                    key={index.toString()}
                                    cacheKey={UUID()}
                                    uri={val?.image}
                                    style={{
                                        backgroundColor:'rgba(0,0,0,0.1)',
                                        width: SCREEN_WIDTH / 4,
                                        height: SCREEN_WIDTH / 5,
                                        borderRadius: 6,
                                        resizeMode: 'cover'
                                    }}/>
                            )
                        })}
                    </HStack>
                </ScrollView>
            </Box>
            {/*    end photos*/}
        </>
    )
}
export default observer(SingleMoviePhoto)