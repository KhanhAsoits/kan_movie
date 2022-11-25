import {ScrollView} from "native-base";
import {SCREEN_WIDTH} from "../../../core/helper";
import {observer} from "mobx-react";
import SingleMovieStore from "../../../models/SingleMovieStore";
import Loader from "../../components/Loader";
import 'react-native-get-random-values'
import {ReviewGenerator} from "../../components/ReviewGenerator";
import ThemeStore from "../../../models/ThemeStore";

const ReviewTabScreen = ({route, nav}) => {
    return (
        <ScrollView style={{width: SCREEN_WIDTH}} bg={ThemeStore.baseProps.themeBg} px={4}>
            {
                SingleMovieStore.reviewFetching ?
                    <Loader height={50}></Loader>
                    :
                    <ReviewGenerator nav={nav} reviews={SingleMovieStore.reviews}/>
            }
        </ScrollView>
    )
}
export default observer(ReviewTabScreen)