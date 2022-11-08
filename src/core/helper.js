import NetInfo from "@react-native-community/netinfo";
import {Dimensions} from "react-native";

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
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height