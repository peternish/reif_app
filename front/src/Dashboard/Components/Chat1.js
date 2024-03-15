import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

 
export default function Chart1(props) {
    const title = props.title;
    const squareColor = (title === "Deposite") ? "bg-primary" : "bg-secondary";
    const data = props.detailData;
    const chartConfig = {
        type: "line",
        height: 240,
        series: [
          {
            name: "Sales",
            data: data,
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          title: {
            show: "",
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["red"],
          stroke: {
            lineCap: "round",
            curve: "smooth",
          },
          markers: {
            size: 0,
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: {squareColor},
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
            categories: [
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          yaxis: {
            labels: {
              style: {
                colors: {squareColor},
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
          },
          grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
            color: "red"
          },
          tooltip: {
            theme: "dark",
          },
        },
      };


  return (
    <Card className="mb-5">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className={`w-max rounded-lg ${squareColor} p-5 text-white`}>
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            {title}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            {title} history last few month ago
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}