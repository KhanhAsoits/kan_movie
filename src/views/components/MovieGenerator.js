import {Movie} from "./Movie";
import {HStack} from "native-base/src";
import {Box} from "native-base";
import {Dimensions} from "react-native";

export const MovieGenerator = ({movies, nav, width}) => {
    return (
        <Box flex={1} flexDir={"row"} style={{width: width}} justifyContent={"space-between"} my={2}
             flexWrap={'wrap'}>
            {Array.from(movies).map((movie, index) => {
                return (
                    <Movie key={index.toString()} movie={movie} nav={nav}></Movie>
                )
            })}
        </Box>
    )
}