import {Box, ScrollView, Text} from "native-base/src";
import {TouchableOpacity} from "react-native";
import {HStack, Image} from "native-base";
import photo from "../../../assets/static/images/pt.png";
import {SCREEN_WIDTH} from "../../core/helper";

export const SingleMovieBlogPost = ({posts}) => {
    return (
        <Box ml={4} my={2}>
            <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} mr={4}>
                <Text fontSize={18} color={'black'} fontWeight={'500'} mb={3}>Blog This Film</Text>
                <TouchableOpacity>
                    <Text color={'blue.400'} fontSize={14} mb={3}>View All</Text>
                </TouchableOpacity>
            </Box>
            <ScrollView horizontal={true} mr={4}>
                <HStack space={2}>
                    <Box>
                        <Image source={photo}
                               style={{width: SCREEN_WIDTH / 2, height: SCREEN_WIDTH / 3}}
                               borderRadius={6}
                               resizeMode={'cover'}
                               alt={'photo'}/>
                        <Text fontSize={12} color={'gray.400'} fontWeight={'500'} my={1}>3 hours
                            ago</Text>
                        <Text width={SCREEN_WIDTH / 2} fontSize={14}>Female Action Stars
                            We Can’t Wait
                        </Text>
                    </Box>
                    <Box>
                        <Image source={photo}
                               style={{width: SCREEN_WIDTH / 2, height: SCREEN_WIDTH / 3}}
                               borderRadius={6}
                               resizeMode={'cover'}
                               alt={'photo'}/>
                        <Text fontSize={12} color={'gray.400'} fontWeight={'500'} my={1}>3 hours
                            ago</Text>
                        <Text width={SCREEN_WIDTH / 2} fontSize={14}>
                            Female Action Stars
                            We Can’t Wait
                        </Text>
                    </Box>
                    <Box>
                        <Image source={photo}
                               style={{width: SCREEN_WIDTH / 2, height: SCREEN_WIDTH / 3}}
                               borderRadius={6}
                               resizeMode={'cover'}
                               alt={'photo'}/>
                        <Text fontSize={12} color={'gray.400'} fontWeight={'500'} my={1}>3 hours
                            ago</Text>
                        <Text width={SCREEN_WIDTH / 2} fontSize={14}>
                            The Best John Wick
                            Action Scenes
                        </Text>
                    </Box>
                </HStack>
            </ScrollView>
        </Box>
    )
}