import ReviewTabScreen from "../views/screens/movie_detail/ReviewTabScreen";
import {observer} from "mobx-react";
import {useEffect} from "react";
import SingleMovieStore from "../models/SingleMovieStore";

const ReviewTabViewModel = ({route, nav}) => {
    useEffect(() => {
        const sync = async () => {
            await SingleMovieStore.onGetReviews()
        }
        if (SingleMovieStore.active === 2) {
            sync()
        }
    }, [SingleMovieStore.active])
    return (
        <ReviewTabScreen></ReviewTabScreen>
    )
}
export default observer(ReviewTabViewModel)