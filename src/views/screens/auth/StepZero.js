import {Box, Image, Text} from "native-base";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../core/helper";
import bg from "../../../../assets/static/images/reg_bg.png";
import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const StepZero = ({setStep}) => {
    return (
        <Box flex={1} style={{width: SCREEN_WIDTH}}
             justifyContent={'flex-start'} alignItems={'center'}>
            <Box mt={8} mb={4} pr={12}>
                <Image source={bg} alt={'bg'} resizeMode={'contain'}
                       style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 2}}/>
            </Box>
            <Text color={'white'} fontSize={30} mx={4} mb={4} fontWeight={'800'}>Unlimited movies
                reviews,Tickets,
                and
                more. </Text>
            <Text color={'white'} fontSize={14} mx={4} fontWeight={'500'}>Watch anywhere. Cancel
                anytime.</Text>
            <TouchableOpacity
                onPress={() => {
                    setStep(c => c + 1)
                }}
                style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    marginVertical: 16,
                    borderRadius: 50
                }}>
                <Ionicons name={'arrow-forward'} color={'black'} size={20}/>
            </TouchableOpacity>
        </Box>
    )
}