import {Box, ScrollView, Text} from "native-base";
import {SCREEN_WIDTH} from "../../core/helper";

export const DetailScreen = ({route, nav}) => {
    return (
        <ScrollView  style={{width:SCREEN_WIDTH}} bgColor={'green.100'}>
            <Text>Detail</Text>
        </ScrollView>
    )
}