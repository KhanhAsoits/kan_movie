import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Text} from "native-base";

const NotificationScreen = () => {
    return (
        <NativeBaseProvider>
            <Box>
                <Text>NotificationScreen</Text>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(NotificationScreen)