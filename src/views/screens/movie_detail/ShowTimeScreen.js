import {Box, ScrollView, Text} from "native-base";
import {SCREEN_WIDTH} from "../../../core/helper";

export const ShowTimeScreen = ({route, nav}) => {
    return (
        <ScrollView style={{width:SCREEN_WIDTH}} bgColor={'red.200'}>
            <Text>showtime</Text>
        </ScrollView>
    )
}