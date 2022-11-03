import {StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Text} from "native-base/src";

export const ToggleBtn = ({active, item, handleSwitch}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                handleSwitch(item.id)
            }}
            style={{
                ...styles.btnToggle,
                backgroundColor: active ? "#E51937" : "white"
            }}>
            <Ionicons
                name={item?.icon.name}
                size={22}
                color={active ? 'white' : '#0F1B2B'}>

            </Ionicons>
            <Text color={active ? 'white' : "#0F1B2B"}
                  fontSize={14}
                  style={{marginHorizontal: 6}}
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