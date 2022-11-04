import NetInfo from "@react-native-community/netinfo";

export const CalculatorRating = (rating) => {
    return Math.round(rating / 2)
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const checkConnection = async () => {
    return (await NetInfo.fetch()).isConnected
}