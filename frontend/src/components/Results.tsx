import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { Box, Paper } from "@mui/material";

import ScatterPlot from "./ScatterPlot";
import "../sass/_results.scss";

const Results = () => {
  let currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  let sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [startDate, setStartDate] = useState<Moment | null>(
    moment(sevenDaysAgo)
  );
  const [endDate, setEndDate] = useState<Moment | null>(moment(currentDate));
  return (
    <Paper className="ExistingUsagesContainer" elevation={3}>
      <Box className="DatePickerContainer">
        <DatePicker
          label="Start Date"
          defaultValue={moment(sevenDaysAgo)}
          value={moment(startDate)}
          onChange={(e) => setStartDate(e)}
        />
        <DatePicker
          label="End Date"
          defaultValue={moment(currentDate)}
          value={moment(endDate)}
          onChange={(e) => setEndDate(e)}
        />
      </Box>
      <Box className="ResultsContainer">
        <ScatterPlot
          startDate={startDate!.toDate()}
          endDate={endDate!.toDate()}
        />
      </Box>
    </Paper>
  );
};

export default Results;
