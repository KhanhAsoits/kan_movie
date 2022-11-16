import {SCREEN_WIDTH} from "../../core/helper";
import {HStack} from "native-base";

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
                        alignItems={'center'} my={2} style={{backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 6}}>
                </HStack>
            )
        })
    )

}