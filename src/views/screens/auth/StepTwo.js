import {Box, Center, HStack, Text} from "native-base";
import {observer} from "mobx-react";
import {Image, TextInput, Vibration} from "react-native";
import phone from '../../../../assets/static/images/phone_verify.png'
import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";
import {useEffect, useRef, useState} from "react";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import AuthStore from "../../../models/AuthStore";

const StepTwo = ({nextStep}) => {

    const ref = useRef()
    const OtpBox = ({isValid, index, currentCode, currentIndex}) => {
        const tmp = ""
        const dig = currentCode[index] || tmp
        return (
            <Box style={{minWidth: 45, minHeight: 60, padding: 12}} borderWidth={2} borderRadius={6}
                 borderColor={isValid === 0 ? (index === currentIndex ? 'white' : 'gray.400') : isValid === -1 ? 'red.400' : 'green.400'}>
                <Text textAlign={'center'} color={index === currentIndex ? 'white' : 'gray.400'}
                      fontSize={20}>{dig}</Text>
            </Box>
        )
    }
    const OtpInput = ({length, code}) => {
        const [isValid, setIsValid] = useState(0)
        const [currentCode, setCurrentCode] = useState('')
        const [currentIndex, setCurrentIndex] = useState(0)
        useEffect(() => {
            setCurrentIndex(currentCode.length)
            if (currentCode.length === code.length) {
                if (currentCode === code) {
                    setIsValid(1)
                    setTimeout(() => {
                        nextStep()
                    }, 1000)
                } else {
                    Vibration.vibrate(1000)
                    setIsValid(-1)
                    setTimeout(() => {
                        setIsValid(0);
                        setCurrentCode('')
                    }, 1000)
                }
            }
        }, [currentCode])
        return (
            <Box>
                {console.log('code:', AuthStore.emailValidCode)}
                <HStack my={8} justifyContent={'center'} alignItems={'center'} space={5}>
                    {Array.from(new Array(length || 6)).map((val, index) => {
                        return (
                            <OtpBox isValid={isValid} currentIndex={currentIndex} currentCode={currentCode} key={UUID()}
                                    index={index}/>
                        )
                    })}
                </HStack>
                <TextInput
                    onChangeText={text => setCurrentCode(text)}
                    maxLength={length || 6}
                    value={currentCode}
                    keyboardType={'number-pad'}
                    style={{
                        width: SCREEN_WIDTH - 45,
                        borderRadius: 6,
                        height: 60,
                        top: 30,
                        position: 'absolute',
                        opacity: 0
                    }}
                    onBlur={() => {
                    }}
                    ref={ref}
                />
            </Box>
        )
    }


    return (
        <Box flex={1} px={4}>
            <Center>
                <Image source={phone}
                       style={{width: SCREEN_WIDTH / 2, height: SCREEN_WIDTH / 2, resizeMode: 'contain'}}/>
                <Text color={'white'} fontSize={30} fontWeight={'600'}>Check your email.</Text>
                <Text color={'gray.400'} fontSize={20}>We have just sent you a verify email.</Text>
                <OtpInput length={6} code={AuthStore.emailValidCode}/>
            </Center>
        </Box>
    )
}

export default observer(StepTwo)