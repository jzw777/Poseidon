import {IntegrationsType} from "../types/integrations";


import {Codee, Docker, JavaGuide, KubeSphere, Leetcode} from "./website-icons";

export const integrations: IntegrationsType = {

    "tools-website": [
        {
            name: "Json analyze",
            icon: Codee,
            description: "JSON在线解析与格式化校验",
            url: "https://www.codeeeee.com/json.html",
            status: "stable",
        },
    ],

    "learning-world": [
        {
            name: "云原生实战课程",
            icon: KubeSphere,
            description:
                "最完善的知识体系，从零到一带您入门以 Kubernetes 为核心的云原生技术生态",
            url: "https://v3-2.docs.kubesphere.io/zh/learn/",
            status: "stable",
        },
        {
            name: "JavaGuide",
            icon: JavaGuide,
            description:
                "「Java学习+面试指南」一份涵盖大部分 Java 程序员所需要掌握的核心知识。准备 Java 面试，首选 JavaGuide！",
            url: "https://javaguide.cn/",
            status: "stable",
        },
        {
            name: "力扣",
            icon: Leetcode,
            description: "提升程序员基本素养的神奇网站",
            url: "https://leetcode.cn/",
            status: "stable"
        },
        {
            name: "docker 学习文档",
            icon: Docker,
            description: "使用 Docker，可以让应用的部署、测试和分发都变得前所未有的高效和轻松！",
            url: "https://yeasy.gitbook.io/docker_practice/",
            status: "stable"
        }
    ],

};
