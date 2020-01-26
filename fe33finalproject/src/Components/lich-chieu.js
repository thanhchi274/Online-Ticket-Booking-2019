import React from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ScrollableTabsButtonAutoBHD from "./dateShowBHD";

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

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const renderHTML = () => {
  //   console.log(props.movie);
  //   if (props.movie.lichChieu) {
  //     return props.movie.lichChieu.map((item, index) => {
  //       return (
  //         <div key={index}>
  //           <TabPanel value={value} index={0}>
  //             <Link
  //               className="btn btn-success"
  //               to={`/dat-ve/${item.maLichChieu}`}
  //             >
  //               {new Date(item.ngayChieuGioChieu).toLocaleDateString()}
  //             </Link>
  //           </TabPanel>
  //           <TabPanel value={value} index={1}>
  //             Item Two
  //           </TabPanel>
  //         </div>
  //       );
  //     });
  //   }
  // };

  return (
    <div className={classes.root} style={{ width: "93%" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          label={
            <img alt="movie-theater1"
              src="https://s3img.vcdn.vn/123phim/2018/09/f32670fd0eb083c9c4c804f0f3a252ed.png"
              className="theater-icon"
            />
          }
          {...a11yProps(0)}
        />
        ;
        <Tab
          label={
            <img alt="movie-theater2"
              src="https://s3img.vcdn.vn/123phim/2018/09/1721cfa98768f300c03792e25ceb0191.png"
              className="theater-icon"
            />
          }
          {...a11yProps(1)}
        />
        ;
      </Tabs>
      <TabPanel value={value} index={0}>
        {<ScrollableTabsButtonAutoBHD movie={props.movie} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {<ScrollableTabsButtonAutoBHD movie={props.movie} />}
      </TabPanel>
    </div>
  );
}
