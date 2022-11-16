import ReviewTabScreen from "../views/screens/movie_detail/ReviewTabScreen";
import {observer} from "mobx-react";
import {useEffect} from "react";
import SingleMovieStore from "../models/SingleMovieStore";
import {useNavigation} from "@react-navigation/native";

const ReviewTabViewModel = ({route}) => {
    const nav = useNavigation()
    useEffect(() => {
        const sync = async () => {
            await SingleMovieStore.onGetReviews()
        }
        if (SingleMovieStore.active === 2) {
            sync()
        }
    }, [SingleMovieStore.active])
    return (
        <ReviewTabScreen nav={nav}></ReviewTabScreen>
    )
}
export default observer(ReviewTabViewModel)