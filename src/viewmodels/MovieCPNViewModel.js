import {Movie} from "../views/components/Movie";
import {observer} from "mobx-react";

const MovieCPNViewModel = ({movie, nav}) => {
    return (
        <Movie movie={movie} nav={nav}></Movie>
    )
}

export default observer(MovieCPNViewModel)