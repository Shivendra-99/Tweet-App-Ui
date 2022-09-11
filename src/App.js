import HomePage from './component/HomePage';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import ShowAllTweet from './component/ShowAllTweet';
import ViewMyTweet from './component/ViewMyTweet';
import PostTweet from './component/PostTweet';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
       <Router>
        <ToastContainer></ToastContainer>
         <Routes>
            <Route  path='/' element={<HomePage/>}/>
            <Route  path='/homePage'  element={<><NavBar/> ,<PostTweet/>,<ShowAllTweet/></> }/>
            <Route  path='/viewMyTweet' element={<><NavBar/>,<ViewMyTweet /> </>}/>
         </Routes>
       </Router>
    </>
  );
}

export default App;
