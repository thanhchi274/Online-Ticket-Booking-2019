import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

function ScrollableTabsButtonAutoBHD(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const renderHTML = () => {
    if (props.movie.lichChieu) {
      return props.movie.lichChieu.map(
        (item, index) => {
          if ((index + 6) % 6 === 0) {
            return (
              <Tab
                key={index}
                label={new Date(item.ngayChieuGioChieu).toLocaleDateString()}
                {...a11yProps(item.maLichChieu)}
              />
            );
          }
        },
        [(props.movie.lichChieu.length = 54)]
      );
    }
  };
  const renderTime = () => {
    if (props.movie.lichChieu ) {
      console.log(props.movie.lichChieu);
      return props.movie.lichChieu.map(
        (item, index) => {
          return (
            <TabPanel className="m-3" key={index} value={value} index={index}>
              <h5>{item.thongTinRap.tenCumRap}</h5>
              <div className="row" style={{ color: "grey" }}>
                <div className="text-center">
                  <h1>2D</h1>
                  <p>DIGITAL</p>
                </div>
                <Link
                  className="btn text-white ml-3"
                  style={{ backgroundColor: "rgb(170, 170, 52)" }}
                  to={`/dat-ve/${item.maLichChieu}`}
                >
                  {new Date(item.ngayChieuGioChieu).toLocaleTimeString()}
                </Link>
              </div>
            </TabPanel>
          );
        },
        [(props.movie.lichChieu.length = 54)]
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          style={{ width: "950px" }}
        >
          {renderHTML()}
        </Tabs>
      </AppBar>
      {renderTime()}
    </div>
  );
}

export default  (ScrollableTabsButtonAutoBHD)