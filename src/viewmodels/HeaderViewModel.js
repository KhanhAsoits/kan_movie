import {useState} from "react";
import {CustomHeader} from "../views/components/CustomHeader";

export const HeaderViewModel = ({title, route, nav}) => {
    const [isSearching, setIsSearching] = useState(false)
    const handleFocus = () => {
        setIsSearching(e => !e)
    }
    return (
        <CustomHeader title={title} isSearching={isSearching} setSearching={setIsSearching}
                      toggleSearching={handleFocus}></CustomHeader>
    )
}