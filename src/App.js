import React from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { sizing } from '@material-ui/system';
import { makeStyles, useTheme } from '@material-ui/core/styles';



import { DataGrid } from 'tubular-react';
import { ColumnModel } from 'tubular-common';
import './App.css';
import { red } from '@material-ui/core/colors';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menu_drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  main_container: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1
  },
  left_container: {
    "float": "left",
    "width": "calc(100% - 50%)",
    "background": "red",
    "min-height": "100vh",
    "max-height": "100vh",
    "overflow-y": "auto",
    "overflow-x": "hidden",
    [theme.breakpoints.down('md')]: {
      "background": "green",
      "width": "100%",
      "min-height": "50vh",
      "max-height": "50vh",
      "height": "50vh"
    }
  },
  right_container:{
    "float": "right",
    "width": "50%",
    "min-height": "100vh",
    "max-height": "100vh",
    "overflow-y": "auto",
    "overflow-x": "hidden",
    [theme.breakpoints.down('md')]: {
      "background": "green",
      "width": "100%",
      "min-height": "50vh",
      "max-height": "50vh",
      "height": "50vh"
    },
  }
}));


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



function XLSXTable(prop){
  

}

function App() {
  const classes = useStyles();


  return (

    <div className={classes.root}>
      <Drawer
        className={classes.menu_drawer} 
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      <div className={classes.main_container}>
        <div className={classes.left_container}>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={classes.right_container}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lorem mauris. Nulla fermentum tincidunt nulla et dignissim. In porttitor sem id velit lobortis aliquam. Duis et purus ac orci porttitor luctus at quis leo. Mauris vulputate pellentesque est, sit amet egestas tellus facilisis sit amet. Cras sodales bibendum tellus, a gravida tortor hendrerit sed. Pellentesque blandit posuere nisl, sit amet cursus nisl dignissim non.

Vivamus at orci sit amet elit lacinia posuere sit amet malesuada elit. Duis quis luctus magna. Phasellus pharetra urna a dolor vulputate ultrices. Nam ornare orci justo, et fringilla lacus. Etiam tristique enim sed enim tempus tincidunt. Fusce rutrum dui at erat iaculis suscipit. Aenean id urna sit amet arcu pulvinar accumsan. Aenean malesuada, nisi sed ultricies tempus, elit nisl interdum leo, sit amet bibendum eros arcu pretium nisi. Nam magna dolor, lacinia adipiscing iaculis ac, viverra sit amet ligula. Fusce vitae est sit amet ipsum iaculis molestie a ac nisi. Curabitur porta nunc quis magna interdum nec hendrerit ligula suscipit. Curabitur non accumsan sapien. Donec non ligula a lorem lobortis scelerisque ac a sem. Sed porta blandit odio a ullamcorper.

Mauris in suscipit quam. Duis sit amet ipsum purus. Donec sed nunc lacus. Cras mattis felis quis lacus ultrices pharetra tristique nibh venenatis. In id eros sed libero iaculis commodo quis vitae neque. Nulla gravida neque in tortor congue id mattis massa auctor. Cras auctor tincidunt ipsum, in suscipit risus iaculis sed. Nulla at eros nec urna auctor tincidunt eu ac diam. Aenean nulla metus, accumsan eu dignissim vitae, congue sed nisl.

        </div>

      </div>
      
    </div>
  );
}

export default App;
