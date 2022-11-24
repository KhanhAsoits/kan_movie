import NetInfo from "@react-native-community/netinfo";
import {Dimensions} from "react-native";
import * as ImagePicker from 'expo-image-picker'

export const CalculatorRating = (rating) => {
    return Math.round(rating / 2)
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const numberTokenGenerator = (count) => {

    let token = ''
    let nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    for (let i = 0; i < count; i++) {
        token += nums[Math.round(Math.random() * (nums.length - 1))]
    }
    return token
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
    if (!res.cancelled) {
        return res.uri
    }
    return null
}

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
