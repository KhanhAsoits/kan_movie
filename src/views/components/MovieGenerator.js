import Movie from "./Movie";
import {Box} from "native-base";
import movieStore from "../../models/ShowingMoviesStore";
import Loader from "./Loader";
import {observer} from "mobx-react";
import comingSoonMovieStore from "../../models/ComingSoonMovieStore";
import ThemeStore from "../../models/ThemeStore";

const MovieGenerator = ({movies, nav, width,showTime}) => {
    return (
        <Box bgColor={ThemeStore.baseProps.themeBg} flex={1} flexDir={"row"} style={{width: width}} justifyContent={"space-between"} my={2}
             flexWrap={'wrap'}>
            {Array.from(movies).map((movie, index) => {
                return (
                    <Movie showTime={showTime} key={index.toString()} movie={movie} nav={nav}></Movie>
                )
            })}
            {movieStore.loading && <Loader></Loader>}
            {comingSoonMovieStore.loading && <Loader></Loader>}
        </Box>
    )
}
export default observer(MovieGenerator)