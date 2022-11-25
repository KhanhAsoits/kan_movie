import SwitchTab from "../views/components/SwitchTab";
import {observer} from "mobx-react";

const SwitchTabViewModel = ({links,active,handleSwitch,cStyle}) => {

    return (
        <SwitchTab links={links} active={active} handleSwitch={handleSwitch} cStyle={cStyle}></SwitchTab>
    )

}
export default observer(SwitchTabViewModel)