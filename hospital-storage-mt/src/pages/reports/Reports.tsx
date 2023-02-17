import React from 'react'
import "./reportStyles.css";
import {useSelector} from "react-redux";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns: any[] = [
  { id: 'itemName', label: 'Name' },
  { id: 'itemTypeName', label: 'Type' },
  {
    id: 'price',
    label: 'Price',
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'total',
    label: 'Total',
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

const Reports = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const typeArray=useSelector((state:any)=>state.type.typeArray);
  const itemArray=useSelector((state:any)=>state.item.itemArray);
let newArray:any[]=[];
  for(let i=0;i<itemArray.length;i++){
      let currentObject=itemArray[i];
      for(let j=0;j<typeArray.length;j++){
        if(currentObject.itemType===typeArray[j]._id){
            let newObject={...currentObject,itemTypeName:typeArray[j].itemTypeName,total:Number(currentObject.price)*Number(currentObject.quantity)}
             newArray.push(newObject);
             break;
        }
      }
  }

  return (
    <div className='report'>
 <Paper sx={{ width: '100%',marginTop:"10px", overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{fontWeight:"bold"}}
                >
                  {column.label}
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {newArray
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row:any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column:any) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 50, 100]}
        component="div"
        count={newArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

    </div>
  )
}

export default Reports