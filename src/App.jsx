import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Health from './pages/Health';
import CreateCattle from './pages/CreateCattle';
// import bgImg from "./images/img7.jpg";
import EditCattle from './pages/EditCattle';
import News from './pages/News';
import LoadingPage from './pages/LoadingPage';
import { useEffect, useState } from 'react';

function App() {
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {
        isLoading ? <LoadingPage /> :
        <BrowserRouter>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route 
                path='/'
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route 
                path='/login'
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route 
                path='/signup'
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route 
                path='/cattle/create'
                element={user ? <CreateCattle /> : <Navigate to="/login" />}
              />
              <Route 
                path="/health" 
                element={user ? <Health /> : <Navigate to="/login" />}
              />
              <Route 
                path="/edit/:cattleId" 
                element={user ? <EditCattle /> : <Navigate to="/login" />}
              />
              <Route 
                path="/news" 
                element={user ? <News /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      }
      
    </div>
  );
}

export default App;
