import {Text} from "native-base/src";
import {HStack} from "native-base";
import {RatingGenerator} from "./RatingGenerator";
import {observer} from "mobx-react";
import {CalculatorRating} from "../../core/helper";

const SingleMovieTitle = ({title, rating, generics, time, contentRating}) => {
    return (
        <>
            <Text fontSize={20} fontWeight={'500'} textAlign={'center'}>
                {title ? title : 'John Wick 3: Farabellum'}
            </Text>
            <Text textAlign={'center'} fontSize={12} fontWeight={'500'} color={'gray.300'}>{time || '2hr 10m'} |
                {contentRating || 'R'}</Text>
            <Text textAlign={'center'} fontSize={12} fontWeight={'500'} color={'blue.300'}>
                {generics || 'Action, Crime, Thriller'}
            </Text>
            <HStack justifyContent={'center'} my={3} space={2} alignItems={'center'}>
                <Text textAlign={'center'} fontSize={30} color={'gray.900'}>
                    {rating || '4.6'}/10
                </Text>
                <RatingGenerator per={CalculatorRating(rating)} total={5} cSize={16}></RatingGenerator>
            </HStack>

        </>
    )
}

export default observer(SingleMovieTitle)