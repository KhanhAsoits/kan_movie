import {DetailScreen} from "../views/screens/DetailScreen";
import {observer} from "mobx-react";

const DetailTabViewModel = ({route, nav}) => {
    return (
        <DetailScreen nav={nav}></DetailScreen>
    )

}
export default observer(DetailTabViewModel)