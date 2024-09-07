import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
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

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const result = await backend.getItems();
      setItems(result.map(item => ({
        ...item,
        id: Number(item.id),
        stock: Number(item.stock),
        price: Number(item.price)
      })));
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (newItem: Omit<Item, 'id'>) => {
    try {
      await backend.addItem(
        newItem.name,
        newItem.description,
        newItem.price,
        BigInt(newItem.stock),
        newItem.category
      );
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateStock = async (id: bigint, newStock: bigint) => {
    try {
      await backend.updateItemStock(id, newStock);
      fetchItems();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleDeleteItem = async (id: bigint) => {
    try {
      await backend.deleteItem(id);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const filteredItems = selectedCategory
    ? items.filter(item => Object.keys(item.category)[0] === selectedCategory)
    : items;

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
    </Container>
  );
};

export default App;
