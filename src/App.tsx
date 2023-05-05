import HomePage from './HomePage';
import AddItem from './AddItem';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
  );
}

export default App;