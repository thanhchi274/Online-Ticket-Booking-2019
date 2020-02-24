import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ScrollableTabsButtonAutoBHD from "./dateShowBHD";
import { connect } from "react-redux";
import * as Action from "../redux/action";

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
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.getTheaterInfo();
  }, []);

  const renderRap = () => {
    if (props.theaterInfo) {
      return props.theaterInfo.map((item, index) => {
        return (
          <Tab
            key={index}
            label={
              <img src={item.logo} alt="logo rạp" className="theaterIcon" />
            }
            id={item.maHeThongRap}
            {...a11yProps(index)}
          />
        );
      });
    }
  };

  const renderRapContent = () => {
    if (props.movie.lichChieu) {
      return props.movie.lichChieu.map((item, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            {<ScrollableTabsButtonAutoBHD movie={props.movie} />}
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
        aria-label="Vertical tabs example"
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
