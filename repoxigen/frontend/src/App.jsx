import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/Layouts/PublicLayout';

import Home from './pages/Home'
import GalleryPage from './pages/Home/Gallery';
import About from './pages/About';
import SquadDetail from './pages/About/Structure/SquadDetail';
import Merchant from './pages/Merchant';

import Login from './pages/auth/Login'
import Registrasi from './pages/auth/Registrasi'
import UserDashboard from './pages/dashboard/User/Dashboard';

import DashboardLayout from './components/Layouts/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Landing Page */}
        <Route element={<PublicLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home/gallery' element={<GalleryPage />} />
          <Route path='/about' element={<About />} />
          <Route path="/about/squad/:divisionId" element={<SquadDetail />} />
          <Route path='/merchant' element={<Merchant />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registrasi />} />

        <Route path='/dashboard' element={<DashboardLayout />}>
          {/* <Route index element={<Navigate to="user" replace />} /> */}
          <Route path="user" element={<UserDashboard/>}></Route>

          {/* <Route path='admin' element={}> </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App