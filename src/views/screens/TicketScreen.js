import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Text} from "native-base";

const TicketScreen = () => {
    return (
        <NativeBaseProvider>
            <Box>
                <Text>TicketScreen</Text>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(TicketScreen)