import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

interface Item {
  id: number;
  name: string;
  location: string;
  price: number;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    const fetchItems = async () => {
      let url = `https://inventorybackend-qmyj.onrender.com/inventories?page=${page}&pageSize=${pageSize}`;

      if (locationFilter) {
        url += `&location=${locationFilter}`;
      }

      if (sortBy) {
        url += `&sortBy=${sortBy}`;
      }

      const response = await axios.get(url);
      setItems(response.data.inventories);
      setTotalItems(response.data.totalItems);
    };

    fetchItems();
  }, [locationFilter, sortBy, page]);

  function handleDelete(id: number) {
    axios
      .delete(`https://inventorybackend-qmyj.onrender.com/inventories/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
        setTotalItems(totalItems - 1);
      });
  }
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ინვენტარის მართვა</h1>
      <div className="d-flex justify-content-end mb-4">
        <Button variant="primary" href="/add">
          ნივთის დამატება
        </Button>
      </div>
      <div className="d-flex mb-4">
        <div className="me-4">
          <label htmlFor="locationFilter" className="form-label">
            ადგილმდებარეობა
          </label>
          <select
            id="locationFilter"
            className="form-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
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
            variant={sortBy === "name" ? "primary" : "secondary"}
            onClick={() => setSortBy("name")}
          >
            დალაგება სახელით
          </Button>
          <Button
            variant={sortBy === "price" ? "primary" : "secondary"}
            onClick={() => setSortBy("price")}
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
              <td>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  წაშლა
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <nav>
        <div className="d-flex justify-content-between">
       
          <ul className="pagination mb-0">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>
                წინა
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${page === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(page + 1)}>
                შემდეგი
              </button>
            </li>
          </ul>
          <div className="total-items  fw-bold text-primary">ჯამური რაოდენობა: {totalItems}</div>
        </div>
      </nav>
    </div>
  );
}

export default App;
