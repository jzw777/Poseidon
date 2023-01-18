import * as React from "react";
import { SVGProps } from "react";
const SvgKubeSphere = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg"
         version="1.1"
         viewBox="-7 0 90 90"
         {...props}
    >

        <g id="KubeSphere商标®.ai" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
            <polygon id="Fill-1" fill="#00A971" points="65 71.647 46 60.647 46 82.647"/>
            <polygon id="Fill-2" fill="#00A971" points="65 19.647 46 8.647 46 30.647"/>
            <polygon id="Fill-3" fill="#00A971"
                     points="19.678 45.647 37 35.556 37 3.647 1 24.62 1 66.675 37 87.647 37 55.739"/>
            <polygon id="Fill-4" fill="#00A971" points="37 45.647 74 66.647 74 24.647"/>
        </g>
    </svg>
);

export default SvgKubeSphere;
