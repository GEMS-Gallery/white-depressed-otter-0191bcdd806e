import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

type TaxPayer = {
  firstName: string;
  lastName: string;
  address: string;
};

type Props = {
  onAddTaxPayer: (taxPayer: TaxPayer) => void;
};

const TaxPayerForm: React.FC<Props> = ({ onAddTaxPayer }) => {
  const { control, handleSubmit, reset } = useForm<TaxPayer>();

  const onSubmit = (data: TaxPayer) => {
    onAddTaxPayer(data);
    reset();
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
        <Button type="submit" variant="contained" color="primary">
          Add TaxPayer
        </Button>
      </Box>
    </form>
  );
};

export default TaxPayerForm;
