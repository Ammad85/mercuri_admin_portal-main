import NextLink from "next/link";
import {
  Box,
  Link,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

export const CustomerListTableLoader = () => {

  return (
            <TableRow >
                  <TableCell padding="checkbox">
                    <Skeleton variant="square" animation="wave" width={20} height={20} sx={{marginLeft: "10px"}} />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                >
                  <Skeleton variant="circular" animation="wave" width={45} height={45} />
                      <Box sx={{ ml: 1 }}>
                      <NextLink href="/dashboard/customers/1" passHref>
                      <Link color="inherit" variant="subtitle2">
                      <Skeleton variant="square" animation="wave" width={200} height={40}/>
                      </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
              
              <TableCell>
              <Skeleton variant="rectangular" animation="wave" width={200} height={20}/>
                  </TableCell>
              <TableCell>
              <Skeleton variant="rectangular" animation="wave" width={30} height={20}/>
                  </TableCell>
                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                    <Skeleton variant="rectangular"  animation="wave"  width={40} height={20}/>
                    </Typography>
                  </TableCell>
              <TableCell>
              <Box  sx={{
              display: 'flex',
              justifyContent: 'end',
              }}>
                  <Skeleton variant="rectangular" animation="wave" align="right" width={70} height={20} />
              </Box>
              </TableCell>
          </TableRow>
  );
};
