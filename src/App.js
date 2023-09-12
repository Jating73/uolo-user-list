import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function App() {

  const [users, setUsers] = useState([]);

  async function getUsers() {
    const base_url = "https://randomuser.me/api/?results=20";

    const response = await fetch(base_url);
    const data = await response.json();
    return data.results ? data.results : []
  }

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    }).catch((err) => {
      console.log(err);
    });;
  }, []);

  function deleteUser(deleteIndex) {
    const filteredUsers = users.filter((user, index) => {
      return index != deleteIndex
    });

    setUsers(filteredUsers)
  }

  return (
    <Container className='mt-2'>
      {users && users.map((user, index) => {
        return (
          <Card style={{ display: "flex", flexDirection: "row", margin: "0 auto", padding: "1rem" }} key={index}>
            <Card.Img src={user?.picture?.medium} style={{ width: "8rem", height: "8rem", borderRadius: "50%" }} />
            <Card.Body style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Card.Title>{user?.name?.title} {user?.name?.first} {user?.name?.last}</Card.Title>
              <Button style={{ marginLeft: "auto" }} variant="danger" onClick={() => deleteUser(index)}>Delete</Button>
            </Card.Body>
          </Card>
        )
      })}
    </Container>
  )
}
