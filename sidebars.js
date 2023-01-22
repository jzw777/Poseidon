/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    someSidebar: [
        {
            type: "doc",
            id: "intro",
        },
        {
            type: "category",
            label: "JAVA基础",
            link: {
                type: "generated-index",
                title: "JAVA基础",
                slug: "basics",
            },
            items: [
                {
                    type: "category",
                    label: "MySQL",
                    link: {
                        type: "doc",
                        id: "basics/mysql/mysql-intro",
                    },
                    items: [
                        // "basics/mysql/mysql-intro",
                        "basics/mysql/mysql-language",
                        "basics/mysql/mysql-function",
                        "basics/mysql/mysql-constraint",
                        "basics/mysql/mysql-query",
                        "basics/mysql/mysql-transaction",
                        "basics/mysql/mysql-norm",
                    ]
                },

            ],
            collapsed: true,
        },
        {
            type: "category",
            label: "DevOps",
            link: {
                type: "generated-index",
                title: "DevOps",
                slug: "devops",
            },
            items: [
                {
                    type: "category",
                    label: "Docker",
                    link: {
                        type: "doc",
                        // title: "MySQL",
                        id: "devops/docker/docker-intro",
                    },
                    items: [
                        "devops/docker/docker-install",
                        "devops/docker/docker-use",
                        "devops/docker/docker-core",
                    ]
                },
                {
                    type: "doc",
                    id: "devops/containerd"
                }
            ],
            collapsed: true,
        }
    ]
};

