
import { Fragment } from 'react';
import { TableRow, TableCell, FormControlLabel, Checkbox, TableHead, Table } from "@mui/material";


const Filters = props => {



  return <Table>
      <TableHead>
        <TableRow>

              {props.filterList.map((f, i) =>

                  <TableCell key={i}>
                      <FormControlLabel
                          control={<Checkbox
                              onChange={props.onChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                              value={f.tag}
                          />}
                          label={f.tag}
                      />
                  </TableCell>
              )}
        </TableRow>
      </TableHead>
  </Table>

}

export default Filters
