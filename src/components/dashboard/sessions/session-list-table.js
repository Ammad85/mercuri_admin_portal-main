import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../scrollbar";
import { SessionListTableLoader } from "./session-list-table-loader";

export const SessionListTable = (props) => {
  const {
    session,
    sessionCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    loading,
    ...other
  } = props;
  const [selectedSession, setSelectedSession] = useState([]);

  // Reset selected session when session change
  useEffect(
    () => {
      if (selectedSession.length) {
        setSelectedSession([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session]
  );

  const handleSelectAllSession = (event) => {
    setSelectedSession(
      event.target.checked ? session.map((session) => session.id) : []
    );
  };

  const handleSelectOneSession = (event, sessionId) => {
    if (!selectedSession.includes(sessionId)) {
      setSelectedSession((prevSelected) => [...prevSelected, sessionId]);
    } else {
      setSelectedSession((prevSelected) =>
        prevSelected.filter((id) => id !== sessionId)
      );
    }
  };

  const enableBulkActions = selectedSession.length > 0;
  const selectedSomeSession =
    selectedSession.length > 0 && selectedSession.length < session.length;
  const selectedAllSession = selectedSession.length === session?.length;


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
          checked={selectedAllSession}
          indeterminate={selectedSomeSession}
          onChange={handleSelectAllSession}
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
                  checked={selectedAllSession}
                  indeterminate={selectedSomeSession}
                  onChange={handleSelectAllSession}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell >Team Name</TableCell>
              <TableCell>Coach Name</TableCell>
              <TableCell >Session Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              <>
              <SessionListTableLoader total={[1,2,3,4]} />
              <SessionListTableLoader total={[1,2,3,4]} />
              <SessionListTableLoader total={[1,2,3,4]} />
              <SessionListTableLoader total={[1,2,3,4]} />
              </>
            }
            {session?.map((session) => {
              const isSessionelected = selectedSession.includes(
                session.id
              );
              return (
                <TableRow hover key={session.id} selected={isSessionelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSessionelected}
                      onChange={(event) =>
                        handleSelectOneSession(event, session.id)
                      }
                      value={isSessionelected}
                    />
                  </TableCell>
                  <TableCell>
                  {`${session.coachingSessionId}`}
                  </TableCell>
                  <TableCell>
                  {`${session.teamName}`}
                  </TableCell>
                  <TableCell>
                  {`${session.coacheeName}`}
                  </TableCell>
                  <TableCell>
                      {session.coahingSessionDateTime}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={sessionCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      </div>
  );
};

SessionListTable.propTypes = {
  session: PropTypes.array.isRequired,
  sessionCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
