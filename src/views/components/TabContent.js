import {ScrollView} from "native-base/src/index";
import {Box} from "native-base";

export const TabContent = ({content, height}) => {
    return (
        <>
            {height ?
                <Box height={height}>
                    {content.content}
                </Box>
                :
                content.content
            }
        </>
    )
}