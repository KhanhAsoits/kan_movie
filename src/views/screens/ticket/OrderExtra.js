import {observer} from "mobx-react";
import {Box, HStack, Text, VStack} from "native-base";
import coca from '../../../../assets/static/images/cocacola.png'
import pepsi from '../../../../assets/static/images/pepsi.png'
import seven_up from '../../../../assets/static/images/7_up.png'
import popcorn from '../../../../assets/static/images/popcorn.png'
import {ExtraItem} from "../../components/ExtraItem";
import React, {useState} from "react";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import TicketStore from "../../../models/TicketStore";
import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";
import ThemeStore from "../../../models/ThemeStore";

const OrderExtra = ({setStep}) => {

    const listExtraItems = [
        {title: 'Coca', price: 4, image: coca},
        {title: 'Pepsi', price: 4, image: pepsi},
        {title: '7 up', price: 3, image: seven_up},
        {title: 'Popcorn', price: 5, image: popcorn}
    ]
    const [nextStepLoading, setNextStepLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [selected, setSelected] = useState([])

    const handleRemove = (item) => {
        let remove_index = -1
        selected.forEach((val, index) => {
            if (val.title === item.title) {
                remove_index = index
            }
        })

        if (remove_index !== -1) {
            let tmp = [...selected]
            tmp.splice(remove_index, 1)
            setSelected(tmp)
        }
    }

    const handleCalcTotal = () => {
        return selected.reduce((cur, next) => {
            return cur + (next.price * next.quantity)
        }, 0)
    }

    const handleSelected = (item) => {
        if (selected.length === 0) {
            let tmp = []
            tmp.push(item)
            setSelected(tmp)
        }
        let isHas = false
        let hasIndex = -1
        selected.forEach((val, index) => {
            if (val.title === item.title) {
                isHas = true
                hasIndex = index
            }
        })
        if (isHas === false) {
            let tmp = [...selected]
            tmp.push(item)
            setSelected(tmp)
        } else {
            if (hasIndex !== -1) {
                let tmp = [...selected]
                tmp[hasIndex].quantity = tmp[hasIndex]?.quantity + 1
                setSelected(tmp)
            }
        }
    }

    const handleNextStep = () => {
        setNextStepLoading(true)
        setTimeout(() => {
            TicketStore.setOrderTicketExtra(selected)
            TicketStore.setOrderTicketTotal(TicketStore.orderTicket.total + handleCalcTotal())
            setStep(c => c + 1)
            setNextStepLoading(false)
        }, 2000)
    }
    return (
        <Box flex={1} px={4}>
            <VStack space={8} justifyContent={'space-between'} alignItems={'center'}>
                {listExtraItems.map((val, index) => {
                    return (
                        <ExtraItem handleCalcTotal={handleCalcTotal} handleRemove={handleRemove}
                                   handleSetSelected={handleSelected}
                                   setSelected={setSelected} total={total} setTotal={setTotal} item={val}/>
                    )
                })}
            </VStack>
            <HStack my={2} justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize={14} color={'gray.400'}>{selected.length} SELECTED</Text>
                <Text fontSize={24} color={'red.400'}>${handleCalcTotal()}</Text>
            </HStack>
            <HStack position={'absolute'} bottom={0} width={SCREEN_WIDTH - 30} alignSelf={'center'}
                    backgroundColor={ThemeStore.baseProps.text_black_02}
                    py={2}
                    px={3}
                    mb={2}
                    borderRadius={8}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                <VStack>
                    <Text fontSize={12} color={'gray.400'}>TOTAL COST</Text>
                    <Text fontSize={30} color={'red.400'}>${TicketStore.orderTicket.total + handleCalcTotal()}</Text>
                </VStack>
                <TouchableOpacity activeOpacity={.9} onPress={handleNextStep}>
                    <Box bgColor={'red.500'} borderRadius={6} px={10} py={3}>
                        {nextStepLoading ? <ActivityIndicator color={'white'} size={30}/> :
                            <Text color={'white'} fontWeight={'500'} fontSize={18}>Next</Text>
                        }
                    </Box>
                </TouchableOpacity>
            </HStack>
        </Box>
    )
}
export default observer(OrderExtra)