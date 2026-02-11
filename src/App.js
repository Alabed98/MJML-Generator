import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PromptsEdit from './components/PromptsEdit';
import MainLayout from './components/MainLayout/MainLayout';

function App() {
  return (
    <Router >

      <div className={'app'}>
        <div className={'body'}>
          <nav >
            <ul className={'nav'}>
              <li ><Link to='/' className={'btn'}><i className={"fa-solid fa-house"}></i> Konverter</Link></li>
              <li style={{ paddingLeft: '20px' }}><Link to='/promptsEdit' className={'btn btnEdit'} ><i className={"fa-solid fa-gear"}></i> Prompt-Einstellungen</Link></li>
            </ul>
          </nav>

            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/promptsEdit" element={<PromptsEdit />} />
            </Routes>
  
        </div>
      </div>

    </Router>
  );
}


export default App;
