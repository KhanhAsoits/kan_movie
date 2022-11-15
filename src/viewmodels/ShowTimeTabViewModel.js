import ShowTimeScreen from "../views/screens/movie_detail/ShowTimeScreen";
import {observer} from "mobx-react";
import {useEffect} from "react";
import SingleMovieStore from "../models/SingleMovieStore";

const ShowTimeTabViewModel = ({route, nav}) => {
    useEffect(() => {

        const sync = async () => {
            await SingleMovieStore.onGetShowTimeData()
        }
        if (SingleMovieStore.showtime.cinemas.length <= 0 && SingleMovieStore.showtime.dates.length <= 0 && SingleMovieStore.active === 3) {
            sync()
        }
        console.log(SingleMovieStore.showtime.dates)
    }, [SingleMovieStore.id, SingleMovieStore.active])
    return (
        <ShowTimeScreen></ShowTimeScreen>
    )
}
export default observer(ShowTimeTabViewModel)
