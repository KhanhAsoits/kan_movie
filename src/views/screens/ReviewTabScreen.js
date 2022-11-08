import {Box, ScrollView, Text} from "native-base";
import {SCREEN_WIDTH} from "../../core/helper";

export const ReviewTabScreen = ({route, nav}) => {
    return (
        <ScrollView  style={{width:SCREEN_WIDTH}} bg={'blue.200'}>
            <Text>reviews</Text>
        </ScrollView>
    )
}