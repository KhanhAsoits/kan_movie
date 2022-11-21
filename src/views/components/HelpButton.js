import {Alert, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const HelpButton = ({message, size, color}) => {
    const handleAlert = () => {
        Alert.alert('Help', message)
    }
    return (
        <TouchableOpacity activeOpacity={.8} onPress={handleAlert}>
            <Ionicons name={'help-circle-outline'} size={size} color={color}/>
        </TouchableOpacity>
    )
}