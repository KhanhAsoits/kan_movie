import {Box, Text} from "native-base/src/index";
import ToggleBtn from "./ToggleBtn";
import ThemeStore from "../../models/ThemeStore";
import {observer} from "mobx-react";

const SwitchTab = ({links, active, handleSwitch, cStyle}) => {

    return (
        <Box paddingTop={22} paddingBottom={4} bgColor={ThemeStore.baseProps.themeBg}>
            <Box justifyContent={"space-between"}
                 alignItems={"center"}
                 flexDir={'row'}
                 borderWidth={1}
                 borderColor={ThemeStore.baseProps.text_black_06}
                 borderRadius={50}
                 mx={3}>
                {
                    links.map((item, index) => {
                        const isActive = active === item?.id
                        return (
                            <ToggleBtn cStyle={cStyle} key={index.toString()} item={item} active={isActive}
                                       handleSwitch={handleSwitch}></ToggleBtn>
                        )
                    })}
            </Box>
        </Box>
    )
}

export default observer(SwitchTab)

