import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../scrollbar";
import { TeamListTableLoader } from "./team-list-table-loader";
import Link from "next/link";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";

export const GroupListTable = (props) => {
  const {
    group,
    groupCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    loading,
    ...other
  } = props;
  const [selectedGroup, setSelectedGroup] = useState([]);

  // Reset selected group when group change
  useEffect(
    () => {
      if (selectedGroup.length) {
        setSelectedGroup([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [group]
  );

  const handleSelectAllGroup = (event) => {
    setSelectedGroup(
      event.target.checked ? group.map((group) => group.id) : []
    );
  };

  const handleSelectOneGroup = (event, groupId) => {
    if (!selectedGroup.includes(groupId)) {
      setSelectedGroup((prevSelected) => [...prevSelected, groupId]);
    } else {
      setSelectedGroup((prevSelected) =>
        prevSelected.filter((id) => id !== groupId)
      );
    }
  };

  const enableBulkActions = selectedGroup.length > 0;
  const selectedSomeGroup =
    selectedGroup.length > 0 && selectedGroup.length < group.length;
  const selectedAllGroup = selectedGroup.length === group?.length;


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
          checked={selectedAllGroup}
          indeterminate={selectedSomeGroup}
          onChange={handleSelectAllGroup}
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
                  checked={selectedAllGroup}
                  indeterminate={selectedSomeGroup}
                  onChange={handleSelectAllGroup}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell >Team Name</TableCell>
              <TableCell>Coach Name</TableCell>
              <TableCell >Enabled</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              <>
              <TeamListTableLoader total={[1,2,3,4]} />
              <TeamListTableLoader total={[1,2,3,4]} />
              <TeamListTableLoader total={[1,2,3,4]} />
              <TeamListTableLoader total={[1,2,3,4]} />
              </>
            }
            {group?.map((group) => {
              const isGroupelected = selectedGroup.includes(
                group.id
              );
              return (
                <TableRow hover key={group.id} selected={isGroupelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isGroupelected}
                      onChange={(event) =>
                        handleSelectOneGroup(event, group.id)
                      }
                      value={isGroupelected}
                    />
                  </TableCell>
                  <TableCell>
                  {`${group.id}`}
                  </TableCell>
                  <TableCell>
                  {`${group.teamName}`}
                  </TableCell>
                  <TableCell>
                  {`${group.coachName}`}
                  </TableCell>
                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {group.enabled? "true" : "false"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Link href={{pathname:'/dashboard/teams/groups/edit',query: {...group} }}>
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
        count={groupCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      </div>
  );
};

GroupListTable.propTypes = {
  group: PropTypes.array.isRequired,
  groupCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
