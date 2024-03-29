import React from "react";
import {useThemeConfig} from "@docusaurus/theme-common";
import {
    splitNavbarItems,
    useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarSearch from "@theme/Navbar/Search";
import Link from "@docusaurus/Link";
import {Popover, Transition} from "@headlessui/react";
import {useLocation} from "@docusaurus/router";
import {ChevronDownIcon} from "../../../assets/popover-icons";
import {POPOVERMENUS} from "../../../assets/nav-menu";

import styles from "./styles.module.css";

function useNavbarItems() {
    return useThemeConfig().navbar.items;
}

function NavbarItems({items}) {
    return (
        <>
            {items.map((item, i) => (
                <NavbarItem
                    {...item}
                    className={`text-[#2A2A42] hover:text-[#2a2a42] hover:no-underline hoverline-link ${item.className} p-0 with-hoverline`}
                    key={i}
                />
            ))}
        </>
    );
}

function NavbarContentLayout({left, right}) {
    return (
        <div className="navbar__inner">
            <div className="navbar__items flex gap-0 lg:gap-3 xl:gap-6 font-montserrat font-semibold">
                {left}
            </div>
            <div className="navbar__items navbar__items--right flex gap-3">
                {right}
            </div>
        </div>
    );
}
const PopoverItem = ({label, description, to, icon}) => {
    const Icon = icon;

    return (
        <Link
            to={to}
            className="flex items-center gap-4 no-underline p-4 hover:bg-[#eeeef0] transition rounded-lg hover:shadow-menuItem"
        >
            <Icon
                className={`${label === "Documents" ? "mx-1" : ""} flex-shrink-0`}
            />
            <div className="flex flex-col">
                <span className="text-[#242436] font-semibold text-sm transition">
                    {label}
                </span>
                <span className="text-[#565662] text-xs font-medium transition">
                    {description}
                </span>
            </div>
        </Link>
    );
};

const PopoverMenu = ({label, imageLink, imageURL, children}) => {
    const [isShowing, setIsShowing] = React.useState(false);
    const timeoutRef = React.createRef();
    const timeoutEnterRef = React.createRef();
    const location = useLocation();

    React.useEffect(() => {
        setIsShowing(false);
    }, [location]);

    return (
        <Popover
            className="relative flex items-center -my-2.5 h-[calc(100%+20px)]"
            onMouseEnter={() => {
                timeoutEnterRef.current = setTimeout(
                    () => setIsShowing(true),
                    210,
                );
                clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => setIsShowing(false), 210);
                clearTimeout(timeoutEnterRef.current);
            }}
        >
            <Popover.Button as='div'>
                <a className="navbar__item navbar__link text-[#2A2A42] hover:text-[#2a2a42] hover:no-underline hoverline-link p-0 cursor-pointer flex items-center"
                >
                    {label}
                </a>
                <ChevronDownIcon className={`${isShowing ? "transform rotate-180" : ""} ml-1 transition`}/>
            </Popover.Button>
            <Transition
                as={React.Fragment}
                enter="transition ease-in duration-200"
                enterFrom="opacity-0 translate-y-3"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-3"
                show={isShowing}
                onMouseEnter={(event) => {
                    event.stopPropagation();
                }}
            >
                <Popover.Panel className="absolute z-50 top-[58px]">
                    <div
                        className="bg-white flex rounded-lg overflow-hidden"
                        style={{
                            filter: "drop-shadow(4px 8px 16px rgba(42, 42, 66, 0.25))",
                        }}
                    >
                        {children}
                        <Link to={imageLink}>
                            <div
                                className="relative w-[312px] h-full bg-no-repeat bg-cover flex items-end justify-center"
                                style={{
                                    backgroundImage: `url(${imageURL})`,
                                }}
                            ></div>
                        </Link>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

export default function NavbarContent() {
    const [isShowing, setIsShowing] = React.useState(false);
    const timeoutRef = React.createRef();
    const timeoutEnterRef = React.createRef();
    const location = useLocation();
    const mobileSidebar = useNavbarMobileSidebar();
    const items = useNavbarItems();
    const [leftItems, rightItems] = splitNavbarItems(items);
    const searchBarItem = items.find((item) => item.type === "search");
    React.useEffect(() => {
        setIsShowing(false);
    }, [location]);

    return (
        <NavbarContentLayout
            left={
                <>
                    {!mobileSidebar.disabled && <NavbarMobileSidebarToggle/>}
                    <NavbarLogo/>
                    {POPOVERMENUS.map((item) => (
                        <PopoverMenu
                            key={item.label}
                            label={item.label}
                            imageLink={item.imageLink}
                            imageURL={item.imageURL}
                        >
                            {item.label === "文档中心" && (
                                <div className="grid grid-cols-1 w-[292px] p-4 gap-2">
                                    {item.items.map((item) => (
                                        <PopoverItem
                                            key={item.label}
                                            label={item.label}
                                            description={item.description}
                                            to={item.link}
                                            icon={item.icon}
                                        />
                                    ))}
                                </div>
                            )}

                        </PopoverMenu>
                    ))}

                    <NavbarItems items={leftItems}/>
                </>
            }
            right={

                <>
                    <NavbarItems items={rightItems}/>
                    {/*weChat*/}
                    <Popover className="relative top-1 "
                             onMouseEnter={() => {
                                 timeoutEnterRef.current = setTimeout(
                                     () => setIsShowing(true),
                                     210,
                                 );
                                 clearTimeout(timeoutRef.current);
                             }}
                             onMouseLeave={() => {
                                 timeoutRef.current = setTimeout(() => setIsShowing(false), 210);
                                 clearTimeout(timeoutEnterRef.current);
                             }}
                    >
                        <Popover.Button as='div'  >
                            <NavbarItem className={`text-[#2A2A42] hover:text-[#2a2a42] hover:no-underline hoverline-link header-icon-link header-wechat-link p-0 with-hoverline`} > </NavbarItem>
                        </Popover.Button>
                        <Transition
                            as={React.Fragment}
                            enter="transition ease-in duration-200"
                            enterFrom="opacity-0 translate-y-3"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-out duration-200"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-3"
                            show={isShowing}
                            onMouseEnter={(event) => {
                                event.stopPropagation();
                            }}
                        >

                        <Popover.Panel className="absolute z-10 top-[28px] left-[-35px]  ">
                            <div className="grid overflow-hidden  pop-wechat " />
                        </Popover.Panel>

                        </Transition>
                    </Popover>

                    <NavbarColorModeToggle className={`${styles.colorModeToggle} navbar-theme-toggle`}/>
                    {!searchBarItem && (
                        <NavbarSearch>
                            <SearchBar/>
                        </NavbarSearch>
                    )}
                </>
            }
        />
    );
}
