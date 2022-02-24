// TODO: use HOC
import OriginLayout from './layout.vue';
import Content from './content.vue';
import Footer from './footer.vue';
import Header from './header.vue';

interface LayoutType {
    Header?: typeof Header;
    Footer?: typeof Footer;
    Content?: typeof Content;
}

// TODO: use the correct Type
const Layout = OriginLayout as LayoutType & typeof OriginLayout;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export { Header, Footer, Content };

export default Layout;
