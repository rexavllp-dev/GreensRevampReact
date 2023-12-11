import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ScrollTop from "@/components/scrolltop/ScrollTop";
import "./layout.scss";


export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div className='main-wrapper' >
                {children}
            </div>
            <ScrollTop />
            <Footer />
        </div>
    );
}