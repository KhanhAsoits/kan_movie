import {Box, HStack, Image} from "native-base";
import {Text} from "native-base/src";
import Ionicons from "react-native-vector-icons/Ionicons";
import cast from '../../../assets/static/images/cast.png'
import ExpoFastImage from "expo-fast-image";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import {SCREEN_WIDTH} from "../../core/helper";
import {Platform, StyleSheet} from "react-native";
import ThemeStore from "../../models/ThemeStore";

export const CastGenerator = ({casts, all = false}) => {
    return (
        casts?.slice(0, all ? casts.length : 6)?.map((val, index) => {
            return (
                <HStack width={all ? SCREEN_WIDTH - 30 : "100%"} key={index.toString()}
                        flexDir={'row'}
                        justifyContent={'flex-start'} space={16}
                        alignItems={'center'} my={2}>
                    <HStack width={SCREEN_WIDTH / 2.7} justifyContent={'flex-start'} alignItems={'center'}
                            space={4}>
                        {
                            Platform.OS === "android" ?

                                <ExpoFastImage
                                    uri={val?.image}
                                    cacheKey={UUID()}
                                    style={{
                                        ...styles.responsiveImg,
                                        backgroundColor: ThemeStore.baseProps.text_black_06
                                    }}
                                />
                                :
                                <Image
                                    style={{
                                        ...styles.responsiveImg,
                                        backgroundColor: ThemeStore.baseProps.text_black_06
                                    }}
                                    alt={'cast avatar'} source={{uri: val?.image}}/>
                        }
                        <Text fontSize={14} fontWeight={'500'} color={ThemeStore.baseProps.text_black_06}>{val?.name}</Text>
                    </HStack>
                    <HStack justifyContent={'space-between'} width={SCREEN_WIDTH / 2.7 - 10} alignItems={'center'}
                            space={5}>
                        <Ionicons name={'ellipsis-horizontal-outline'} color={ThemeStore.baseProps.text_black_06}
                                  size={14}/>
                        <Text fontSize={11} flex={1}
                              color={ThemeStore.baseProps.text_black_06}>{val?.asCharacter.toUpperCase()}</Text>
                    </HStack>
                </HStack>
            )
        })
    )
}
const styles = StyleSheet.create({
    responsiveImg: {
        width: 46,
        height: 46,
        borderRadius: 50
    }
})