import {SelectBox} from "./SelectBox";
import {HStack} from "native-base";
import {useState} from "react";
import {observer} from "mobx-react";

const SelectBoxGenerator = ({list, handleSelect, cStyle = {}}) => {
    const [active, setActive] = useState(list[0]?.id)

    return (
        <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
            {list.map((item, index) => {
                return <SelectBox cStyle={cStyle} active={active} setActive={setActive} handleSelect={handleSelect}
                                  item={item}/>
            })}
        </HStack>
    )
}
export default observer(SelectBoxGenerator)