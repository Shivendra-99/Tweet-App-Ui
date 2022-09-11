import HomePage from './component/HomePage';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import ShowAllTweet from './component/ShowAllTweet';
import ViewMyTweet from './component/ViewMyTweet';
import PostTweet from './component/PostTweet';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
function App() {
  const [val,setVal]=useState(0);
  const refresh = (value)=>{
    console.log(value)
    setVal(value);
  }
  return (
    <>
       <Router>
        <ToastContainer></ToastContainer>
         <Routes>
            <Route  path='/' element={<HomePage/>}/>
            <Route  path='/homePage'  element={<><NavBar/> ,<PostTweet refresh={refresh}/>,<ShowAllTweet value={val}/></> }/>
            <Route  path='/viewMyTweet' element={<><NavBar/>,<ViewMyTweet /> </>}/>
         </Routes>
       </Router>
    </>
  );
}

export default App;
