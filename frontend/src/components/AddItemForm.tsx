import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

type FormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: 'Batteries' | 'TestEquipment' | 'Chemicals';
};

type AddItemFormProps = {
  onAddItem: (item: FormData) => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onAddItem({
      ...data,
      category: { [data.category]: null } as any,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Name"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Description" multiline rows={3} />
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue={0}
          rules={{ required: 'Price is required', min: 0 }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Price"
              type="number"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="stock"
          control={control}
          defaultValue={0}
          rules={{ required: 'Stock is required', min: 0 }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Stock"
              type="number"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Controller
            name="category"
            control={control}
            defaultValue="Batteries"
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <Select {...field} label="Category">
                <MenuItem value="Batteries">Batteries</MenuItem>
                <MenuItem value="TestEquipment">Test Equipment</MenuItem>
                <MenuItem value="Chemicals">Chemicals</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
      </Box>
    </form>
  );
};

export default AddItemForm;
