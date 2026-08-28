import {useState} from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const pageTitles = {
  home:null,
  about:'about',
  contact:'contact'
}

export default function App(){

  const [activePage, setActivePage] = useState('home');
  

  // function renderPage(){
  //   switch(activePage){
  //     case 'about':
  //       return 
  //     case 'contact':
  //       return
  //     default:
  //       return 
  //   }
  // }
  return(
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1"><h1>MasPur</h1></main>
      <Footer/>
    </div>
  )
}