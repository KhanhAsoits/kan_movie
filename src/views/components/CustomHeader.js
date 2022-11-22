import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Text} from "native-base/src/index";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useState} from "react";
import {TouchableOpacity, TextInput, StyleSheet} from "react-native";
import HomeStore from "../../models/HomeStore";
import {observer} from "mobx-react";

const CustomHeader = ({title, route}) => {
    return (
        <Box height={88} bgColor={"white"}>
            <Box style={{height: 88}} justifyContent={"space-between"}
                 flexDir={'row'}
                 alignItems={'center'} pt={8} px={3} shadow={1}>
                {HomeStore.searching ?
                    <TextInput autoFocus={true} style={styles.inputSearch}/>
                    :
                    <Text color={'gray.600'} fontSize={30} fontWeight={"500"}>{title}</Text>
                }
                <TouchableOpacity onPress={() => {
                    HomeStore.setSearching(!HomeStore.searching)
                }}>
                    <Ionicons name={HomeStore.searching ? 'close' : 'search'} color={'gray.600'}
                              size={HomeStore.searching ? 30 : 26}/>
                </TouchableOpacity>
            </Box>
        </Box>
    )
}
export default observer(CustomHeader)
const styles = StyleSheet.create({
    inputSearch: {
        paddingLeft: 10,
        color: 'rgba(0,0,0,0.5)',
        fontSize: 16,
        paddingVertical: 5,
        flex: 1,
        borderRadius: 16
    },
})
