import {observer} from "mobx-react";
import {Box, Text} from "native-base";
import {TextInput} from "react-native";
import AuthStore from "../../../models/AuthStore";

const StepOne = () => {
    const SignUpTextInput = () => {
        return (
            <TextInput onChangeText={text => AuthStore.setUserEmail(text)} placeholderTextColor={'rgba(255,255,255,.6)'}
                       placeholder={'E-MAIL'} style={{
                marginTop: 20,
                width: '100%',
                paddingVertical: 18,
                borderColor: 'rgba(255,255,255,.6)',
                borderWidth: 1,
                backgroundColor: "rgba(255,255,255,.1)",
                borderRadius: 12,
                fontSize: 14,
                color: 'rgba(255,255,255,.6)',
                paddingHorizontal: 10

            }}/>
        )
    }

    return (
        <Box flex={1} px={4}>
            <Text color={'white'} fontSize={80} letterSpacing={3} fontWeight={'600'}>Let you</Text>
            <Text color={'white'} fontSize={50} fontWeight={'600'}>Sign up.</Text>
            <Text color={'white'} fontSize={26} fontWeight={'600'}>First. Fill your email here.</Text>
            <SignUpTextInput/>
        </Box>
    )
}

export default observer(StepOne)