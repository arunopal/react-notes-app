import './App.css';
import { Navbar } from './components/Home/Navbar';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
