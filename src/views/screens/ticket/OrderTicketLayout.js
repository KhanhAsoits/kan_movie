import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";
import {BackButton} from "../../components/BackButton";
import {HStack, Image, Text, VStack} from "native-base";
import SingleMovieStore from "../../../models/SingleMovieStore";
import bg from "../../../../assets/static/images/movie-preview.png";
import {HelpButton} from "../../components/HelpButton";
import React from "react";
import {observer} from "mobx-react";

const OrderTicketLayout = (props) => {
    return (
        <>
            <HStack width={SCREEN_WIDTH - 30} alignSelf={'center'} my={4} justifyContent={'space-between'}
                    alignItems={'center'}>
                <BackButton size={36} color={'black'} handleBack={() => {
                }}/>
                <HStack space={2} justifyContent={'center'} alignItems={'center'}>
                    <Image source={SingleMovieStore.movie?.image ? {uri: SingleMovieStore.movie?.image} : bg}
                           alt={'movie thumbnail'} style={{width: 40, height: 40, borderRadius: 6}}/>
                    <VStack space={0}>
                        <Text fontWeight={'500'} fontSize={16} letterSpacing={1.2}
                              color={'black'}>{SingleMovieStore.movie?.title}</Text>
                        <Text fontWeight={'500'} fontSize={12} letterSpacing={1.1} color={'gray.400'}>8:30 - 10:00 AM in
                            24 May, 2019</Text>
                    </VStack>
                </HStack>
                <HelpButton size={36} color={'black'} message={'Order Seats'}/>
            </HStack>
            {props.children}
        </>
    )
}
export default observer(OrderTicketLayout)