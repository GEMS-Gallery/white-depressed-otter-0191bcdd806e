import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

type TaxPayer = {
  firstName: string;
  lastName: string;
  address: string;
  image?: string;
};

type Props = {
  onAddTaxPayer: (taxPayer: TaxPayer) => void;
};

const TaxPayerForm: React.FC<Props> = ({ onAddTaxPayer }) => {
  const { control, handleSubmit, reset } = useForm<TaxPayer>();
  const [image, setImage] = useState<string | null>(null);

  const onSubmit = (data: TaxPayer) => {
    onAddTaxPayer({ ...data, image: image || undefined });
    reset();
    setImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First Name"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last Name"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: 'Address is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Address"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <img src={image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        )}
        <Button type="submit" variant="contained" color="primary">
          Add TaxPayer
        </Button>
      </Box>
    </form>
  );
};

export default TaxPayerForm;
