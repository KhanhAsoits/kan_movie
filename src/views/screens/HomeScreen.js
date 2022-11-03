import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Text, ScrollView} from "native-base/src/index";
import {SwitchTab} from "../components/SwitchTab";
import {SwitchTabViewModel} from "../../viewmodels/SwitchTabViewModel";

const HomeScreen = ({route, nav, movies, links}) => {
    return (
        <NativeBaseProvider>
            <Box flex={1} mt={20}>
                <SwitchTabViewModel links={links}></SwitchTabViewModel>
                <ScrollView flex={1} bgColor={'white'}>
                    {/*{movies.map((movie, index) => {*/}
                    {/*    return (*/}
                    {/*        <Box bgColor={'gray.200'}>*/}
                    {/*            */}
                    {/*        </Box>*/}
                    {/*    )*/}
                    {/*})}*/}
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(HomeScreen)