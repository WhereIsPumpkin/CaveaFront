import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface Item {
  id: number;
  name: string;
  location: string;
  price: number;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [locationFilter, setLocationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchItems = async () => {
      let url = 'http://127.0.0.1:4444/inventories';

      if (locationFilter !== 'All') {
        url += `?location=${locationFilter}`;
      }

      if (sortBy) {
        url += `${url.includes('?') ? '&' : '?'}sortBy=${sortBy}`;
      }

      const response = await axios.get(url);
      setItems(response.data);
    };

    fetchItems();
  }, [locationFilter, sortBy]);

  function handleDelete(id: number) {
    axios.delete(`http://127.0.0.1:4444/inventories/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      });
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ინვენტარის მართვა</h1>
      <div className="d-flex justify-content-end mb-4">
        <Button variant="primary" href="/add">ნივთის დამატება</Button>
      </div>
      <div className="d-flex mb-4">
        <div className="me-4">
          <label htmlFor="locationFilter" className="form-label">ადგილმდებარეობა</label>
          <select
            id="locationFilter"
            className="form-select"
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
          >
            <option value="">ყველა</option>
            <option value="მთავარი ოფისი">მთავარი ოფისი</option>
            <option value="კავეა გალერია">კავეა გალერია</option>
            <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
            <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
            <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
            
          </select>
        </div>
        <div className="d-flex align-items-end">
          <Button
            variant={sortBy === 'name' ? 'primary' : 'secondary'}
            onClick={() => setSortBy('name')}
          >
            დალაგება სახელით
          </Button>
          <Button
            variant={sortBy === 'price' ? 'primary' : 'secondary'}
            onClick={() => setSortBy('price')}
            className="ms-2"
          >
            დალაგება ფასით
          </Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ნივთის სახელი</th>
            <th>ნივთის ადგილმდებარეობა</th>
            <th>ფასი</th>
            <th>ოპერაციები</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>{item.price}₾</td>
              <td><Button variant="danger" onClick={() => handleDelete(item.id)}>წაშლა</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;