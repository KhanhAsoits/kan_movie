import {observer} from "mobx-react";
import {ScrollView} from "native-base/src";
import {Loader} from "../components/Loader";
import {Text} from "native-base";

const ShowingScreen = ({movies}) => {
    return (
        <ScrollView bgColor={'white'} px={3} key={Math.random().toString()} flex={1}>
            <Loader></Loader>
        </ScrollView>
    )
}

export default observer(ShowingScreen)