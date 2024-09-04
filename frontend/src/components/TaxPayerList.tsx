import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string;
  image?: string;
  sunnyDay: boolean;
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
            <TableCell>Sunny Day</TableCell>
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
              <TableCell>
                {taxPayer.sunnyDay && <WbSunnyIcon style={{ color: '#f39c12' }} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaxPayerList;
