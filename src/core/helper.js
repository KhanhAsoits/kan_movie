import NetInfo from "@react-native-community/netinfo";
import {Dimensions} from "react-native";
import * as ImagePicker from 'expo-image-picker'
export const CalculatorRating = (rating) => {
    return Math.round(rating / 2)
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const checkConnection = async () => {
    return (await NetInfo.fetch()).isConnected
}
export const handleMoving = (nav, to, param = {}) => {
    nav.navigate(to, param)
}

export const PickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    })
    console.log(res)
    if(!res.cancelled){
        return res.uri
    }
    return null
}

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
