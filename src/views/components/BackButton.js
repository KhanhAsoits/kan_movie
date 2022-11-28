import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const BackButton = ({handleBack, display = true, size, color}) => {
    return (
        <TouchableOpacity style={{display: display ? '' : 'none'}} activeOpacity={.8} onPress={handleBack}>
            <Ionicons name={'chevron-back'} size={size} color={color}/>
        </TouchableOpacity>
    )
}