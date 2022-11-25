import {SCREEN_WIDTH} from "../../core/helper";
import {HStack} from "native-base";
import ThemeStore from "../../models/ThemeStore";

export const CastLoader = ({count}) => {

    const cns = [];
    for (let i = 0; i < count; i++) {
        cns.push(i)
    }
    return (
        cns.map((val, index) => {
            return (
                <HStack width={SCREEN_WIDTH - 30} alignSelf={'center'} key={index.toString()}
                        height={10}
                        flexDir={'row'}
                        justifyContent={'flex-start'} space={16}
                        alignItems={'center'} my={2} style={{backgroundColor: ThemeStore.baseProps.text_black_02, borderRadius: 6}}>
                </HStack>
            )
        })
    )

}