import {DetailScreen} from "../views/screens/movie_detail/DetailScreen";
import {observer} from "mobx-react";

const DetailTabViewModel = ({route, nav}) => {
    return (
        <DetailScreen nav={nav}></DetailScreen>
    )

}
export default observer(DetailTabViewModel)