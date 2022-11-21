import {Box, HStack, Text} from "native-base";
import {SCREEN_WIDTH} from "../../core/helper";
import {TouchableOpacity} from "react-native";

export const SelectBox = ({item, active, setActive, handleSelect, cStyle}) => {

    const handleActive = () => {
        setActive(item.id)
        handleSelect(item.id)
    }

    return (
        <TouchableOpacity activeOpacity={.9} onPress={handleActive}>
            <Box p={3} justifyContent={'center'} style={{width: SCREEN_WIDTH / 3.6, ...cStyle}} alignItems={'center'}
                 bgColor={active === item?.id ? 'red.500' : 'secondary.100'} borderRadius={6}>
                {!item?.name &&
                    <Text fontSize={16} fontWeight={'500'}
                          color={active === item?.id ? 'white' : 'black'}>{item?.date?.slice(4, 10)?.trim()}</Text>
                }

                <Text fontSize={14} fontWeight={'500'}
                      color={active === item?.id ? 'white' : 'black'}>{item?.date?.slice(0, 3)?.trim().toUpperCase() || item?.name}</Text>
            </Box>
        </TouchableOpacity>
    )
}