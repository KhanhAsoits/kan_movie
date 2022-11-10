import {observer} from "mobx-react";
import React, {useEffect, useRef, useState} from "react";
import {StyleSheet} from "react-native";
import WebView from "react-native-webview";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Modal} from "native-base";

const TicketScreen = () => {
    return (
        <NativeBaseProvider>
            <WebView
                style={{flex: 1, paddingTop: 20}}
                originWhitelist={['*']}
                source={{uri: 'https://www.imdb.com/video/vi1362346521'}}
            />
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
