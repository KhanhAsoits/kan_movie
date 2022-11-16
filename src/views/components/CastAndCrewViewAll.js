import {Box, HStack, ScrollView, Text, VStack} from "native-base";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {CastGenerator} from "./CastGenerator";
import {Platform, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useRef, useState} from "react";
import {CastLoader} from "./CastLoader";

export const CastAndCrewViewAll = ({route}) => {
    const {casts} = route.params
    const nav = useNavigation()
    const loadMount = useRef(false)
    const [preLoad, setPreLoad] = useState(false)
    const handleBack = () => {
        nav.goBack()
    }
    useEffect(() => {
        if (loadMount.current === false) {

            setTimeout(() => {
                setPreLoad(true)
            }, 1000)
        }
        return () => loadMount.current = false
    }, [])

    const loadCounter = Platform.OS === "android" ? casts.length / 5 : casts.length / 3

    return (
        <NativeBaseProvider>
            <HStack justifyContent={'space-between'} alignItems={'center'} flex={.1} mt={8} mx={2}>
                <TouchableOpacity activeOpacity={.6} onPress={handleBack}>
                    <Ionicons name={'chevron-back-outline'} color={'black'} size={30}></Ionicons>
                </TouchableOpacity>
                <Text textAlign={'center'} fontSize={20}>Cast & Crew</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <Ionicons name={'help-circle-outline'} color={'black'} size={30}></Ionicons>
                </TouchableOpacity>
            </HStack>
            <ScrollView flex={1}>
                {
                    preLoad ?
                        <VStack justifyContent={'center'} alignItems={'center'}>
                            <CastGenerator casts={casts} all={true}></CastGenerator>
                        </VStack>
                        :
                        <CastLoader count={Math.round(loadCounter)}></CastLoader>
                }
            </ScrollView>
        </NativeBaseProvider>
    )
}