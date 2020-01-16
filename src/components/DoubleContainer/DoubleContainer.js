import React from 'react';
import ReactDom from 'react-dom';
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import { Toolbar } from '@material-ui/core';

const _horizontal_separator = "10px";
const _left_container_width_up_md  = "calc( 50% - ("+_horizontal_separator+"/2))";
const _left_container_width_down_md = "100%";
const _right_container_width_up_md = "calc( 100% - "+_left_container_width_up_md+" - ("+_horizontal_separator+"/2))";
const _right_container_width_down_md = "100%";


const useStyles = theme => ({
  'container': {
    flexGrow: 1,
    "overflow": "hidden",
  },
  'item': props => ({
    "&:nth-child(1)":{
      "float": "left",
      "width": _left_container_width_up_md,
      [theme.breakpoints.down('md')]:{
        "width": _left_container_width_down_md,
      }
    },
    "&:nth-child(2)":{
      "float": "right",
      "width": _right_container_width_up_md,
      "margin-left": "calc("+_horizontal_separator+"/2)",
      [theme.breakpoints.down('md')]: {
        "width": _right_container_width_down_md
      },
      
    },
  }),
  'item_toolbar': {
    "height": "49px",
    "min-height" : "49px",
    "max-height" : "49px"
  },
  'item_content': {
    "height": "100vh",
    "min-height": "100vh",
    "max-height": "100vh", 
    [theme.breakpoints.down('md')]: {
      "height" : "50vh",
      "min-height": "50vh",
      "max-height": "50vh",
    },
    "&.below_toolbar" : {
      "height" : "calc( 100vh - 49px )",
      "min-height": "calc( 100vh - 49px )",
      "max-height": "calc( 100vh - 49px )",
      [theme.breakpoints.down('md')]: {
        "height" : "calc( 50vh - 49px )",
        "min-height": "calc( 50vh - 49px )",
        "max-height": "calc( 50vh - 49px )",
      }
    },
    "overflow-y": "scroll",
  }
});



class DoubleContainer extends React.Component {

  render() {
    // Get classes
    const { classes } = this.props;
    // If the current element is a "container"
    if (this.props.container){
      return (
        <div className={classes.container}> 
          {this.props.children}
        </div>
      ) 
    }
    // If the current element is an "item"
    if (this.props.item){
      // Get Children element
      let childrenElements = Array.isArray(this.props.children) ? this.props.children :
                              (this.props.children != null) ? [this.props.children] : [];
      // Handle Toolbar element
      let hasToolbar = childrenElements.length > 0 && childrenElements[0].type === Toolbar;
      let toolbar = (hasToolbar)? React.cloneElement(childrenElements[0], { className: childrenElements[0].props.className + " " + classes.item_toolbar}) : null; 
      // Handle Content 
      let content = (hasToolbar)? childrenElements.slice(1) : childrenElements;
      let box = (content.length === 1 && content.type === Box)? content :
        React.createElement(Box, {className: classes.item_content + ((hasToolbar)? " below_toolbar" : "") }, content);
      // Render Element
      if (hasToolbar){
        return (
          <div className={classes.item}>
            {toolbar}
            {box} 
          </div>
        )
      } else{
        return (
          <div className={classes.item}>
            {box}
          </div>
        )
      }
    }
    // If it's neither container or item, just render the thing
    return <div>{this.props.children}</div>

  }
}

export default withStyles(useStyles)(DoubleContainer);

