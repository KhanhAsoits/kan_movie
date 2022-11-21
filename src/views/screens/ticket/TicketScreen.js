import {observer} from "mobx-react";
import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Image, Modal, Text, VStack} from "native-base";
import SvgComponent from "../../components/ScreenSvg";
import {BackButton} from "../../components/BackButton";
import {HelpButton} from "../../components/HelpButton";
import bg from '../../../../assets/static/images/movie-preview.png'
import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";

const TicketScreen = () => {
    const data = {
        "id": "77487ef0-c3ed-40cb-97fa-7bf0836d35e2",
        "name": "Galaxy Cinema",
        "seats": [
            {
                "name": "A",
                "seats": 3
            },
            {
                "name": "B",
                "seats": 8
            },
            {
                "name": "C",
                "seats": 6
            },
            {
                "name": "D",
                "seats": 8
            },
            {
                "name": "E",
                "seats": 8
            },
            {
                "name": "F",
                "seats": 6
            },
            {
                "name": "G",
                "seats": 9
            },
            {
                "name": "H",
                "seats": 12
            },
            {
                "name": "I",
                "seats": 9
            },
            {
                "name": "K",
                "seats": 9
            },
            {
                "name": "M",
                "seats": 12
            },
            {
                "name": "L",
                "seats": 9
            }
        ]
    }

    let countOfSeat = -1

    const SeatBox = ({seat, isCenter}) => {
        const [type, setType] = useState(type)
        // 1 normal
        // 2 block
        // 10 selected
        // 4 vip
        useEffect(() => {
            const randomType = Math.round(Math.random() * (3 - 1) + 1)
            setType(randomType)
        }, [])
        const typeBlock = {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderColor: 'rgba(0,0,0,0.1)'
        }
        const typeNormal = {
            borderColor: 'rgba(0,0,0,0.2)',
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
                setType(c => (c === 10 ? 1 : c !== 2 ? 10 : 2))
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
    return (
        <NativeBaseProvider>
            <HStack width={SCREEN_WIDTH - 30} alignSelf={'center'} my={4} justifyContent={'space-between'}
                    alignItems={'center'}>
                <BackButton size={36} color={'black'} handleBack={() => {
                }}/>
                <HStack space={2} justifyContent={'center'} alignItems={'center'}>
                    <Image source={bg} alt={'movie thumbnail'} style={{width: 40, height: 40, borderRadius: 6}}/>
                    <VStack space={0}>
                        <Text fontWeight={'500'} fontSize={16} letterSpacing={1.2} color={'black'}>John Wick 3:
                            Parabellum</Text>
                        <Text fontWeight={'500'} fontSize={12} letterSpacing={1.1} color={'gray.400'}>8:30 - 10:00 AM in
                            24 May, 2019</Text>
                    </VStack>
                </HStack>
                <HelpButton size={36} color={'black'} message={'Order Seats'}/>
            </HStack>
            <Box flex={1} py={4} justifyContent={'flex-start'} alignItems={'center'}>
                <SvgComponent/>
                <Text color={'gray.400'} fontWeight={'500'}>SCREEN</Text>
                <Box my={6}></Box>
                <VStack space={3} justifyContent={'center'} alignItems={'center'}>
                    {data.seats.map((val, index) => {
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
                                                {Array.from(new Array(data.seats[real].seats)).map((val, index) => {
                                                    return (
                                                        <SeatBox seat={data.seats[real]} isCenter={isCenter}/>
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
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(TicketScreen)

const styles = StyleSheet.create({
    video: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
});
