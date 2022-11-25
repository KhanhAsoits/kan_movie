import {ScrollView} from "native-base/src/index";
import {Box} from "native-base";
import ThemeStore from "../../models/ThemeStore";

export const TabContent = ({content, height}) => {
    return (
        <>
            {height ?
                <Box bgColor={ThemeStore.baseProps.themeBg} height={height}>
                    {content.content}
                </Box>
                :
                content.content
            }
        </>
    )
}