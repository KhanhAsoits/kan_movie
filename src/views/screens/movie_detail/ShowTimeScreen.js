import {Box, HStack, ScrollView, Text, VStack} from "native-base";
import {SCREEN_WIDTH} from "../../../core/helper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from "react-native";
import SelectBoxGenerator from "../../components/SelectBoxGenerator";
import SingleMovieStore from "../../../models/SingleMovieStore";
import {observer} from "mobx-react";
import Loader from "../../components/Loader";


const ShowTimeScreen = ({
                            setBeforeRemove,
                            localLoader,
                            beforeRemove,
                            chosenCinema,
                            handleValidBeforeGetTicket,
                            chosenDate,
                            handleChoseDate,
                            handleChoseCinema,
                            setChoseTime,
                            chosenTime,
                            nav
                        }) => {

    return (
        <>
            <ScrollView style={{width: SCREEN_WIDTH}} bgColor={'white'} px={4} showsVerticalScrollIndicator={false}>
                {SingleMovieStore.showTimeFetching ? <Loader height={50}></Loader> :
                    <Box my={2}>
                        {        console.log('date', chosenDate)
                        }
                        <VStack space={3}>
                            <Box>
                                {/* chose date*/}
                                <HStack justifyContent={'space-between'} alignItems={'center'}>
                                    <Text fontSize={20} color={'black'} fontWeight={'500'}>Chose Date</Text>
                                    <TouchableOpacity>
                                        <Ionicons name={'calendar-outline'} size={24} color={'#23C581'}/>
                                    </TouchableOpacity>
                                </HStack>
                                <ScrollView horizontal={true} my={3} showsHorizontalScrollIndicator={false}>
                                    <SelectBoxGenerator handleSelect={handleChoseDate}
                                                        list={SingleMovieStore.showtime.dates}></SelectBoxGenerator>
                                </ScrollView>
                                {/*end chose date*/}
                            </Box>
                            <Box>
                                {/*chose cinema*/}
                                <HStack justifyContent={'space-between'} alignItems={'center'}>
                                    <Text fontSize={20} color={'black'} fontWeight={'500'}>Chose Cinema</Text>
                                </HStack>
                                <ScrollView horizontal={true} my={3} showsHorizontalScrollIndicator={false}>
                                    <SelectBoxGenerator cStyle={styles.cinemaBox} handleSelect={handleChoseCinema}
                                                        list={SingleMovieStore.showtime.cinemas}></SelectBoxGenerator>
                                </ScrollView>
                                {/*    end chose cinema */}
                            </Box>
                            {localLoader ?
                                <Loader height={50}></Loader>
                                :
                                <>
                                    <Box>
                                        <Text fontSize={20} color={'gray.400'} fontWeight={'500'}>2D</Text>
                                        <HStack my={3} space={5} flexWrap={'wrap'} justifyContent={'flex-start'}
                                                alignItems={'center'}>
                                            {SingleMovieStore.showtime.times.filter((time) => time.type === "2D").map((time, index) => {
                                                return (
                                                    <TouchableOpacity activeOpacity={.9} onPress={() => {
                                                        setChoseTime(time)
                                                    }}>
                                                        <Box justifyContent={'center'} my={2} alignItems={'center'}
                                                             bgColor={chosenTime?.id === time?.id ? 'red.500' : 'indigo.50'}
                                                             width={SCREEN_WIDTH / 4} p={3} borderRadius={4}>
                                                            <Text fontSize={16}
                                                                  color={chosenTime?.id === time?.id ? 'white' : 'black'}
                                                                  fontWeight={'500'}>{time?.hours}:{time?.minute} {time?.hours > 12 ? 'PM' : 'AM'}</Text>
                                                        </Box>
                                                    </TouchableOpacity>

                                                )
                                            })}
                                        </HStack>
                                    </Box>
                                    <Box>
                                        <Text fontSize={20} color={'gray.400'} fontWeight={'500'}>IMAX</Text>
                                        <HStack my={3} justifyContent={'flex-start'} alignItems={'center'}
                                                flexWrap={'wrap'}
                                                space={5}>
                                            {SingleMovieStore.showtime.times.filter((time) => time.type === "Max").map((time, index) => {
                                                return (
                                                    <TouchableOpacity activeOpacity={.9} onPress={() => {
                                                        setChoseTime(time)
                                                    }}>
                                                        <Box justifyContent={'center'} my={2} alignItems={'center'}
                                                             bgColor={chosenTime?.id === time?.id ? 'red.500' : 'indigo.50'}
                                                             width={SCREEN_WIDTH / 4} p={3} borderRadius={4}>
                                                            <Text fontSize={16}
                                                                  color={chosenTime?.id === time?.id ? 'white' : 'black'}
                                                                  fontWeight={'500'}>{time?.hours}:{time?.minute} {time?.hours > 12 ? 'PM' : 'AM'}</Text>
                                                        </Box>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </HStack>
                                    </Box>
                                </>
                            }
                        </VStack>
                    </Box>
                }
            </ScrollView>
            <TouchableOpacity activeOpacity={.9} onPress={() => {
                if (handleValidBeforeGetTicket() && !beforeRemove) {
                    setBeforeRemove(true)
                    setTimeout(() => {
                        nav.navigate('order_ticket', {date: chosenDate, cinema: chosenCinema, time: chosenTime})
                        setBeforeRemove(false)
                    }, 1000)
                }
            }} style={{backgroundColor: 'red', marginHorizontal: 16, paddingVertical: 10, borderRadius: 8}}>

                {beforeRemove ?
                    <ActivityIndicator color={'white'} size={20}/>
                    :
                    <Text
                        textAlign={'center'} color={'white'} fontSize={20} fontWeight={'500'}>Get
                        A Ticket</Text>
                }
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    cinemaBox: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default observer(ShowTimeScreen)