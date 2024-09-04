import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import TaxPayerList from './components/TaxPayerList';
import TaxPayerForm from './components/TaxPayerForm';
import SearchBar from './components/SearchBar';
import { backend } from 'declarations/backend';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string;
  image?: string;
  sunnyDay: boolean;
};

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      setLoading(true);
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tax payers');
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: Omit<TaxPayer, 'tid'>) => {
    try {
      setLoading(true);
      const result = await backend.addTaxPayer(
        newTaxPayer.firstName,
        newTaxPayer.lastName,
        newTaxPayer.address,
        newTaxPayer.image ? [newTaxPayer.image] : [],
        newTaxPayer.sunnyDay
      );
      if ('ok' in result) {
        await fetchTaxPayers();
      } else {
        setError('Failed to add tax payer');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to add tax payer');
      setLoading(false);
    }
  };

  const handleSearch = async (tid: bigint) => {
    try {
      setLoading(true);
      const result = await backend.getTaxPayerByTID(tid);
      if (result.length > 0) {
        setTaxPayers([result[0]]);
      } else {
        setTaxPayers([]);
        setError('No tax payer found with the given TID');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to search for tax payer');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TaxPayer Management System - Fun in the Sun!
        </Typography>
        <SearchBar onSearch={handleSearch} />
        <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TaxPayerList taxPayers={taxPayers} />
        )}
      </Box>
    </Container>
  );
};

export default App;
