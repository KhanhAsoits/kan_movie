import {observer} from "mobx-react";
import {Box, Center, HStack, ScrollView, Text, VStack} from "native-base";
import React,{ useState} from "react";
import {ActivityIndicator, Alert, TouchableOpacity} from "react-native";
import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";
import SvgComponent from "../../components/ScreenSvg";
import {SeatBox} from "../../components/SeatBox";
import TicketStore from "../../../models/TicketStore";
import ThemeStore from "../../../models/ThemeStore";

const OrderSeat = ({setStep, seats}) => {
    let countOfSeat = -1
    const [selected, setSelected] = useState([])
    const handleSelected = (seats) => {
        if (seats.type !== 2) {
            if (selected.length === 0) {
                let temp = []
                temp.push(seats)
                setSelected(temp)
                return
            }
            let remove_index = -1
            selected.forEach((val, index) => {
                if (val.name === seats.name && val.position === seats.position) {
                    remove_index = index
                }
            })
            if (remove_index !== -1) {
                let tmp = [...selected]
                tmp.splice(remove_index, 1)
                setSelected(tmp)
            } else {
                let tmp = [...selected]
                tmp.push(seats)
                setSelected(tmp)
            }
        }
    }
    const [nextStepLoading, setNextStepLoading] = useState(false)
    const handleNextStep = () => {
        if (selected.length <= 0) {
            Alert.alert('Warning', 'You must pick a seat.')
        } else {
            setNextStepLoading(true)
            setTimeout(() => {
                TicketStore.setOrderTicketSelectSeat(selected)
                let total_ = selected.reduce((cur, prev) => {
                    return cur + (prev.type === 1 ? 10 : 30)
                }, 0)
                TicketStore.setOrderTicketTotal(total_)
                setStep(c => c + 1)
                setNextStepLoading(false)
            }, 1000)
        }

    }

    return (
        <>
            <Box bgColor={ThemeStore.baseProps.themeBg} flex={1} py={4} justifyContent={'flex-start'} alignItems={'center'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Center>
                        <SvgComponent/>
                        <Text color={'gray.400'} alignSelf={'center'} fontWeight={'500'}>SCREEN</Text>
                    </Center>
                    <Box my={6}></Box>
                    <VStack space={3} justifyContent={'center'} alignItems={'center'}>
                        {seats.map((val, index) => {
                            countOfSeat++
                            if (countOfSeat % 3 === 0) {
                                return (
                                    <HStack justifyContent={'space-between'} alignItems={'flex-start'}
                                            width={SCREEN_WIDTH - 55}>

                                        {Array.from(new Array(3)).map((val, index) => {
                                            let real = countOfSeat + index
                                            let isCenter = (real === 1 || real === 4 || real === 7 || real === 10)
                                            let isLeft = !isCenter ? (real === 0 || real === 3 || real === 6 || real === 9) : false

                                            return (
                                                <HStack
                                                    justifyContent={isCenter ? 'center' : isLeft ? 'flex-end' : 'flex-start'}
                                                    alignItems={'flex-start'}
                                                    flexWrap={'wrap'}
                                                    width={(SCREEN_WIDTH - 55) / (isCenter ? 2.5 : 4)}>
                                                    {Array.from(new Array(seats[real].seats)).map((val, index) => {
                                                        return (
                                                            <SeatBox handleSelected={handleSelected} seat={seats[real]}
                                                                     index={index + 1}
                                                                     isCenter={isCenter}/>
                                                        )
                                                    })}
                                                </HStack>
                                            )
                                        })}
                                    </HStack>
                                )
                            }
                        })}
                    </VStack>
                    <HStack bgColor={ThemeStore.baseProps.text_black_02} py={3} px={3} borderRadius={6} width={SCREEN_WIDTH - 55}
                            alignSelf={'center'} mt={6} justifyContent={'space-between'}
                            alignItems={'center'}>
                        <VStack justifyContent={'center'} alignItems={'center'}>
                            <SeatBox type_={1}/>
                            <Text color={'gray.400'}>Normal</Text>
                        </VStack>
                        <VStack justifyContent={'center'} alignItems={'center'}>
                            <SeatBox type_={2}/>
                            <Text color={'gray.400'}>Booked</Text>
                        </VStack>
                        <VStack justifyContent={'center'} alignItems={'center'}>
                            <SeatBox type_={3}/>
                            <Text color={'gray.400'}>VIP</Text>
                        </VStack>
                        <VStack justifyContent={'center'} alignItems={'center'}>
                            <SeatBox type_={10}/>
                            <Text color={'gray.400'}>Selected</Text>
                        </VStack>
                    </HStack>
                    <HStack my={6} bgColor={ThemeStore.baseProps.text_black_02} borderRadius={6} py={3} px={3} justifyContent={'space-between'}
                            alignItems={'center'}>
                        <VStack>
                            <Text fontSize={12} fontWeight={'500'}
                                  color={'gray.400'}>{selected.map((val, index) => val.name + val.position).join(',').toUpperCase()} SELECTED</Text>
                            <Text color={'red.400'} fontSize={24}>${selected.reduce((cur, prev) => {
                                return cur + (prev.type === 1 ? 10 : 30)
                            }, 0)}</Text>
                        </VStack>
                        <TouchableOpacity activeOpacity={.9} onPress={handleNextStep}>
                            <Box bgColor={'red.500'} borderRadius={6} px={10} py={3}>
                                {nextStepLoading ? <ActivityIndicator color={'white'} size={30}/> :
                                    <Text color={'white'} fontWeight={'500'} fontSize={18}>Next</Text>
                                }
                            </Box>

                        </TouchableOpacity>
                    </HStack>
                </ScrollView>
            </Box>
        </>
    )
}
export default observer(OrderSeat)