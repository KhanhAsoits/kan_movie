import {HStack} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
export const RatingGenerator = ({total, per}) => {
    const rating = []
    for (let i = 0; i < total; i++) {
        rating.push(i)
    }
    return (
        <HStack space={1}>
            {rating.map((item, index) => (
                <Ionicons key={index.toString()} name={index < per ? 'star' : 'star-outline'} color={"#F8C42F"} size={14}></Ionicons>
            ))}
        </HStack>
    )
}