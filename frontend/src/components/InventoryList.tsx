import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

type Item = {
  id: bigint;
  name: string;
  description: string | null;
  price: number;
  stock: bigint;
  category: { Batteries: null } | { TestEquipment: null } | { Chemicals: null };
};

type InventoryListProps = {
  items: Item[];
  onUpdateStock: (id: bigint, newStock: bigint) => void;
  onDeleteItem: (id: bigint) => void;
};

const InventoryList: React.FC<InventoryListProps> = ({ items, onUpdateStock, onDeleteItem }) => {
  const handleStockChange = (id: bigint, newStock: string) => {
    const stockValue = BigInt(newStock);
    onUpdateStock(id, stockValue);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id.toString()}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={item.stock.toString()}
                  onChange={(e) => handleStockChange(item.id, e.target.value)}
                  size="small"
                />
              </TableCell>
              <TableCell>{Object.keys(item.category)[0]}</TableCell>
              <TableCell>
                <Button onClick={() => onDeleteItem(item.id)} color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryList;
