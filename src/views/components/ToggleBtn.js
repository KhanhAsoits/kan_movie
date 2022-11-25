import {StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Text} from "native-base/src";
import ThemeStore from "../../models/ThemeStore";
import {observer} from "mobx-react";

const ToggleBtn = ({active, item, handleSwitch, cStyle}) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => {
                handleSwitch(item.id)
            }}
            style={cStyle ? {...cStyle.button, backgroundColor: active ? "#E51937" : ThemeStore.baseProps.themeBg} : {
                ...styles.btnToggle,
                backgroundColor: active ? "#E51937" : ThemeStore.baseProps.themeBg
            }}>
            {
                item.icon &&
                <Ionicons
                    name={item?.icon.name}
                    size={22}
                    color={active ? 'white' : ThemeStore.baseProps.text_24}>
                < /Ionicons>
            }

            <Text color={active ? 'white' : ThemeStore.baseProps.text_24} style={cStyle ? {...cStyle.text} : {marginHorizontal: 6}}
                  fontSize={14}
                  alignSelf={"center"}>
                {item?.title}
            </Text>
        </TouchableOpacity>
    )
}
export default observer(ToggleBtn)
const styles = StyleSheet.create({
    btnToggle: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: .5,
        paddingVertical: 7,
        paddingHorizontal: 30,
        borderRadius: 50
    }
})