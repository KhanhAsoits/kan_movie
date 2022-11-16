import {Video} from "expo-av";
import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../core/helper";
import React, {useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import WelcomeVideoStore from "../../models/WelcomeVideoStore";
import {observer} from "mobx-react";

const WelcomeScreen = ({route}) => {
    const nav = useNavigation()
    const video = useRef(null)
    return (
        <View style={styles.container}>
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
        backgroundColor: 'rgba(0,0,0,0.3)',
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