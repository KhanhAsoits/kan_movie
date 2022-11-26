import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box} from "native-base/src/index";
import SwitchTabViewModel from "../../../viewmodels/SwitchTabViewModel";
import {TabContentViewModel} from "../../../viewmodels/TabContentViewModel";
import connectionStore from "../../../models/ConnectionStore";
import {ErrorScreen} from "../errors/ErrorScreen";
import CustomHeader from "../../components/CustomHeader";
import HomeStore from "../../../models/HomeStore";
import SearchResultViewModel from "../../../viewmodels/SearchResultViewModel";
import ThemeStore from "../../../models/ThemeStore";

const HomeScreen = ({route, nav, searching, links, active, handleSwitch}) => {
    return (
        <NativeBaseProvider>
            <CustomHeader title={'Start Movie'}/>
            <Box flex={1} bgColor={ThemeStore.baseProps.themeBg}>
                <SwitchTabViewModel active={active} handleSwitch={handleSwitch}
                                    links={links}></SwitchTabViewModel>
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