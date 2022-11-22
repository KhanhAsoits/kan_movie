import {observer} from "mobx-react";
import {Box, HStack, Image, Text, VStack} from "native-base";
import coca from '../../../../assets/static/images/cocacola.png'
import pepsi from '../../../../assets/static/images/pepsi.png'
import seven_up from '../../../../assets/static/images/7_up.png'
import popcorn from '../../../../assets/static/images/popcorn.png'
import {ExtraItem} from "../../components/ExtraItem";
import {useState} from "react";

const OrderExtra = ({}) => {

    const listExtraItems = [
        {title: 'Coca', price: 4, image: coca},
        {title: 'Pepsi', price: 4, image: pepsi},
        {title: '7 up', price: 3, image: seven_up},
        {title: 'Popcorn', price: 5, image: popcorn}
    ]

    const [total, setTotal] = useState(0)
    const [selected, setSelected] = useState([])

    const handleRemove = (item) => {
        let remove_index = -1
        selected.forEach((val, index) => {
            if (val.title === item.title) {
                remove_index = index
            }
        })
        if (remove_index !== -1) {
            let tmp = [...selected]
            tmp.splice(remove_index, 1)
            setSelected(tmp)
        }
    }

    const handleSelected = (item) => {
        if (selected.length === 0) {
            let tmp = []
            tmp.push(item)
            setSelected(tmp)
        }
        let isHas = false
        selected.forEach((val, index) => {
            if (val.title === item.title) {
                isHas = true
            }
        })
        if (isHas === false) {
            let tmp = [...selected]
            tmp.push(item)
            setSelected(tmp)
        }
    }
    return (
        <Box flex={1} px={4}>
            <VStack space={6} justifyContent={'center'} alignItems={'center'}>
                {listExtraItems.map((val, index) => {
                    return (
                        <ExtraItem handleRemove={handleRemove} handleSetSelected={handleSelected} setSelected={setSelected} total={total} setTotal={setTotal} item={val}/>
                    )
                })}
            </VStack>
            <HStack my={2} justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize={14} color={'gray.400'}>{selected.length} SELECTED</Text>
                <Text fontSize={24} color={'red.400'}>${total}</Text>
            </HStack>
        </Box>
    )
}
export default observer(OrderExtra)