import {ScrollView} from "native-base/src/index";

export const TabContent = ({active, id, content}) => {
    return (
        <>
            {active === id && content.content}

        </>
    )
}