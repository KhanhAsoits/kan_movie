import {Box, Text} from "native-base/src/index";
import {StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ToggleBtn} from "./ToggleBtn";

export const SwitchTab = ({links, active, handleSwitch}) => {

    return (
        <Box paddingTop={22} paddingBottom={4} bgColor={'white'}>
            <Box justifyContent={"center"}
                 alignItems={"center"}
                 flexDir={'row'}
                 borderWidth={1}
                 borderColor={"gray.200"}
                 borderRadius={50}
                 mx={3}>
                {
                    links.map((item, index) => {
                        const isActive = active === item?.id
                        return (
                            <ToggleBtn key={index.toString()} item={item} active={isActive}
                                       handleSwitch={handleSwitch}></ToggleBtn>
                        )
                    })}
            </Box>
        </Box>
    )
}


