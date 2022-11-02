import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Text} from "native-base/src/index";

const UserScreen = () => {
    return (
        <NativeBaseProvider>
            <Box flex={1} marginY={20}>
                <Text>UserScreen</Text>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(UserScreen)