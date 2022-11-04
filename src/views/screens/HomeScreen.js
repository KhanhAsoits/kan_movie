import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box} from "native-base/src/index";
import {SwitchTabViewModel} from "../../viewmodels/SwitchTabViewModel";
import {TabContentViewModel} from "../../viewmodels/TabContentViewModel";

const HomeScreen = ({route, nav, links, active, handleSwitch}) => {
    return (
        <NativeBaseProvider>
            <Box flex={1} mt={20}>
                <SwitchTabViewModel active={active} handleSwitch={handleSwitch} links={links}></SwitchTabViewModel>
                <TabContentViewModel active={active} items={links}></TabContentViewModel>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(HomeScreen)