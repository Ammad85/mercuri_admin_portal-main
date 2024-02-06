import {
  Skeleton,
  TableCell,
  TableRow,
} from "@mui/material";

export const CompetencyListTableLoader = ({total}) => {

  return (
            <TableRow >
                  <TableCell padding="checkbox">
                    <Skeleton variant="square" animation="wave" width={20} height={20} sx={{marginLeft: "10px"}} />
                  </TableCell>
              
              <TableCell>
              <Skeleton variant="rectangular" animation="wave" width={"100%"} height={20}/>
      </TableCell>
      <TableCell>
              <Skeleton variant="rectangular" animation="wave" width={"100%"} height={20}/>
      </TableCell>
      {total > 2 &&<>
      <TableCell>
      <Skeleton variant="rectangular" animation="wave" width={"100%"} height={20}/>
        </TableCell>
        <TableCell>
        <Skeleton variant="rectangular" animation="wave" width={"100%"} height={20}/>
      </TableCell></>
      }
      {total > 4 &&<>
      <TableCell>
      <Skeleton variant="rectangular" animation="wave" width={"100%"} height={20}/>
        </TableCell>
      </>
      }
          </TableRow>
  );
};
