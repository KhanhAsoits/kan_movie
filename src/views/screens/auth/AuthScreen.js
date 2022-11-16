import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Image, Text, VStack} from "native-base";
import {useNavigation} from "@react-navigation/native";
import WelcomeVideoStore from "../../../models/WelcomeVideoStore";
import bg from '../../../../assets/static/images/reg_bg.png'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../core/helper";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useState} from "react";
import {SignInTab} from "../../components/SignInTab";
import {SignUpTab} from "../../components/SignUpTab";


export const AuthScreen = ({route}) => {

    const nav = useNavigation()
    nav.addListener('beforeRemove', () => {
        WelcomeVideoStore.setPlay(true)
    })

    const [tabActive, setTabActive] = useState(0)


    //inline cpn


    return (
        <NativeBaseProvider>
            <Box flex={1} pb={3} style={{width: SCREEN_WIDTH}} backgroundColor={'black'}>
                <Box left={tabActive === 0 ? 0 : -SCREEN_WIDTH} flex={1} style={{width: SCREEN_WIDTH * 2}}
                     flexDir={'row'}
                     backgroundColor={'black'}
                     justifyContent={'space-between'}
                     alignItems={'flex-start'}>

                    <SignUpTab active={tabActive} setActive={setTabActive}/>
                    <SignInTab active={tabActive} setActive={setTabActive}/>

                </Box>
                <HStack style={{width: SCREEN_WIDTH - 100}}
                        flexDir={'row'}
                        alignSelf={'center'}
                        borderRadius={12}
                        backgroundColor={'rgba(40,40,40,.8)'}>
                    <>
                        {tabActive === 0 &&
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                setTabActive(0)
                            }} style={{
                                backgroundColor: 'white',
                                borderRadius: 12,
                                paddingVertical: 16,
                                width: (SCREEN_WIDTH - 100) / 2,
                            }}>
                                <Text color={'black'} fontSize={16} fontWeight={'700'} textAlign={'center'}>Sign
                                    Up</Text>
                            </TouchableOpacity>}
                    </>

                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        setTabActive(1)
                    }} style={{
                        borderRadius: 12,
                        paddingVertical: 16,
                        backgroundColor: tabActive === 1 ? 'white' : 'transparent',
                        width: tabActive === 0 ? (SCREEN_WIDTH - 100) / 2 : SCREEN_WIDTH - 100,
                    }}>
                        <Text color={tabActive === 1 ? 'black' : 'white'} fontSize={16} fontWeight={'700'}
                              textAlign={'center'}>Sign
                            In</Text>
                    </TouchableOpacity>
                </HStack>

            </Box>

        </NativeBaseProvider>
    )
}
