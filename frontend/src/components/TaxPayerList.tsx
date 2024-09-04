import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string;
  image?: string;
};

type Props = {
  taxPayers: TaxPayer[];
};

const TaxPayerList: React.FC<Props> = ({ taxPayers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>TID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taxPayers.map((taxPayer) => (
            <TableRow key={taxPayer.tid.toString()}>
              <TableCell>{taxPayer.tid.toString()}</TableCell>
              <TableCell>{taxPayer.firstName}</TableCell>
              <TableCell>{taxPayer.lastName}</TableCell>
              <TableCell>{taxPayer.address}</TableCell>
              <TableCell>
                {taxPayer.image && (
                  <img src={taxPayer.image} alt="Taxpayer" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaxPayerList;
