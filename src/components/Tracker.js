import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useTrackerInfo } from 'contexts/tracker';

export default function Tracker() {
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const { data } = useTrackerInfo([]);

  const pages = Math.ceil(totalCount / 5);

  React.useEffect(() => {
      if (data.sortedVolume) {
          setTotalCount(data.sortedVolume.length);
      }
  }, [data.sortedVolume]);

  return (
    <Box mt={6} mb={2}>
      <Box>Trading Competition</Box>

      <Box>
        <Table aria-label="Rebases">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.sortedVolume &&
              data.sortedVolume.map((swaps, index) => (
                <TableRow key={swaps.address}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{swaps.address}</TableCell>
                  <TableCell>{swaps.total_volume}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      <Box mt={2}>
        <Pagination
          variant="outlined"
          shape="rounded"
          count={pages}
          page={page}
          onChange={(event, page) => setPage(page)}
        />
      </Box>
    </Box>
  );
}
