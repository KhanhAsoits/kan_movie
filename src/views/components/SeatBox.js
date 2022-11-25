import React, {useEffect, useRef, useState} from "react";
import {TouchableOpacity} from "react-native";
import {Box} from "native-base";
import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";
import ThemeStore from "../../models/ThemeStore";

export const SeatBox = ({handleSelected, type_, seat, index, isCenter}) => {
    const [type, setType] = useState(type_ ? type_ : 1)
    // 1 normal
    // 2 block
    // 10 selected
    // 4 vip
    const oldType = useRef(type_)

    useEffect(() => {
        if (!type_) {
            const randomType = Math.round(Math.random() * (3 - 1) + 1)
            setType(randomType)
            oldType.current = randomType
        }
    }, [])
    const typeBlock = {
        backgroundColor: ThemeStore.baseProps.text_black_02,
        borderColor:  ThemeStore.baseProps.text_black_02
    }
    const typeNormal = {
        borderColor: ThemeStore.baseProps.text_black_02,
        borderWidth: 1
    }
    const typeVip = {
        borderColor: '#47CFFF',
        borderWidth: 1
    }
    const typeSelected = {
        backgroundColor: '#47CFFF'
    }
    return (
        <TouchableOpacity onPress={() => {
            if (handleSelected) {
                handleSelected({name: seat.name, position: index, type: oldType.current})
            }
            setType(c => (c === 10 ? oldType.current : c !== 2 ? 10 : c))
        }} activeOpacity={.8}>
            <Box style={Object.assign({
                width: (SCREEN_WIDTH - 55) / 4 / 3.5,
                height: (SCREEN_WIDTH - 55) / 4 / 3.5,
                marginVertical: 2,
                marginHorizontal: 2,

            }, type === 1 ? typeNormal : type === 2 ? typeBlock : type === 3 ? typeVip : typeSelected)}
                 borderRadius={6}
            >
            </Box>
        </TouchableOpacity>
    )
}