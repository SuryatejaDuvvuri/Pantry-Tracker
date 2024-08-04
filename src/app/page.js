"use client";
import {app} from "./firebase.js"
import { useEffect, useState } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, Container, Chip, Table, TableCell, TableBody, TableHead, TableRow, TableContainer, Paper} from '@mui/material'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
  addDoc,
  getFirestore,
} from 'firebase/firestore'

async function getData()
{
  const db = getFirestore(app);
  const docRef = doc(db, "items", "item1");
  const querySnapshot = await getDocs(collection(db, "items"));
  const data = [];
  querySnapshot.forEach((doc) => {

    data.push({id: doc.id,...doc.data()});
  });
  return data;
}

async function addData(itemName, itemQuantity) {
  
  const db = getFirestore(app);
  const description = {
    name: itemName,
    quantity: itemQuantity,
  }
  addDoc(collection(db, "items"), description);

  // getData();
}

function editData(itemID, itemName, itemQuantity) {
  const db = getFirestore(app);
  const docRef = doc(db, "items", itemID);
  const description = {
    name: itemName,
    quantity: itemQuantity,
  }
  setDoc(docRef, description);

  // getData();

}

async function deleteData(itemID) {
  const db = getFirestore(app);
  const docRef = doc(db, "items", itemID);
  deleteDoc(docRef);

  // getData();

}



export default function Home() {

  const [name, setName] = useState("Toy");
  const [quantity, setQuantity] = useState(15);
  const [items,setItems] = useState([]);

  useEffect(() => {
    async function collect() {
      const data = await getData();
      setItems(data);
    }
    collect();
  }
  ,[]);

  const add = async () => {
    await addData(name,quantity)
    const data = await getData();
    setItems(data)
  };

  const edit = async (id, newName, newQuantity) => {
    await editData(id,newName,newQuantity)
    const data = await getData();
    setItems(data)
  };
  
  const deleteItem = async (id) => {
    await deleteData(id)
    const data = await getData();
    setItems(data)
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", display: 'inline-flex', flexDirection: 'column', justifyContent: 'revert-layer', bgcolor: 'cornflowerblue' }}>
      <Typography variant="h1" color='coral' fontWeight={600} justifyContent="center"
        alignItems="center" display={'flex'}>Pantry tracker</Typography>
      <Typography justifyContent="center"
        alignItems="center" variant="h3" color="black" display={'flex'}>Enter the item name</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <>
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" id = "edit-btn" color="primary" onClick={() => edit(item.id, name, quantity)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => deleteItem(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
              
              
              </>
                
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth='100vh'
      >
        <Stack direction="column" spacing={2} useFlexGap flexWrap="wrap">
          <TextField required id="name" label="Item-name" variant="filled" defaultValue="Toy" onChange={(e) => {
            setName(e.target.value);
          }} />
          <TextField required id="quantity" label="Quantity" type="number" variant="filled" defaultValue="15" onChange={(e) => {
            setQuantity(e.target.value);
          }} />
          <Button variant="contained" color="success" onClick={add}>Add</Button>
        </Stack>

        <Stack direction="column" spacing={8} margin={10} top={50}>
              <TextField required id="name" label="Item-name" variant="filled" placeholder="Update name" onChange={(e) => {
                setName(e.target.value);
              }} />
              <TextField required id="quantity" label="Quantity" type="number" placeholder="Update quantity"variant="filled" defaultValue="15" onChange={(e) => {
                setQuantity(e.target.value);
              }}/>
   
           
        </Stack>
      </Box>
    </Container>
  );
}
