import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

type Props = {
  onSearch: (tid: bigint) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTID, setSearchTID] = useState('');

  const handleSearch = () => {
    const tid = BigInt(searchTID);
    onSearch(tid);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
      <TextField
        label="Search by TID"
        variant="outlined"
        value={searchTID}
        onChange={(e) => setSearchTID(e.target.value)}
        type="number"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
