import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box} from "native-base/src/index";
import {SwitchTabViewModel} from "../../viewmodels/SwitchTabViewModel";
import {TabContentViewModel} from "../../viewmodels/TabContentViewModel";
import connectionStore from "../../models/ConnectionStore";
import {ErrorScreen} from "./ErrorScreen";
import {CustomHeader} from "../components/CustomHeader";

const HomeScreen = ({route, nav, links, active, handleSwitch}) => {
    return (
        <NativeBaseProvider>
            <CustomHeader title={'Start Movie'}/>
            <Box flex={1}>
                <SwitchTabViewModel active={active} handleSwitch={handleSwitch} links={links}></SwitchTabViewModel>
                {connectionStore.connected ?
                    <TabContentViewModel active={active} items={links}></TabContentViewModel>
                    :
                    <ErrorScreen message={"You don't connect a network >.<"}/>
                }
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(HomeScreen)