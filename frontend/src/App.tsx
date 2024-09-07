import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { backend } from 'declarations/backend';
import InventoryList from './components/InventoryList';
import AddItemForm from './components/AddItemForm';
import CategoryFilter from './components/CategoryFilter';

type Item = {
  id: bigint;
  name: string;
  description: string | null;
  price: number;
  stock: bigint;
  category: { Batteries: null } | { TestEquipment: null } | { Chemicals: null };
};

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const result = await backend.getItems();
      setItems(result.map(item => ({
        ...item,
        id: BigInt(item.id),
        stock: BigInt(item.stock),
        price: Number(item.price)
      })));
    } catch (error) {
      console.error('Error fetching items:', error);
      setSnackbar({ open: true, message: 'Error fetching items', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (newItem: Omit<Item, 'id'>) => {
    try {
      console.log('Sending item data:', newItem);
      const result = await backend.addItem(
        newItem.name,
        newItem.description,
        Number(newItem.price),
        BigInt(newItem.stock),
        newItem.category
      );
      console.log('Backend response:', result);
      if ('ok' in result) {
        await fetchItems();
        setSnackbar({ open: true, message: 'Item added successfully', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: `Error adding item: ${result.err}`, severity: 'error' });
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setSnackbar({ open: true, message: `Error adding item: ${error}`, severity: 'error' });
    }
  };

  const handleUpdateStock = async (id: bigint, newStock: bigint) => {
    try {
      await backend.updateItemStock(id, newStock);
      await fetchItems();
      setSnackbar({ open: true, message: 'Stock updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating stock:', error);
      setSnackbar({ open: true, message: 'Error updating stock', severity: 'error' });
    }
  };

  const handleDeleteItem = async (id: bigint) => {
    try {
      await backend.deleteItem(id);
      await fetchItems();
      setSnackbar({ open: true, message: 'Item deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting item:', error);
      setSnackbar({ open: true, message: 'Error deleting item', severity: 'error' });
    }
  };

  const filteredItems = selectedCategory
    ? items.filter(item => Object.keys(item.category)[0] === selectedCategory)
    : items;

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Kiesub Management
        </Typography>
        <AddItemForm onAddItem={handleAddItem} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <InventoryList
            items={filteredItems}
            onUpdateStock={handleUpdateStock}
            onDeleteItem={handleDeleteItem}
          />
        )}
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
