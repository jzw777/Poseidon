import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useReward } from "react-rewards";

const LoveIcon = (props) => (
    <svg
        width={20}
        height={18}
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.435 1.464a5 5 0 0 0-7.071 0L9.95 2.88 8.536 1.465a5 5 0 1 0-7.072 7.07l8.486 8.486 7.07-7.071 1.415-1.414a5 5 0 0 0 0-7.072Z"
            fill="#FF1818"
        />
    </svg>
);
const TwitterIcon = (props) => (
    <svg
        width={24}
        height={20}
        viewBox="0 0 24 20"
        fill="#9696B4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 2.368a9.618 9.618 0 0 1-2.827.794A5.038 5.038 0 0 0 23.338.37a9.698 9.698 0 0 1-3.129 1.223A4.856 4.856 0 0 0 16.616 0c-2.718 0-4.922 2.26-4.922 5.049 0 .396.042.78.126 1.15C7.728 5.988 4.1 3.979 1.67.922a5.14 5.14 0 0 0-.666 2.54c0 1.751.87 3.297 2.19 4.203a4.834 4.834 0 0 1-2.23-.63v.062c0 2.447 1.697 4.488 3.951 4.95a4.693 4.693 0 0 1-1.297.178c-.317 0-.627-.03-.927-.09.626 2.006 2.444 3.466 4.599 3.505A9.722 9.722 0 0 1 0 17.733 13.708 13.708 0 0 0 7.548 20c9.058 0 14.01-7.692 14.01-14.365 0-.22-.005-.439-.013-.654.962-.712 1.797-1.6 2.455-2.613Z"
        />
    </svg>
);

const GithubIcon = (props) => (
    <svg
        width={22}
        height={22}
        viewBox="0 0 22 22"
        fill="#9696B4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.053 0A10.904 10.904 0 0 0 3.89 2.685 11.34 11.34 0 0 0 .142 9.472a11.48 11.48 0 0 0 1.456 7.65 11.087 11.087 0 0 0 5.964 4.86c.556.103.752-.25.752-.547v-1.918C5.23 20.202 4.58 18 4.58 18a3.012 3.012 0 0 0-1.227-1.655c-.997-.692.081-.692.081-.692.35.05.683.18.975.382.293.202.536.469.713.78.15.278.352.523.595.721a2.312 2.312 0 0 0 2.618.221c.042-.57.283-1.105.678-1.509-2.454-.284-5.03-1.253-5.03-5.539a4.415 4.415 0 0 1 1.132-3.025A4.194 4.194 0 0 1 5.224 4.7s.928-.305 3.036 1.156c1.81-.508 3.72-.508 5.531 0 2.108-1.46 3.03-1.156 3.03-1.156.406.936.455 1.993.135 2.963a4.415 4.415 0 0 1 1.132 3.026c0 4.334-2.582 5.282-5.043 5.538.264.271.468.597.598.955.13.358.182.741.155 1.122V21.4c0 .367.196.65.759.54a11.093 11.093 0 0 0 5.88-4.878 11.481 11.481 0 0 0 1.419-7.6 11.34 11.34 0 0 0-3.71-6.746A10.907 10.907 0 0 0 11.053 0Z"
        />
    </svg>
);

const RedditIcon = (props) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 35 31"
        fill="#9696B4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M34.417 15.935a3.67 3.67 0 0 0-6.213-2.64 17.968 17.968 0 0 0-9.814-3.113l1.672-7.863 5.46 1.162a2.621 2.621 0 1 0 .27-1.283L19.687.9a.655.655 0 0 0-.776.504l-1.867 8.775a18.022 18.022 0 0 0-9.96 3.11 3.669 3.669 0 1 0-4.038 5.992 7.237 7.237 0 0 0-.082 1.11c0 5.646 6.567 10.222 14.678 10.222 8.11 0 14.678-4.576 14.678-10.222 0-.37-.03-.738-.086-1.103a3.67 3.67 0 0 0 2.182-3.353ZM9.256 18.556a2.621 2.621 0 1 1 5.242 0 2.621 2.621 0 0 1-5.242 0Zm14.614 6.926c-1.788 1.782-5.216 1.926-6.224 1.926s-4.437-.14-6.223-1.926a.68.68 0 1 1 .961-.96c1.127 1.127 3.54 1.527 5.262 1.527 1.723 0 4.135-.4 5.265-1.528a.68.68 0 1 1 .96.961Zm-.46-4.305a2.621 2.621 0 1 1 0-5.242 2.621 2.621 0 0 1 0 5.242Z" />
    </svg>
);

const WeChatIcon = (props) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="#9696B4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
    </svg>
);



export default function FooterLayout({
    links,
    logo,
}) {
    const { siteConfig } = useDocusaurusContext();
    const { customFields } = siteConfig;
    const { footerDescription } = customFields;
    const { reward: leftReward, isAnimating: leftIsAnimating } = useReward(
        "leftReward",
        "emoji",
        {
            emoji: ["🔥", "⭐", "❤️"],
            angle: 45,
            elementCount: 80,
            startVelocity: 45,
            decay: 0.95,
            lifetime: 150,
        },
    );
    const { reward: rightReward, isAnimating: rightIsAnimating } = useReward(
        "rightReward",
        "emoji",
        {
            emoji: ["💙", "💜", "🧡", "💖"],
            angle: 135,
            elementCount: 80,
            startVelocity: 45,
            decay: 0.95,
            lifetime: 150,
        },
    );

    return (
        <footer className="refine-footer px-4 pb-24 pt-7 md:px-6 lg:pt-10 lg:pb-24">
            <div className="mx-auto flex max-w-6xl flex-col gap-5">
                <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-20">
                    {logo && (
                        <div className="w-full max-w-full flex-shrink-0 lg:max-w-[280px]">
                            {logo}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-20">
                    <div
                        className="font-montserrat w-full max-w-full flex-shrink-0 text-xs tracking-wide text-[#9696B4] lg:max-w-[280px]"
                        dangerouslySetInnerHTML={{ __html: footerDescription }}
                    />
                    <div className="flex-1">{links}</div>
                </div>
                <div className="h-2.5 w-full border-0 border-b-2 border-solid border-b-[#9696B4]" />
                <div className="flex flex-col-reverse gap-6 lg:flex-row lg:gap-0">
                    <div className="flex-1">
                        <div className="font-montserrat flex items-center justify-center text-[11px] leading-[12px] text-[#9696B4] sm:text-xs lg:justify-start">
                            Copyright © {new Date().getFullYear()}, Mill Jiang from Beijing
                            to wherever you&apos;re with{" "},Built with Docusaurus.
                            <LoveIcon
                                className="ml-2"
                                onClick={() => {
                                    leftReward();
                                    rightReward();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <span
                className="fixed -left-10 bottom-[20vh] z-10 "
                id="leftReward"
            />
            <span
                className="fixed -right-10 bottom-[20vh] z-10 "
                id="rightReward"
            />
        </footer>
    );
}
