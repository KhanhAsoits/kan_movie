import {Box, Text} from "native-base/src";
import {TouchableOpacity} from "react-native";
import {CastGenerator} from "./CastGenerator";
import {observer} from "mobx-react";

const SingleMovieCast = ({casts,handleViewAllCast}) => {
    return (
        <Box my={4}>
            <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize={18} color={'black'} fontWeight={'500'} mb={2}>Cast & Crew</Text>
                <TouchableOpacity onPress={handleViewAllCast}>
                    <Text color={'blue.400'} fontSize={14} mb={2}>View All</Text>
                </TouchableOpacity>
            </Box>
            {/*    cast and crew item*/}
            <CastGenerator casts={casts}></CastGenerator>
        </Box>
    )
}
export default observer(SingleMovieCast)