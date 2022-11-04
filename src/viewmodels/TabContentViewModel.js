import {TabContent} from "../views/components/TabContent";
import {ScrollView} from "native-base/src/index";
import {Box, HStack, Text, View} from "native-base";
import {Dimensions} from "react-native";

export const TabContentViewModel = ({active, items}) => {
    const ScreenWidth = Dimensions.get("window").width
    return (
        <Box flex={1} left={active === 1 ? 0 : - ScreenWidth} flexDir={'row'} bgColor={"blue.500"} width={ScreenWidth * 2}>
            {items.map((item, index) => {
                return (
                    <TabContent key={index.toString()} active={active} id={item.id} content={item}></TabContent>
                )
            })}

        </Box>
    )
}