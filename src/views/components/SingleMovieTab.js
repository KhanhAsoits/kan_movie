import {SwitchTabViewModel} from "../../viewmodels/SwitchTabViewModel";
import SingleMovieStore from "../../models/SingleMovieStore";
import {TabContentViewModel} from "../../viewmodels/TabContentViewModel";
import {StyleSheet} from "react-native";
import {observer} from "mobx-react";

 const SingleMovieTab = ({handleSwitch, links}) => {
    return (
        <>
            <SwitchTabViewModel handleSwitch={handleSwitch} active={SingleMovieStore.active} links={links}
                                cStyle={{
                                    text: {marginVertical: 0, fontSize: 14},
                                    button: styles.cSwitchBtn
                                }}></SwitchTabViewModel>
            <TabContentViewModel items={links} active={SingleMovieStore.active}></TabContentViewModel>
        </>
    )
}
export default observer(SingleMovieTab)
const styles = StyleSheet.create({
    cSwitchBtn: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: .33,
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 50
    }
})