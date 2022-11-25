import {Box, HStack, Image, Text, VStack} from "native-base";
import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";
import {TextInput, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useEffect, useRef, useState} from "react";
import ThemeStore from "../../models/ThemeStore";

export const ExtraItem = ({handleRemove, item, handleSetSelected}) => {
    const [quantity, setQuantity] = useState(0)
    useEffect(() => {
        if (quantity === 0) {
            handleRemove({...item, quantity: quantity})
        }
        if (quantity > 0) {
            handleSetSelected({...item, quantity: quantity})
        }
    }, [quantity])

    return (
        <HStack width={SCREEN_WIDTH - 30} justifyContent={'space-between'} alignItems={'center'}>
            <HStack justifyContent={'center'} alignItems={'center'} space={2}>
                <Image source={item.image} alt={'coca-cola'}
                       style={{width: 50, resizeMode: 'contain', height: 80}}/>
                <VStack space={0}>
                    <Text fontSize={18} color={ThemeStore.baseProps.text_24}>{item.title}</Text>
                    <Text fontSize={14} color={'gray.400'}>${item.price}</Text>
                </VStack>
            </HStack>
            <HStack space={2}>
                <TouchableOpacity activeOpacity={.9} onPress={() => {
                    setQuantity(c => (c - 1 < 0 ? 0 : c - 1))
                }}>
                    <Box p={1} style={{borderColor: '#47CFFF'}} borderWidth={1} borderRadius={6}>
                        <Ionicons name={'remove'} color={'#47CFFF'} size={25}/>
                    </Box>
                </TouchableOpacity>
                <TextInput editable={false} keyboardType={'number-pad'} maxLength={2}
                           style={{
                               color: ThemeStore.baseProps.text_24,
                               width: SCREEN_WIDTH / 5,
                               borderColor: 'rgba(0,0,0,0.6)',
                               borderRadius: 6,
                               borderWidth: .5,
                               textAlign: 'center'
                           }}
                           defaultValue={quantity.toString()}
                />
                <TouchableOpacity activeOpacity={.9} onPress={() => {
                    setQuantity(c => (c + 1 > 99 ? 99 : c + 1))
                }}>
                    <Box p={1} style={{borderColor: '#47CFFF'}} borderWidth={1} borderRadius={6}>
                        <Ionicons name={'add'} color={'#47CFFF'} size={25}/>
                    </Box>
                </TouchableOpacity>
            </HStack>
        </HStack>
    )
}