// TODO: use HOC
import OriginLayout from './layout.svelte';
import Content from './content.svelte';
import Footer from './footer.svelte';
import Sider from './sider.svelte';
import Header from './header.svelte';

interface LayoutType {
    Header?: typeof Header;
    Footer?: typeof Footer;
    Content?: typeof Content;
    Sider?: typeof Sider;
}

// TODO: use the correct Type
const Layout = OriginLayout as LayoutType & typeof OriginLayout;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

export { Header, Footer, Content, Sider };

export default Layout;
