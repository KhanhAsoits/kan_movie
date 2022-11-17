import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Text, VStack} from "native-base";
import {useNavigation} from "@react-navigation/native";
import WelcomeVideoStore from "../../../models/WelcomeVideoStore";
import {SCREEN_WIDTH} from "../../../core/helper";
import {ActivityIndicator, Alert, TouchableOpacity} from "react-native";
import {useState} from "react";
import SignInTab from "../../components/SignInTab";
import {SignUpTab} from "../../components/SignUpTab";
import AuthStore from "../../../models/AuthStore";
import {Animated} from "react-native";
import {observer} from "mobx-react";
import {Alert_} from "../../components/Alert";
import SignInTabModel from "../../../viewmodels/SignInTabModel";
import UserStore from "../../../models/UserStore";

const AuthScreen = ({route}) => {
    const nav = useNavigation()
    nav.addListener('beforeRemove', () => {
        WelcomeVideoStore.setPlay(true)
    })
    const [tabActive, setTabActive] = useState(0)

    const handleSignIn = async () => {
        if (AuthStore.isSignInValid) {
            let res = await AuthStore.onPostLogin()
            console.log('res : ', res)
            if (res) {
                nav.goBack('welcome_screen')
            }
            console.log(UserStore.isLogin)
        } else {
            Alert.alert("Warning",
                "Authorize info not valid.",)
        }
    }

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
                    <SignInTabModel setActive={setTabActive}/>

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

                    <TouchableOpacity activeOpacity={1} onPress={async () => {
                        if (tabActive === 1) {
                            await handleSignIn()
                        }
                        setTabActive(1)
                    }} style={{
                        borderRadius: 12,
                        paddingVertical: 16,
                        backgroundColor: tabActive === 1 ? 'white' : 'transparent',
                        width: tabActive === 0 ? (SCREEN_WIDTH - 100) / 2 : SCREEN_WIDTH - 100,
                    }}>
                        {
                            AuthStore.loginFetching ?
                                <ActivityIndicator/> :
                                <Text color={tabActive === 1 ? 'black' : 'white'} fontSize={16} fontWeight={'700'}
                                      textAlign={'center'}>Sign In</Text>
                        }
                    </TouchableOpacity>
                </HStack>
            </Box>
        </NativeBaseProvider>
    )
}
export default observer(AuthScreen)