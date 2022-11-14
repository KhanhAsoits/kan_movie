import {Box, HStack, Image, ScrollView, Text, VStack} from "native-base";
import {CalculatorRating, SCREEN_WIDTH} from "../../../core/helper";
import {RatingGenerator} from "../../components/RatingGenerator";
import {observer} from "mobx-react";
import SingleMovieStore from "../../../models/SingleMovieStore";
import Loader from "../../components/Loader";
import 'react-native-get-random-values'
import {ReviewGenerator} from "../../components/ReviewGenerator";

const ReviewTabScreen = ({route, nav}) => {
    return (
        <ScrollView style={{width: SCREEN_WIDTH}} bg={'white'} px={4}>
            {
                SingleMovieStore.reviewFetching ?
                    <Loader height={50}></Loader>
                    :
                    <ReviewGenerator reviews={SingleMovieStore.reviews}/>
            }
        </ScrollView>
    )
}
export default observer(ReviewTabScreen)