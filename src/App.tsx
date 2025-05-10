import { useEffect, useState } from 'react';
import './App.css'
import Form from './components/Form';
import { fetchColors } from './features/user/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import ColorPalette from './components/ColorPalette';
import SelectedUser from './components/SelectedUser';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isUserSelected, setIsUserSelected] = useState(false);
  
  useEffect(() => {
    dispatch(fetchColors());
  }, []);

  return (
    <div>
      <a className='link-to-excel' href='https://docs.google.com/spreadsheets/d/1JkaCNYW-SneyzgiC8ABvRAzvl5OYUvgcmOTIuzxVexY/edit?usp=sharing' target='_blank'>Link to Excel Sheet</a>
      <ColorPalette />
      <div className="selected-container">
        {isUserSelected ? 
          <SelectedUser onReset={() => setIsUserSelected(false)}/>
        :
          <Form onSubmit={()=> setIsUserSelected(true)}/>
        }
      </div>
    </div>
  )
}

export default App
