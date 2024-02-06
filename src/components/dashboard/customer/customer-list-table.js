import { useEffect, useState } from "react";
import NextLink from "next/link";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
import { getInitials } from "../../../utils/get-initials";
import { Scrollbar } from "../../scrollbar";
import { CustomerListTableLoader } from "./customer-list-table-loader";
import Link from "next/link";

export const CustomerListTable = (props) => {
  const {
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    loading,
    ...other
  } = props;
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers]
  );

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(
      event.target.checked ? customers.map((customer) => customer.id) : []
    );
  };

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers((prevSelected) =>
        prevSelected.filter((id) => id !== customerId)
      );
    }
  };

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers?.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          display: enableBulkActions ? "block" : "none",
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllCustomers}
          indeterminate={selectedSomeCustomers}
          onChange={handleSelectAllCustomers}
        />
        <Button size="small" sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllCustomers}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCustomers}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              <>
              <CustomerListTableLoader />
              <CustomerListTableLoader />
              <CustomerListTableLoader />
              <CustomerListTableLoader />
              </>
            }
            {customers?.map((customer) => {
              const isCustomerSelected = selectedCustomers.includes(
                customer.id
              );
              return (
                <TableRow hover key={customer.id} selected={isCustomerSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCustomerSelected}
                      onChange={(event) =>
                        handleSelectOneCustomer(event, customer.id)
                      }
                      value={isCustomerSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {/* <Avatar
                        src={customer.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(customer.name)}
                      </Avatar> */}
                      <Avatar
                        src={require("..//..//..//assets/avatar.jpg")}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {/* {getInitials(customer.name)} */}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        
                          
                            {`${customer.firstName} ${customer.lastname}`}
                         
                        
                        <Typography color="textSecondary" variant="body2">
                          {customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.username}
                  </TableCell>
                  <TableCell>{customer.mobile}</TableCell>
                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {customer.enabled? "true" : "false"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Link href={{pathname:'/dashboard/customers/edit', query: {...customer} }}>
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={customersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      </div>
  );
};

CustomerListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
