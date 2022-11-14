import {Box, HStack, Image, Text, VStack} from "native-base";
import {TouchableOpacity} from "react-native";
import us from "../../../assets/static/images/cast.png";
import {RatingGenerator} from "./RatingGenerator";
import {CalculatorRating} from "../../core/helper";
import {useState} from "react";
import {Review} from "./Review";

export const ReviewGenerator = ({reviews}) => {
    return (
        <VStack space={3}>
            {reviews.map((review, index) => {
                return (
                    <Review key={index.toString()} review={review}/>
                )
            })}
        </VStack>

    )
}