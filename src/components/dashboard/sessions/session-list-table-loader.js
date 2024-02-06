import {
  Skeleton,
  TableCell,
  TableRow,
} from "@mui/material";

export const SessionListTableLoader = ({total}) => {

  return (
            <TableRow >
            <TableCell padding="checkbox">
              <Skeleton variant="square" animation="wave" width={20} height={20} sx={{marginLeft: "10px"}} />
            </TableCell>
      {total.map((t,index)  =>
        <TableCell key={index}>
          <Skeleton variant="rectangular" animation="wave" width={"100%"} height={20} />
        </TableCell>
      )}
          </TableRow>
  );
};
