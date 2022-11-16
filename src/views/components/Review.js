import {TouchableOpacity} from "react-native";
import {Box, HStack, Image, Text, VStack} from "native-base";
import us from "../../../assets/static/images/cast.png";
import {RatingGenerator} from "./RatingGenerator";
import {CalculatorRating} from "../../core/helper";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export const Review = ({review, nav}) => {
    const [waringSpoil, setWarningSpoil] = useState(review?.warningSpoilers)
    const handleShow = () => {
        if (waringSpoil) {
            setWarningSpoil(false)
        } else {
            nav.navigate('review_detail', {review: review})
        }
    }
    return (
        <TouchableOpacity activeOpacity={.9} onPress={handleShow}>
            {waringSpoil ?
                <Box bgColor={'gray.100'} style={{height: 100}} borderRadius={6} justifyContent={'center'}
                     alignItems={'center'}>
                    <Text color={'blue.300'}>Maybe spoil movie content,You can click to show!</Text>
                </Box>
                :
                <VStack space={2} p={3} bgColor={'secondary.50'} borderRadius={6}>
                    <HStack space={4} alignItems={'center'}>
                        <Image source={us} style={{width: 50, height: 50, borderRadius: 50}}/>
                        <Box>
                            <Text fontSize={16} fontWeight={'500'}>{review?.username}</Text>
                            <Text fontSize={14} color={'gray.400'} fontWeight={'500'}>{review?.date}</Text>
                        </Box>
                    </HStack>
                    <RatingGenerator per={CalculatorRating(review?.rate)} total={5}
                                     cSize={12}></RatingGenerator>
                    <Text flex={1} fontSize={14} mb={3} color={'gray.500'} fontWeight={'400'}>
                        {review?.title}
                    </Text>
                </VStack>
            }
        </TouchableOpacity>
    )
}