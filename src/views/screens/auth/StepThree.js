import {Box, Text, VStack} from "native-base";
import {observer} from "mobx-react";
import {TextInput, StyleSheet} from "react-native";
import AuthStore from "../../../models/AuthStore";
import {useState} from "react";

const StepThree = ({setConfirmPassword,confirmPassword}) => {
    return (
        <Box flex={1} px={4}>
            <Text fontSize={70} color={'white'} fontWeight={'600'} letterSpacing={2}>Let's,</Text>
            <Text fontSize={40} color={'white'} fontWeight={'600'} letterSpacing={2}>Set your password.</Text>
            <Text fontSize={26} color={'gray.400'} fontWeight={'600'} letterSpacing={2}>Fill your password here.</Text>

            <VStack my={6} space={6}>
                <VStack space={1}>
                    <Text fontSize={16} color={'gray.400'}>PASSWORD</Text>
                    <TextInput value={AuthStore.userSignUp.password} onChangeText={text => AuthStore.setUserPassword(text)}
                               style={styles.signUpTextInput}></TextInput>
                </VStack>
                <VStack space={1}>
                    <Text fontSize={16} color={'gray.400'}>CONFIRM PASSWORD</Text>
                    <TextInput value={confirmPassword} style={styles.signUpTextInput}
                               onChangeText={text => setConfirmPassword(text)}></TextInput>
                </VStack>
            </VStack>
        </Box>
    )
}

const styles = StyleSheet.create({
    signUpTextInput: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,.1)',
        fontSize: 16,
        paddingVertical: 16,
        paddingHorizontal: 10,
        color: 'rgba(255,255,255,.6)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,.6)',
    }
})
export default observer(StepThree)