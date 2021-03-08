import './App.css';
import HeroPage from './pages/HeroPages/HeroPage';
import {useAuth} from './context/AuthContext'
import UserPage from './pages/UserPages/UserPage';


function App() {

  const { Auth } = useAuth()

  return (
    <div className="App">
      {!Auth.user ? <HeroPage /> : <UserPage />}
    </div>
  );
}

export default App;
