import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={330}
            height={32}
            viewBox="0 0 330 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                opacity={0.1}
                d="M3 28.594c82-34.624 243-33.624 324 0"
                stroke="#2C3F5B"
                strokeWidth={6}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default SvgComponent
