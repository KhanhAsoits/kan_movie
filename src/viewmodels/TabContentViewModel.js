import {TabContent} from "../views/components/TabContent";
import {ScrollView} from "native-base/src/index";
import {Box, HStack, Text, View} from "native-base";
import {Dimensions} from "react-native";

export const TabContentViewModel = ({active, items}) => {
    const ScreenWidth = Dimensions.get("window").width
    let left = 0;
    if (active <= 1) {
        left = 0
    } else {
        left = -ScreenWidth * (active - 1)
    }
    return (
        <Box flex={1} left={left} flexDir={'row'} bgColor={"white"}
             width={ScreenWidth * items.length}>
            {items.map((item, index) => {
                return (
                    <TabContent key={index.toString()} active={active} id={item.id} content={item}></TabContent>
                )
            })}

        </Box>
    )
}