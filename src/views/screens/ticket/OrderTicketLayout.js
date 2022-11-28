import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";
import {BackButton} from "../../components/BackButton";
import {Box, HStack, Image, Text, VStack} from "native-base";
import SingleMovieStore from "../../../models/SingleMovieStore";
import bg from "../../../../assets/static/images/movie-preview.png";
import {HelpButton} from "../../components/HelpButton";
import React from "react";
import {observer} from "mobx-react";
import PaypalStore from "../../../models/PaypalStore";
import {ActivityIndicator} from "react-native";
import ThemeStore from "../../../models/ThemeStore";
import TicketStore from "../../../models/TicketStore";

const OrderTicketLayout = (props) => {
    return (
        <Box flex={1} py={ThemeStore.mode === "light" ? 0 : 2} bgColor={ThemeStore.baseProps.themeBg}>
            <HStack width={SCREEN_WIDTH - 30} alignSelf={'center'} my={4} justifyContent={'space-between'}
                    alignItems={'center'}>
                <BackButton size={36} display={props.step !== 0} color={ThemeStore.baseProps.text_24}
                            handleBack={() => {
                                if (!PaypalStore.processing && !PaypalStore.approval_url) {
                                    PaypalStore.setApprovalUrl(null)
                                    props.setStep(c => c - 1 >= 0 ? c - 1 : 0)
                                }
                            }}/>
                {props.isShowDetail ?
                    <HStack space={2} alignSelf={'center'} justifyContent={'center'} alignItems={'center'}>
                        <Image source={SingleMovieStore.movie?.image ? {uri: SingleMovieStore.movie?.image} : bg}
                               alt={'movie thumbnail'} style={{width: 40, height: 40, borderRadius: 6}}/>
                        <VStack space={0}>
                            <Text fontWeight={'500'} fontSize={16} letterSpacing={1.2}
                                  color={ThemeStore.baseProps.text_24}
                                  width={'90%'} height={30}>{SingleMovieStore.movie?.title}</Text>
                            <Text fontWeight={'500'} fontSize={12} letterSpacing={1.1} color={'gray.400'}>
                                {TicketStore.orderTicket.time?.hours} : {TicketStore.orderTicket.time?.minute} - {TicketStore.orderTicket.time?.hours + 2} : {TicketStore.orderTicket.time?.minute} {TicketStore.orderTicket.time.hours > 12 ? 'PM' : 'AM'} In {TicketStore.orderTicket.date?.date?.slice(0, 16)}
                            </Text>
                        </VStack>
                    </HStack> :
                    <Text color={ThemeStore.baseProps.text_24} fontSize={20}>{props.title}</Text>
                }
                {PaypalStore.processing ?
                    <ActivityIndicator size={30}/> :
                    <Text></Text>
                }
            </HStack>
            {props.children}
        </Box>
    )
}
export default observer(OrderTicketLayout)