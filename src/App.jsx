import './App.css';
import Header from './components/Header/Header';
import MainPageWrapper from './components/MainPageWrapper/MainPageWrapper';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <>
      <Header />
      <div className='container'>
        <Sidebar />
        <MainPageWrapper />
      </div>
    </>
  );
}

export default App;
