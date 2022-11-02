import {observe} from "mobx";
import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Text} from "native-base/src/index";

const HomeScreen = () => {
    return (
        <NativeBaseProvider>
            <Box flex={1} mt={20}>
                <Text>Home</Text>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(HomeScreen)