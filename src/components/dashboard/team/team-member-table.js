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

export const MemberListTable = (props) => {
  const {
    member,
    memberCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    loading,
    ...other
  } = props;
  const [selectedMember, setSelectedMember] = useState([]);

  // Reset selected member when member change
  useEffect(
    () => {
      if (selectedMember.length) {
        setSelectedMember([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [member]
  );

  const handleSelectAllMember = (event) => {
    setSelectedMember(
      event.target.checked ? member.map((member) => member.id) : []
    );
  };

  const handleSelectOneMember = (event, memberId) => {
    if (!selectedMember.includes(memberId)) {
      setSelectedMember((prevSelected) => [...prevSelected, memberId]);
    } else {
      setSelectedMember((prevSelected) =>
        prevSelected.filter((id) => id !== memberId)
      );
    }
  };

  const enableBulkActions = selectedMember.length > 0;
  const selectedSomeMember =
    selectedMember.length > 0 && selectedMember.length < member.length;
  const selectedAllMember = selectedMember.length === member?.length;

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
          checked={selectedAllMember}
          indeterminate={selectedSomeMember}
          onChange={handleSelectAllMember}
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
                  checked={selectedAllMember}
                  indeterminate={selectedSomeMember}
                  onChange={handleSelectAllMember}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell >Team Name</TableCell>
              <TableCell>Coach Name</TableCell>
              <TableCell>Coachee Name</TableCell>
              <TableCell >Enabled</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              <>
              <TeamListTableLoader total={[1,2,3,4,5]} />
              <TeamListTableLoader total={[1,2,3,4,5]}/>
              <TeamListTableLoader total={[1,2,3,4,5]}/>
              <TeamListTableLoader total={[1,2,3,4,5]}/>
              </>
            }
            {member?.map((member, index) => {
              const isMemberelected = selectedMember.includes(
                member.id
              );
              return (
                <TableRow hover key={member.id} selected={isMemberelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isMemberelected}
                      onChange={(event) =>
                        handleSelectOneMember(event, member.id)
                      }
                      value={isMemberelected}
                    />
                  </TableCell>
                  <TableCell>
                  {`${index+1}`}
                  </TableCell>
                  <TableCell>
                  {`${member.teamName}`}
                  </TableCell>
                  <TableCell>
                  {`${member.coachName}`}
                  </TableCell>
                  <TableCell>
                  {`${member.teamMemberName}`}
                  </TableCell>
                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {member.enabled? "true" : "false"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Link href={{pathname:'/dashboard/teams/members/edit',query: {...member} }}>
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
        count={memberCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      </div>
  );
};

MemberListTable.propTypes = {
  member: PropTypes.array.isRequired,
  memberCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
