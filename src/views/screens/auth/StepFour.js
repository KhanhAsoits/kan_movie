import {Box, Text, VStack} from "native-base";
import {observer} from "mobx-react";
import {StyleSheet, TextInput} from "react-native";
import AuthStore from "../../../models/AuthStore";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const StepFour = () => {
    const handleSetTime = (event, date) => {
        const {type, nativeEvent: {timestamp}} = event
        AuthStore.setTime(timestamp)
        AuthStore.setUserSignUpBirthDay(new Date(timestamp))
    }
    return (
        <Box flex={1} px={4}>
            <VStack space={8}>
                <Text color={'white'} fontSize={30} fontWeight={'600'} letterSpacing={1.5} textAlign={'center'}>One more
                    Step.</Text>
                <VStack space={6}>
                    <VStack space={2}>
                        <Text fontSize={14} color={'gray.400'}>USERNAME</Text>
                        <TextInput value={AuthStore.userSignUp.username}
                                   onChangeText={text => AuthStore.setUserSignUpName(text)}
                                   style={styles.signUpTextInput}></TextInput>
                    </VStack>
                    <VStack space={2}>
                        <Text fontSize={14} color={'gray.400'}>PHONE</Text>
                        <TextInput value={AuthStore.userSignUp.phone} keyboardType={"number-pad"} maxLength={10}
                                   onChangeText={text => AuthStore.setPhone(text)}
                                   style={styles.signUpTextInput}></TextInput>
                    </VStack>
                    <VStack mt={6}>
                        <Text fontSize={14} color={'gray.400'} textAlign={'center'}>WHAT YOUR BIRTHDAY?</Text>

                        <RNDateTimePicker onChange={handleSetTime} value={new Date(new Date().getFullYear() - 10, 1, 0)}
                                          textColor={'white'}
                                          display={'spinner'}
                                          style={{width: '100%', height: 200}}
                        />
                    </VStack>

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
export default observer(StepFour)