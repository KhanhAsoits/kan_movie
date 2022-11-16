import {Box} from "native-base/src/index";
import {Text, View} from "native-base";
import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import {SCREEN_HEIGHT} from "../../core/helper";
import homeStore from "../../models/HomeStore";
import {observer} from "mobx-react";

const Loader = ({height}) => {
    const ani = useRef(new Animated.Value(0)).current
    const spinInto = ani.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    useEffect(() => {
        Animated.loop(
            Animated.timing(ani, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }
            )).start()
    }, [ani, spinInto])


    return (
        <Box height={height ? height : 500} position={'relative'} justifyContent={'center'}
             alignItems={'center'}>
            <Animated.View
                width={30}
                height={30}
                borderWidth={2}
                borderRadius={50}
                style={{
                    borderStyle: "dashed",
                    borderColor: 'red',
                    transform: [{rotate: spinInto}]
                }}
            >
            </Animated.View>
        </Box>
    )
}

export default observer(Loader)