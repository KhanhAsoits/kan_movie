import {TabContent} from "../views/components/TabContent";
import {Box, HStack, Text, View} from "native-base";
import {Dimensions} from "react-native";
import ThemeStore from "../models/ThemeStore";

export const TabContentViewModel = ({active, items, height}) => {
    const ScreenWidth = Dimensions.get("window").width
    let left = 0;
    if (active <= 1) {
        left = 0
    } else {
        left = -ScreenWidth * (active - 1)
    }
    return (
        <Box flex={1} left={left} flexDir={'row'} bgColor={ThemeStore.baseProps.themeBg}
             width={ScreenWidth * items.length}>
            {items.map((item, index) => {
                return (
                    <TabContent height={height} key={index.toString()} active={active} id={item.id}
                                content={item}></TabContent>
                )
            })}

        </Box>
    )
}