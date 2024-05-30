import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  ChartData,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

import { getUsages } from "src/api";
import { DataPoint, Unit } from "src/types";
import { convertQuantity, getDisplayString, toaster } from "src/utils";
import { useUsage } from "src/UsageContext";
import "../sass/_scatterPlot.scss";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

interface ScatterPlotProps {
  startDate: Date;
  endDate: Date;
}

const ScatterPlot = ({ startDate, endDate }: ScatterPlotProps) => {
  const { refreshKey } = useUsage();
  const [datapoints, setDatapoints] = useState<Array<DataPoint>>([]);
  const [dataset, setDataset] = useState<ChartData<"scatter">>({
    datasets: [],
  });
  const [axisUnits, setAxisUnits] = useState<Unit>(Unit.KILO_WATT_HOURS);

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function (value: any) {
            const date = new Date(value);

            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const year = date.getFullYear();

            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");

            return `${month}-${day}-${year} ${hours}:${minutes}`;
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dataIndex = context.dataIndex;
            const value = `${context.dataset.data[dataIndex].y} ${axisUnits}`;

            return value;
          },
        },
      },
    },
  };

  useEffect(() => {
    const datasets = [
      {
        label: "Energy Usage",
        data: datapoints.map((dp) => {
          return {
            x: new Date(dp.created_at).getTime(),
            y: convertQuantity(dp.quantity, dp.unit, axisUnits),
          };
        }),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ];
    setDataset({ datasets });
  }, [refreshKey, datapoints, axisUnits]);

  useEffect(() => {
    const fetchData = () => {
      getUsages({
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      })
        .then((data) => {
          setDatapoints(data);
        })
        .catch((error) => {
          toaster("Could not fetch usages", false);
        });
    };

    fetchData();
  }, [refreshKey, startDate, endDate]);

  return (
    <Box
      sx={{
        height: 450,
        width: 700,
      }}
    >
      <Box className="ChartUnits">
        <FormControl>
          <InputLabel id="unit-label">Axis Units</InputLabel>
          <Select
            labelId="unit-label"
            value={axisUnits}
            onChange={(e) => setAxisUnits(e.target.value as Unit)}
          >
            {Object.values(Unit).map((unit) => {
              return (
                <MenuItem key={unit} value={unit}>
                  {getDisplayString(unit)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {datapoints.length > 0 ? (
        <Scatter options={options} data={dataset} />
      ) : (
        <Box className="NoData" fontSize="italic">
          No Data to Display for this Date Range
        </Box>
      )}
    </Box>
  );
};

export default ScatterPlot;
