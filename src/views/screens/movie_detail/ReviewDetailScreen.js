import {Box, HStack, ScrollView, Text, VStack} from "native-base";
import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {CastGenerator} from "../../components/CastGenerator";
import {CastLoader} from "../../components/CastLoader";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {useNavigation} from "@react-navigation/native";

export const ReviewDetailScreen = ({route, review}) => {
    const nav = useNavigation()
    const handleBack = () => {
        nav.goBack()
    }
    return (
        <NativeBaseProvider>
            <HStack justifyContent={'space-between'} alignItems={'center'} flex={.1} mt={8} mx={2}>
                <TouchableOpacity activeOpacity={.6} onPress={handleBack}>
                    <Ionicons name={'chevron-back-outline'} color={'black'} size={30}></Ionicons>
                </TouchableOpacity>
                <Text textAlign={'center'} fontSize={20}>Review Detail</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <Ionicons name={'help-circle-outline'} color={'black'} size={30}></Ionicons>
                </TouchableOpacity>
            </HStack>
        </NativeBaseProvider>
    )
}