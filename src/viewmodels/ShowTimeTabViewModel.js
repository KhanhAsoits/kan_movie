import ShowTimeScreen from "../views/screens/movie_detail/ShowTimeScreen";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import SingleMovieStore from "../models/SingleMovieStore";
import {Alert, SafeAreaView} from "react-native";
import ThemeStore from "../models/ThemeStore";
import {Box, Center, Text} from "native-base";
import {SCREEN_WIDTH} from "axelra-react-native-bottom-sheet";

const ShowTimeTabViewModel = ({route, nav, showTime}) => {
    const [localLoader, setLocalLoader] = useState(false)
    const [beforeRemove, setBeforeRemove] = useState(false)
    let [chosenDate, setChoseDate] = useState({})
    let [chosenCinema, setChoseCinema] = useState({})
    let [chosenTime, setChoseTime] = useState({})

    useEffect(() => {

        const sync = async () => {
            await SingleMovieStore.onGetShowTimeData()
        }
        if (SingleMovieStore.showtime.cinemas.length <= 0 && SingleMovieStore.showtime.dates.length <= 0 && SingleMovieStore.active === 3) {
            sync()
        }
    }, [SingleMovieStore.id, SingleMovieStore.active])

    useEffect(() => {
        setChoseDate(SingleMovieStore.showtime.dates[0])
        setChoseCinema(SingleMovieStore.showtime.cinemas[0])
    }, [SingleMovieStore.showtime.dates, SingleMovieStore.showtime.cinemas])


    const handleChoseDate = (id) => {
        setChoseDate(SingleMovieStore.showtime.dates.filter((date) => date.id === id)[0])
    }
    const handleChoseCinema = (id) => {
        setChoseCinema(SingleMovieStore.showtime.cinemas.filter((cinema) => cinema.id === id)[0])
    }

    useEffect(() => {
        const call_sync = async () => {
            setTimeout(async () => {
                setLocalLoader(true)
                await SingleMovieStore.onGetShowTime(chosenCinema?.id, chosenDate?.id)
                setChoseTime({})
                setLocalLoader(false)
            }, 100)
        }
        call_sync()
    }, [chosenCinema, chosenDate])

    const handleValidBeforeGetTicket = () => {
        let isValid = true
        let err = ''
        if (Object.keys(chosenTime).length <= 0) {
            isValid = false
            err = 'You must chose a time.'
        }
        if (!isValid) {
            Alert.alert('Warning', err)
        }
        return isValid
    }

    return (
        <>
            {
                showTime ?
                    <ShowTimeScreen setBeforeRemove={setBeforeRemove} localLoader={localLoader}
                                    beforeRemove={beforeRemove}
                                    chosenDate={chosenDate}
                                    chosenCinema={chosenCinema} chosenTime={chosenTime}
                                    handleChoseDate={handleChoseDate}
                                    handleValidBeforeGetTicket={handleValidBeforeGetTicket}
                                    handleChoseCinema={handleChoseCinema} setChoseTime={setChoseTime}
                                    nav={nav}></ShowTimeScreen> :
                    <Box w={SCREEN_WIDTH} justifyContent={'center'} alignItems={'center'}>
                        <Text color={ThemeStore.baseProps.text_black_06} fontSize={18}>Not show now.</Text>
                    </Box>
            }
        </>)
}

export default observer(ShowTimeTabViewModel)
