import {ShowTimeScreen} from "../views/screens/movie_detail/ShowTimeScreen";
import {observer} from "mobx-react";

const ShowTimeTabViewModel = ({route, nav}) => {
    return (
        <ShowTimeScreen></ShowTimeScreen>
    )
}
export default observer(ShowTimeTabViewModel)
