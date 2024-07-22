import './App.css';
import Header from './components/Header/Header';
import MainPageWrapper from './components/MainPageWrapper/MainPageWrapper';
import Sidebar from './components/Sidebar/Sidebar';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <div className='app-container'>
        <div className='content'>
          <Header />
          <div className='main'>
            <Sidebar />
            <MainPageWrapper />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;
