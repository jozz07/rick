import './App.css';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import axios from 'axios';
import Favorites from './components/Favorite/Favorites';
import {useState, useEffect} from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';


const email ='jozney12@gmail.com';
const password = '12125690';


function App() {
 const location = useLocation();
 const navigate = useNavigate();
   const [characters,setCharacters]= useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if(userData.email === email && userData.password === password){
         setAccess(true);
         navigate('/home');
      }
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access, navigate])

const onSearch= (id) => {

      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id) => {
      const charactersFiltered= characters.filter(character => character.id !== Number(id))
       setCharacters(charactersFiltered)
   }


   return (
      <div className='App'>
         {
            location.pathname !== '/'  &&<Nav onSearch={onSearch}/>
         }

         <Routes>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/' element={<Form login={login}/>} />
           <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/> 
           <Route path='/about' element={<About/>}/>
           <Route path='/detail/:id' element={<Detail/>}/>
         </Routes>
         
      </div>
   );
}

export default App;
