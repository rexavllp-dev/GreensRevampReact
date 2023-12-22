import Navbar from '@/components/navbar/Navbar'
import HomePage from './homepage/HomePage'
import Footer from '@/components/footer/Footer'
import MainSidebar from '@/components/sidebar/main_sidebar/MainSidebar'
import ScrollTop from '@/components/scrolltop/ScrollTop'
import "./layout.scss"

export default function Home() {

  return (
    <div>
      <Navbar />

      <div className='main-wrapper' >
          <HomePage />
      </div>
      <ScrollTop/>
      <Footer />
    </div>
  )
}
