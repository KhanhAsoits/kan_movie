import {TabContent} from "../views/components/TabContent";
import {ScrollView} from "native-base/src/index";
import {Box, Text} from "native-base";

export const TabContentViewModel = ({active, items}) => {
    return (
        <>
            {items.map((item, index) => {
                return (
                    <TabContent key={index.toString()} active={active} id={item.id} content={item}></TabContent>
                )
            })}
        </>
    )
}