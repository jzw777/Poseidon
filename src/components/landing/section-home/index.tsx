import React from 'react';

import { motion, useScroll, useTransform } from "framer-motion";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";

export const SectionHome: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });



    const cardOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const { sm, md, lg, xl } = useTWBreakpoints();

    // 一定要相信，这些生活的点滴会在你未来的某一天产生联系。一定要相信：勇气目标生命缘起……一切都不会令你失望，只会增加你的与众不同。
    return (
        <motion.div
            ref={ref}
            className="h-auto px-4 -mt-px bg-white lg:h-screen lg:px-0 bg-star"
        >
            <motion.div className="relative top-0 left-0 flex flex-col items-center justify-end w-screen h-auto max-w-full gap-24 pt-16 pb-6 overflow-x-hidden lg:pt-16 lg:pb-12 lg:h-screen lg:snap-start lg:sticky lg:gap-0">
                <div className="flex-1 flex flex-col-reverse gap-4 lg:gap-0 lg:flex-row mx-auto max-w-[900px] w-full h-full items-center justify-center">
                    <div className="flex-1">
                        <div className="font-montserrat text-[#1890FF] text-[26px] leading-[26px] sm:text-[28px] sm:leading-[28px] lg:text-[30px] lg:leading-[36px] mb-0">
                            <div className="font-medium">{" "}你憧憬未来的时候，不会去想着把所有的事联系起来;</div>

                            <div className="font-medium">
                                <span className="font-extrabold tracking-tight">
                                    只有在回忆过去的时候，
                                </span>
                                才会将这点点滴滴联系在一起。
                            </div>
                            <div className="font-medium">
                                <span className="font-extrabold">一定要相信，</span>{" "}
                                这些生活的点滴会在你未来的某一天产生联系。
                            </div>
                            {/*<div className="font-medium">一定要相信：</div>*/}
                            <div >
                                一定要相信：
                                <span className="font-extrabold">勇气、</span>
                                <span className="font-extrabold">目标、</span>
                                <span className="font-extrabold">生命、</span>
                                <span className="font-extrabold">缘起……</span>

                            </div>
                            <div>
                                {" "} 一切都不会令你失望，
                                <span className="font-extrabold tracking-tight">
                                    只会增加你的与众不同。
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 mt-4 lg:mt-16">
                            <a
                                href="docs/tutorial-basics"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shadow-startTiles  appearance-none flex items-center justify-center no-underline font-bold font-montserrat text-sm h-8 w-44 text-white text-center bg-gradient-to-l from-[#1890FF] to-[#47EBF5] border-0 rounded-[4px] cursor-pointer"
                            >
                                与君{" "}
                                <span className="mx-1 font-normal">🧸</span>
                                共勉 →
                            </a>

                        </div>
                    </div>
                    <div className="flex flex-1 w-full lg:w-auto">
                        <motion.div
                            className="relative flex flex-col items-center justify-end flex-1 w-full lg:w-auto lg:items-end"
                            whileInView={
                                !lg && md ? { scale: [0, 1] } : undefined
                            }
                            viewport={{
                                margin: "50px",
                            }}
                        >
                            <div className="w-full max-w-[260px] lg:max-w-[375px] absolute top-[-32px]">
                                <motion.img
                                    src="https://test.preview.qingxinzhimei.com/2023/01/19/ERP202301190000009762.jpg"
                                    style={
                                        lg
                                            ? {
                                                  opacity: cardOpacity,
                                              }
                                            : {}
                                    }
                                    animate={{
                                        translateY: ["20px", "0px"],
                                        rotate: ["-3deg", "0deg"],
                                        ...(!lg ? { opacity: [1, 1] } : {}),
                                    }}
                                    transition={{
                                        duration: 5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                    }}
                                />
                            </div>
                            <div className="w-full max-w-screen md:max-w-[350px] min-h-[200px] md:min-h-[330px] lg:max-w-[375px] flex justify-center items-end lg:min-h-[352px]">
                                <motion.div
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        maxWidth: "200px",
                                        height: "200px",
                                        borderRadius: "999px",
                                        rotateX: "88deg",
                                        background: "#2A2A42",
                                        filter: "blur(50px)",
                                    }}
                                    animate={{
                                        opacity: [0.75, 0.2],
                                        width: ["200px", "300px"],
                                        height: ["200px", "300px"],
                                        bottom: ["-80px", "-130px"],
                                    }}
                                    transition={{
                                        duration: 5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
