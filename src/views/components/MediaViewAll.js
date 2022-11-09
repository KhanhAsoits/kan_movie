import {Box, HStack, ScrollView, Text, VStack} from "native-base";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from "react-native";
import ExpoFastImage from "expo-fast-image";
import {SCREEN_HEIGHT} from "../../core/helper";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import {useNavigation} from "@react-navigation/native";

export const MediaViewAll = ({route}) => {

    const {photos} = route.params
    const nav = useNavigation()
    const handleBack = () => {
        nav.goBack()
    }

    return (
        <NativeBaseProvider>
            <HStack justifyContent={'space-between'} alignItems={'center'} flex={.1} mt={8} mx={2}>
                <TouchableOpacity activeOpacity={.6} onPress={handleBack}>
                    <Ionicons name={'chevron-back-outline'} color={'black'} size={30}></Ionicons>
                </TouchableOpacity>
                <Text textAlign={'center'} fontSize={20}>Photos</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <Ionicons name={'help-circle-outline'} color={'black'} size={30}></Ionicons>
                </TouchableOpacity>
            </HStack>
            <ScrollView flex={1}>
                <VStack mx={4} space={3} flex={.9}>
                    {photos.map((item, index) => {
                        return (
                            <ExpoFastImage
                                key={index.toString()}
                                cacheKey={UUID()}
                                uri={item?.image}
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    height: SCREEN_HEIGHT / 4,
                                    borderRadius: 6,
                                    resizeMode: "cover"
                                }}
                            />
                        )
                    })}
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}