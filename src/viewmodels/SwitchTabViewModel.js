import {useState} from "react";
import {SwitchTab} from "../views/components/SwitchTab";

export const SwitchTabViewModel = ({links}) => {
    const [active, setActive] = useState(links[0]?.id)

    const handleSwitch = (id) => {
        console.log(id)
        setActive(id)
    }
    return (
        <SwitchTab links={links} active={active} handleSwitch={handleSwitch}></SwitchTab>
    )

}