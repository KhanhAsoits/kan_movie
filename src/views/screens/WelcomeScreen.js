import {Video} from "expo-av";
import {Animated, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../core/helper";
import React, {useEffect, useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import WelcomeVideoStore from "../../models/WelcomeVideoStore";
import {observer} from "mobx-react";
import UserStore from "../../models/UserStore";
import AuthStore from "../../models/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = ({route}) => {
    const nav = useNavigation()
    const video = useRef(null)
    const [authorizeLoading, setAuthorizeLoading] = useState(false)
    const spinnerAni = useRef(new Animated.Value(0)).current

    const aniIn = spinnerAni.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    useEffect(() => {
        Animated.loop(Animated.timing(spinnerAni, {
            duration: 500,
            toValue: 1,
            useNativeDriver: true
        })).start()
    }, [])

    //auto login

    useEffect(() => {
        const authorizeSync = async () => {
            let authorizeKey = await AsyncStorage.getItem('@AuthorizeId')
            console.log('auto login! with id  : ', authorizeKey)

            if (authorizeKey !== null) {
                setAuthorizeLoading(true)
                await AuthStore.onGetUserById(authorizeKey)
                setAuthorizeLoading(false)
            }
        }
        authorizeSync()
    }, [])

    useEffect(() => {
        //    after login
        const setAuthorizeKey = async (key) => {
            await AsyncStorage.setItem('@AuthorizeId', key ? key.toString() : '')
            AuthStore.setIsLogin(true)
        }

        const bsSync = async () => {
            setAuthorizeLoading(true)
            await setAuthorizeKey(UserStore.user?.id)
            setAuthorizeLoading(false)
        }

        if (UserStore.user.id !== '' && !AuthStore.isLogin) {
            bsSync()
        }
    }, [UserStore.user])

    const list = [
        '250 top of movie.',
        'Most of coming soon movies.',
        'Most of showing movies.',
        'Best movie reviews.',
        'Ease to get a movie ticket.',
        'Realtime notifications.',
        'Movies wishlist and more...'
    ]
    return (
        <View style={styles.container}>
            {authorizeLoading &&
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    zIndex: 10
                }}>
                    <Animated.View style={{
                        width: 45,
                        height: 45,
                        borderRadius: 50,
                        borderWidth: 2,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        borderColor: 'white',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        zIndex: 10,
                        transform: [{rotate: aniIn}],
                        alignSelf: 'center',
                        top: SCREEN_HEIGHT / 2,
                    }}>

                    </Animated.View>
                </View>
            }

            <Video
                ref={video}
                source={require("../../../assets/static/videos/wel_vi.mp4")}
                style={styles.backgroundVideo}
                shouldPlay={WelcomeVideoStore.play}
                isLooping={true}
                volume={1}
                useNativeControls={false}
                isMuted={WelcomeVideoStore.muted}
                resizeMode="cover"
            />
            <View style={{...styles.overlay, justifyContent: 'flex-end'}}></View>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TouchableOpacity onPress={() => {
                    WelcomeVideoStore.setMuted(!WelcomeVideoStore.muted)
                }} style={{alignSelf: 'flex-end', marginVertical: 40, marginHorizontal: 20}}>
                    <Ionicons name={WelcomeVideoStore.muted ? 'volume-mute' : 'volume-low'} color={'white'}
                              size={20}></Ionicons>
                </TouchableOpacity>
                <Text style={{
                    marginHorizontal: 20,
                    fontSize: 55,
                    color: 'rgba(250,50,50,.9)',
                    letterSpacing: 1.5,
                    fontWeight: "900"
                }}>KAN -
                    MOVIES.</Text>
                <Text style={{marginHorizontal: 20, fontSize: 36, color: 'rgba(255,255,255,.9)', fontWeight: "500"}}>Your
                    movies here's
                </Text>
                <View style={{marginVertical: 8}}></View>

                {list.map((val, index) => {
                    return (
                        <Text key={index.toString()} style={{
                            marginHorizontal: 20,
                            letterSpacing: 1.2,
                            fontSize: 20,
                            color: 'rgba(255,255,255,.9)',
                            fontWeight: "400"
                        }}>
                            - {val}
                        </Text>
                    )
                })}


                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 22
                    }}>
                        <TouchableOpacity activeOpacity={.9} onPress={() => {
                            WelcomeVideoStore.setMuted(true)
                            WelcomeVideoStore.setPlay(false)
                            nav.navigate('auth_screen')
                        }} style={{
                            paddingVertical: 16,
                            borderRadius: 8,
                            width: SCREEN_WIDTH - 40,
                            backgroundColor: 'rgba(255,255,255,.8)'
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 16,
                                color: 'rgba(0,0,0,1)',
                                fontWeight: '500',
                                letterSpacing: 2
                            }}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
export default observer(WelcomeScreen)