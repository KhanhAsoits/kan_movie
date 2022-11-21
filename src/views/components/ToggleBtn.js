import {StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Text} from "native-base/src";

export const ToggleBtn = ({active, item, handleSwitch, cStyle}) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => {
                handleSwitch(item.id)
            }}
            style={cStyle ? {...cStyle.button,backgroundColor: active ? "#E51937" : "white"} : {
                ...styles.btnToggle,
                backgroundColor: active ? "#E51937" : "white"
            }}>
            {
                item.icon &&
                <Ionicons
                    name={item?.icon.name}
                    size={22}
                    color={active ? 'white' : '#0F1B2B'}>

                </Ionicons>
            }

            <Text color={active ? 'white' : "#0F1B2B"} style={cStyle ? {...cStyle.text} : {marginHorizontal: 6}}
                  fontSize={14}
                  alignSelf={"center"}>
                {item?.title}
            </Text>
        </TouchableOpacity>
    )
}
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