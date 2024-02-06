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
import { CompetencyListTableLoader } from "./competency-list-table-loader";
import Link from "next/link";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";

export const CompetencyListTable = (props) => {
  const {
    competency,
    competencyCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    loading,
    ...other
  } = props;
  const [selectedCompetency, setSelectedCompetency] = useState([]);

  // Reset selected competency when competency change
  useEffect(
    () => {
      if (selectedCompetency.length) {
        setSelectedCompetency([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [competency]
  );

  const handleSelectAllCompetency = (event) => {
    setSelectedCompetency(
      event.target.checked ? competency.map((competency) => competency.id) : []
    );
  };

  const handleSelectOneCompetency = (event, competencyId) => {
    if (!selectedCompetency.includes(competencyId)) {
      setSelectedCompetency((prevSelected) => [...prevSelected, competencyId]);
    } else {
      setSelectedCompetency((prevSelected) =>
        prevSelected.filter((id) => id !== competencyId)
      );
    }
  };

  const enableBulkActions = selectedCompetency.length > 0;
  const selectedSomeCompetency =
    selectedCompetency.length > 0 && selectedCompetency.length < competency.length;
  const selectedAllCompetency = selectedCompetency.length === competency?.length;

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
          checked={selectedAllCompetency}
          indeterminate={selectedSomeCompetency}
          onChange={handleSelectAllCompetency}
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
                  checked={selectedAllCompetency}
                  indeterminate={selectedSomeCompetency}
                  onChange={handleSelectAllCompetency}
                />
              </TableCell>
              <TableCell>Competency Group</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Descritpion</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              <>
              <CompetencyListTableLoader total={4}/>
              <CompetencyListTableLoader total={4}/>
              <CompetencyListTableLoader total={4}/>
              <CompetencyListTableLoader total={4}/>
              </>
            }
            {competency?.map((competency) => {
              const isCompetencyelected = selectedCompetency.includes(
                competency.id
              );
              return (
                <TableRow hover key={competency.id} selected={isCompetencyelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCompetencyelected}
                      onChange={(event) =>
                        handleSelectOneCompetency(event, competency.id)
                      }
                      value={isCompetencyelected}
                    />
                  </TableCell>
                  <TableCell>
                  {`${competency.competencyGroup}`}
                  </TableCell>
                  <TableCell>
                  {`${competency.title}`}
                  </TableCell>
                  <TableCell>{competency.descritpion}</TableCell>
                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {competency.enabled? "true" : "false"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Link href={{pathname:'/dashboard/competencies/parameters/edit',query: {...competency} }}>
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
        count={competencyCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      </div>
  );
};

CompetencyListTable.propTypes = {
  competency: PropTypes.array.isRequired,
  competencyCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
