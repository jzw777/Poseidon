import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import FooterLinks from "@theme/Footer/Links";
import FooterLogo from "@theme/Footer/Logo";
import FooterCopyright from "@theme/Footer/Copyright";
import FooterLayout from "@theme/Footer/Layout";
function Footer() {
    const { footer } = useThemeConfig();
    if (!footer) {
        return null;
    }
    const { copyright, links, logo, style } = footer;
    return (
        <FooterLayout
            style={style}
            links={
                links &&
                links.length > 0 && (
                    <FooterLinks
                        links={links.filter(
                            (el) => !`${el.title}`.startsWith("__"),
                        )}
                    />
                )
            }
            socialLinks={
                links && links.length > 0
                    ? links.find((el) => el.title === "__SOCIAL")
                    : undefined
            }
            logo={logo && <FooterLogo logo={logo} />}
            copyright={copyright && <FooterCopyright copyright={copyright} />}
        />
    );
}
export default React.memo(Footer);
