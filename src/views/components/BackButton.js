import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const BackButton = ({handleBack, size, color}) => {
    return (
        <TouchableOpacity activeOpacity={.8} onPress={handleBack}>
            <Ionicons name={'chevron-back'} size={size} color={color}/>
        </TouchableOpacity>
    )
}