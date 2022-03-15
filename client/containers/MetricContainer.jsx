import React, { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import Metric from "../components/Metric";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentEndpoint,
  changeMetric,
  getCurrentMetric,
  addRunValue,
} from "../store/currentViewSlice";
import {
  selectOverallScoreByEndpoint,
  selectRunList,
} from "../store/dataSlice.js";

const MetricContainer = () => {
  const dispatch = useDispatch();
  const currentMetric = useSelector(getCurrentMetric);
  const currentEndpoint = useSelector(getCurrentEndpoint);
  const overallScore = useSelector((state) =>
    selectOverallScoreByEndpoint(state, currentEndpoint)
  );
  const runList = useSelector(selectRunList);
  const mostRecentRun = runList[runList.length - 1];
  const mostRecentOverallScore = overallScore[mostRecentRun];

  //Set the selected run to the latest initially
  useEffect(() => {
    dispatch(addRunValue(runList[runList.length - 1]));
  }, []);

  const handleClick = (metric) => {
    dispatch(changeMetric(metric));
  };

  return (
    <div id='metric-container'>
      <Paper>
        <div className='metric-container-inner'>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Metric
              name={"Performance"}
              value={mostRecentOverallScore.performance * 100}
              handleClick={handleClick}
              isActive={currentMetric === "Performance"}
            />
            <Metric
              name={"SEO"}
              value={mostRecentOverallScore.seo * 100}
              handleClick={handleClick}
              isActive={currentMetric === "SEO"}
            />
            <Metric
              name={"Best Practices"}
              value={mostRecentOverallScore["best-practices"] * 100}
              handleClick={handleClick}
              isActive={currentMetric === "Best Practices"}
            />
            <Metric
              name={"Accessibility"}
              value={mostRecentOverallScore.accessibility * 100}
              handleClick={handleClick}
              isActive={currentMetric === "Accessibility"}
            />
            {/* <Metric name={"PWA"} value={mostRecentOverallScore.pwa * 100} /> */}
          </Box>
        </div>
      </Paper>
    </div>
  );
};

export default MetricContainer;
