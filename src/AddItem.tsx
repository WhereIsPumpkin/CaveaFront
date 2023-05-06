import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddItem = () => {
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!location || !name || !price) {
      setError('ყველა ველი სავალდებულოა');
      return;
    }

    axios.post('https://inventorybackend-qmyj.onrender.com/inventories', { location, name, price })
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ნივთის დამატება</h1>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="location">
          <Form.Label>ადგილმდებარეობა</Form.Label>
          <Form.Select value={location} onChange={e => setLocation(e.currentTarget.value)}>
            <option value="" hidden></option>
            <option value="მთავარი ოფისი">მთავარი ოფისი</option>
            <option value="კავეა გალერია">კავეა გალერია</option>
            <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
            <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
            <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>სახელი</Form.Label>
          <Form.Control type="text" value={name} onChange={e => setName(e.currentTarget.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>ფასი</Form.Label>
          <Form.Control type="number" value={price} onChange={e => setPrice(e.currentTarget.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          დამატება
        </Button>
      </Form>
    </div>
  );
}

export default AddItem;