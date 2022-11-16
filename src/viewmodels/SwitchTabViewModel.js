import {useState} from "react";
import {SwitchTab} from "../views/components/SwitchTab";

export const SwitchTabViewModel = ({links,active,handleSwitch,cStyle}) => {

    return (
        <SwitchTab links={links} active={active} handleSwitch={handleSwitch} cStyle={cStyle}></SwitchTab>
    )

}