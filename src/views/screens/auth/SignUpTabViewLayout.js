import {observer} from "mobx-react";
import {Box, HStack, Text} from "native-base";
import {BackButton} from "../../components/BackButton";
import {ActivityIndicator, TouchableOpacity} from "react-native";

const SignUpTabViewLayout = (props) => {

    return (
        <Box flex={1} py={4} bgColor={'black'}>
            <HStack px={0} pr={2} justifyContent={'space-between'}>
                <TouchableOpacity activeOpacity={.8}
                                  style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}
                                  onPress={props.handleBack}>
                    <BackButton color={'white'} size={30}/>
                    <Text color={'white'}>step {props.step} / {props.limit}</Text>
                </TouchableOpacity>
                <Text>{props.title}</Text>
                {props.loading ?
                    <ActivityIndicator color={'white'} size={30}/>
                    :
                    <TouchableOpacity activeOpacity={.8} onPress={props.handleNext}>
                        <Text color={'blue.300'}
                              fontSize={16}>{props.step === 2 ? '' : props.step === 5 ? 'Done' : 'Next'}</Text>
                    </TouchableOpacity>
                }
            </HStack>
            {props.children}
        </Box>
    )
}

export default observer(SignUpTabViewLayout)