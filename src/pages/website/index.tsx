import React from "react";
import Head from "@docusaurus/Head";
import Layout from "../../theme/Layout";
import Card from "../../components/website/card";
import { integrations } from "../../assets/website";
import styles from "./styles.module.css";
import { Integration } from "../../types/integrations";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";


const Integrations: React.FC = () => {
    const integrationFields = Object.keys(integrations);
    const { siteConfig } = useDocusaurusContext();


    const renderIntegration = (integration: Integration, field: string) => {
        return (
            <Card
                status={integration.status}
                title={integration.name}
                description={integration.description}
                linkUrl={integration.url}
                icon={integration.icon}
                contributer={integration?.contributors?.[0]}
            />
        );
    };

    return (
        <Layout>
            <Head title={"Navigation | "+siteConfig.title} >
                <html data-page="navigations" data-customized="true" />
            </Head>
            <div className={styles.integrations_container}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>
                        {/*<span>常用网站导航</span>*/}
                        <span className={styles.headerTitleBold}>
                            常用网站导航
                        </span>
                    </div>
                    <p className={styles.headerText}>
                        个人平常工作和生活中，经常会用到的，或者觉得比较好的网站，
                        也推荐给能看到这个页面的朋友。
                    </p>
                </div>
                <div className={styles.integrationsWrapper}>
                    <span
                        className="fixed -left-10 bottom-[20vh] z-10 "
                        id="leftReward"
                    />
                    <span
                        className="fixed -right-10 bottom-[20vh] z-10 "
                        id="rightReward"
                    />
                    {integrationFields.map((field) => {
                        return (
                            <div key={field}>
                                <div className={styles.integrationTitle}>
                                    {field.replace(/-/g, " ").toUpperCase()}
                                </div>
                                <div className={styles.integrations}>
                                    {integrations[field].map((integration) =>
                                        renderIntegration(integration, field),
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Integrations;
