import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import * as Action from "../redux/action";
import ScrollDateTime from "./NgayPhimRender"
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 540,

  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width:200
  }
}));

function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [rap,setRap]= React.useState("BHD");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const handleClick =(event,newValue)=>{
  setRap(event.target.id)
}

  useEffect(() => {
    props.getTheaterInfo();
  }, []);

  const renderRap = () => {
    if (props.theaterInfo) {
      return props.theaterInfo.map((item, index) => {
        return (
          <Tab
            key={index}
            label={<img id={item.maHeThongRap} src={item.logo} onClick={handleClick} className="theaterIcon" alt="theater-Icon" />}
            {...a11yProps(index)}
          />
        );
      });
    }
  };

  const renderRapContent = () => {
    console.log(rap)
    if (props.theaterInfo) {
      return props.theaterInfo.map((item, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            {<ScrollDateTime id={props.id} maRap={rap} />}
          </TabPanel>
        );
      });
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {renderRap()}
      </Tabs>
      {renderRapContent()}
    </div>
  );
}

const mapStateToProps = state => ({
  theaterInfo: state.movieReducer.theaterInfo
});

const mapDispatchToProps = dispatch => {
  return {
    getTheaterInfo: () => {
      dispatch(Action.actLayThongTinRap());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTabs);
