import {Box, Text} from "native-base";
import {TouchableOpacity} from "react-native";
import movieStore from "../../models/ShowingMoviesStore";
import connectionStore from "../../models/ConnectionStore";

export const ErrorScreen = ({message}) => {
    const handleReload = () => {
        const bs = async () => {
            await connectionStore.reloadConnection()
        }
        bs()
    }
    return (
        <Box bgColor={'white'} flex={1} justifyContent={"center"} alignItems={"center"}>
            <Text>
                {message}
            </Text>
            <TouchableOpacity onPress={handleReload}>
                <Text color={"blue.400"}>Connected And Reload</Text>
            </TouchableOpacity>
        </Box>
    )
}