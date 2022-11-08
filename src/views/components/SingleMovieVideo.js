import {Box, ScrollView, Text} from "native-base/src";
import {TouchableOpacity} from "react-native";
import {HStack, Image} from "native-base";
import {SCREEN_WIDTH} from "../../core/helper";
import {observer} from "mobx-react";
import ExpoFastImage from "expo-fast-image";
import {v4 as UUID} from "uuid";

const SingleMovieRelated = ({videos}) => {
    return (
        <Box my={2}>
            <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} mr={4}>
                <Text fontSize={18} color={'black'} fontWeight={'500'} mb={3}>Similars</Text>
                <TouchableOpacity>
                    <Text color={'blue.400'} fontSize={14} mb={3}>View All</Text>
                </TouchableOpacity>
            </Box>
            <ScrollView horizontal={true}>
                <HStack space={2}>
                    {videos.slice(0, 5).map((val, index) => {
                        return (
                            <ExpoFastImage
                                key={index.toString()}
                                cacheKey={UUID()}
                                uri={val?.image}
                                style={{
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

    )
}
export default observer(SingleMovieRelated)