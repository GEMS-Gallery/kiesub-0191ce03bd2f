import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type CategoryFilterProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Filter by Category</InputLabel>
      <Select
        value={selectedCategory || ''}
        label="Filter by Category"
        onChange={(e) => onSelectCategory(e.target.value as string | null)}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Batteries">Batteries</MenuItem>
        <MenuItem value="TestEquipment">Test Equipment</MenuItem>
        <MenuItem value="Chemicals">Chemicals</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
