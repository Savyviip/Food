import { useLocation } from 'react-router-dom';
import './App.css';
import { About, Detail, Form, Home, Landing } from "./View";
import { Route, Routes } from 'react-router-dom';
import ThreeDotsMenu from './Components/ThreeDotsMenu/ThreeDotsMenu';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <ThreeDotsMenu />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>

  );
}

export default App;