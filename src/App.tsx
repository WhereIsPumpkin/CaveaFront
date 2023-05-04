import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface Item {
  name: string;
  location: string;
  price: number;
}

function App() {
  const [items, setItems] = useState<Item[]>([
    {
      name: 'Item 1',
      location: 'Location 1',
      price: 100
    }
  ]);

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Inventory Management</h1>
      <div className="d-flex justify-content-end mb-4">
        <Button variant="primary" href="/add">Add Item</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Location</th>
            <th>Price (in GEL)</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>{item.price}</td>
              <td><Button variant="danger" onClick={() => handleDeleteItem(index)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;