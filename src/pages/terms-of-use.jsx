import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import PrivacyPolicyArea from "@containers/privacy-policy";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const PrivacyPolicy = () => (
    <Wrapper>
        <SEO pageTitle="Terms of use" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Terms of use"
                currentPage="Terms of use"
            />
            {/* <PrivacyPolicyArea /> */}
        </main>
        <Footer />
    </Wrapper>
);

export default PrivacyPolicy;
