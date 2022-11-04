import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Text} from "native-base/src/index";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useState} from "react";
import {TouchableOpacity, TextInput, StyleSheet} from "react-native";

export const CustomHeader = ({title, route, isSearching, toggleSearching}) => {
    return (
        <NativeBaseProvider>
            <Box height={88} bgColor={"white"} shadow={3}>
                <Box style={{height: 88}} justifyContent={"space-between"}
                     flexDir={'row'}
                     alignItems={'center'} pt={8} px={3} shadow={1}>
                    {isSearching ?
                        <TextInput autoFocus={true} style={styles.inputSearch}/>
                        :
                        <Text color={'gray.600'} fontSize={24} fontWeight={"500"}>{title}</Text>
                    }
                    <TouchableOpacity onPress={toggleSearching}>
                        <Ionicons name={isSearching ? 'close' : 'search'} color={'gray.600'}
                                  size={isSearching ? 30 : 26}/>
                    </TouchableOpacity>
                </Box>
            </Box>
        </NativeBaseProvider>
    )
}

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
