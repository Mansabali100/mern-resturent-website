
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartPtovider } from './components/Context';
import MyOrder from './screens/MyOrder';

function App() {
  return (
  <CartPtovider>
        <Router>    
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/myOrder' element={<MyOrder/>}/>
      </Routes>

    </div>

    </Router>
  </CartPtovider>  
    
    
       
    
   

  );
}

export default App;
