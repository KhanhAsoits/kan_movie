import {Box, Text, VStack} from "native-base";
import {SCREEN_WIDTH} from "../../core/helper";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import AuthStore from '../../models/AuthStore'

const SignInTab = ({
                       setActive,
                       emailIsValid,
                       passwordIsValid,
                   }) => {


    return (
        <Box flex={1} style={{width: SCREEN_WIDTH}} bgColor={'black'}
             justifyContent={'flex-start'} alignItems={'center'}>
            <VStack px={4} width={SCREEN_WIDTH - 10} my={3} space={2}>
                <Box my={6} mb={0} alignSelf={'flex-start'}>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        setActive(0)
                    }}>
                        <Ionicons name={'arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>
                </Box>
                <Text color={'white'} fontSize={70} letterSpacing={1.5} width={SCREEN_WIDTH}
                      fontWeight={'600'}>Let's sign</Text>
                <Text color={'white'} fontSize={50} letterSpacing={1.5} width={SCREEN_WIDTH}
                      fontWeight={'600'}>You in.</Text>
                <Text color={'white'} fontSize={26} letterSpacing={1.5} width={SCREEN_WIDTH}
                      fontWeight={'500'}>Welcome Back.</Text>
                <Text color={'white'} fontSize={26} letterSpacing={1.5} width={SCREEN_WIDTH}
                      fontWeight={'500'}>You've been missed!</Text>

                <VStack mt={12} space={4}>
                    <TextInput onChangeText={text => AuthStore.setUserName(text)}
                               placeholder={'Phone,email or username'}
                               placeholderTextColor={'rgba(255,255,255,.8)'}
                               style={{
                                   ...styles.responsiveInput,
                                   borderColor: emailIsValid ? 'rgba(255,255,255,.5)' : 'rgba(200,20,20,1)'
                               }}/>
                    <TextInput secureTextEntry={true} onChangeText={text => AuthStore.setPassword(text)}
                               placeholder={'Password'}
                               placeholderTextColor={'rgba(255,255,255,.8)'}
                               style={{
                                   ...styles.responsiveInput,
                                   borderColor: passwordIsValid ? 'rgba(255,255,255,.5)' : 'rgba(200,20,20,1)'
                               }}/>
                </VStack>
            </VStack>
        </Box>
    )
}
const styles = StyleSheet.create({
    responsiveInput: {
        width: "100%",
        borderWidth: 1,
        backgroundColor: 'rgba(40,40,40,.7)',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 12,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1.1,
        color: 'rgba(255,255,255,.8)',
    }
})
export default observer(SignInTab)