import { NavMenu } from "../types/nav-menu";
import {
    DocumentsIcon,
    IntegrationsIcon,
    RefineIcon,
    TutorialIcon
} from "./popover-icons";

export const POPOVERMENUS: NavMenu[] = [

    {
        label: "文档中心",
        items: [
            {
                label: "小记",
                description: "工作中接触过的技术点",
                link: "/docs",
                icon: TutorialIcon,
            },
            {
                label: "基础",
                description: "个人掌握的技能的归纳总结",
                link: "/docs/basics",
                icon: IntegrationsIcon,
            },
            {
                label: "运维",
                description: "项目落地，高可用，部署相关技术",
                link: "/docs/devOps",
                icon: RefineIcon,
            },
        ],
        imageLink: "/",
        imageURL: "https://test.preview.qingxinzhimei.com/2023/01/07/ERP202301070000003755.jpg",
    }
];
