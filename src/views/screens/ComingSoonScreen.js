import {observer} from "mobx-react";
import {Box} from "native-base";
import {ScrollView} from "native-base/src/index";

const ComingSoonScreen = ({movies}) => {
    return (
        <ScrollView key={Math.random().toString()} flex={1} bgColor={'white'}>
            <Box>coming soon tab</Box>
        </ScrollView>
    )
}

export default observer(ComingSoonScreen)