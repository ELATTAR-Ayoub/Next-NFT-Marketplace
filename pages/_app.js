import '../styles/globals.css'

// components
import Header from '../components/Header'
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';


function MyApp({ Component, pageProps }) {
  return (
    <div className='App '>
      <Header />
      <SideNav />
      <div className='w-screen min-h-90vh max-w-7xl mx-auto '>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
