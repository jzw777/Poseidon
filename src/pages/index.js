import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

import { Landing } from "../components/landing";

function Home() {
    React.useEffect(() => {
        return () => {
            // scroll to top after unmount with set timeout
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        };
    }, []);

    return (
        <>
            <Head>
                <html data-page="index" data-customized="true" />
            </Head>
            <Layout
                title={`Bfine`}
                description="try to write something, no matter it would be read or not. I just want to express my feelings, to record my life."
            >
                <Landing />
            </Layout>
        </>
    );
}

export default Home;
