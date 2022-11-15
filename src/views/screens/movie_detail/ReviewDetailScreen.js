import {Box, HStack, Image, ScrollView, Text, VStack} from "native-base";
import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {CastGenerator} from "../../components/CastGenerator";
import {CastLoader} from "../../components/CastLoader";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {useNavigation} from "@react-navigation/native";
import us from "../../../../assets/static/images/cast.png";
import {RatingGenerator} from "../../components/RatingGenerator";
import {CalculatorRating} from "../../../core/helper";

export const ReviewDetailScreen = ({route}) => {
    const nav = useNavigation()
    const {review} = route.params
    const handleBack = () => {
        nav.goBack()
    }
    return (
        <NativeBaseProvider>
            <Box flex={1} bgColor={'white'}>
                <HStack justifyContent={'space-between'} alignItems={'center'} flex={.3} mt={8} mx={2}>
                    <TouchableOpacity activeOpacity={.6} onPress={handleBack}>
                        <Ionicons name={'chevron-back-outline'} color={'black'} size={30}></Ionicons>
                    </TouchableOpacity>
                    <Text textAlign={'center'} fontSize={20}>Review Detail</Text>
                    <TouchableOpacity activeOpacity={.6}>
                        <Ionicons name={'help-circle-outline'} color={'black'} size={30}></Ionicons>
                    </TouchableOpacity>
                </HStack>
                <ScrollView>
                    <VStack space={3} p={3} bgColor={'white'} borderRadius={6}>
                        <HStack space={4} alignItems={'center'}>
                            <Image source={us} style={{width: 64, height: 64, borderRadius: 50}}/>
                            <Box>
                                <Text fontSize={16} fontWeight={'500'}>{review?.username}</Text>
                                <Text fontSize={14} color={'gray.400'} fontWeight={'500'}>{review?.date}</Text>
                            </Box>
                        </HStack>
                        <RatingGenerator per={CalculatorRating(review?.rate)} total={5}
                                         cSize={16}></RatingGenerator>
                        <Text flex={1} fontSize={16} mb={3} color={'gray.500'} fontWeight={'400'}>
                            {review?.content}
                        </Text>
                    </VStack>
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    )
}