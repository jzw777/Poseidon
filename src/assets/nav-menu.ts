import { NavMenu } from "../types/nav-menu";
import {
    DocumentsIcon,
    IntegrationsIcon,
    RefineIcon,
} from "./popover-icons";

export const POPOVERMENUS: NavMenu[] = [

    {
        label: "文档中心",
        items: [
            {
                label: "技术知识",
                description: "工作中接触过的技术点",
                link: "/docs/knowledge",
                icon: DocumentsIcon,
            },
            {
                label: "架构",
                description: "工作中一些场景需求的解决方案",
                link: "/docs/framework",
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
        imageURL: "img/pexels-nishant-aneja-2393816.jpg",
    }
];
