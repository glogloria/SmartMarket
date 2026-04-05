import ApexCharts from "apexcharts";

// ===== chartThree
const chart03 = () => {
  const chartThreeOptions = {
    series: [
      {
        name: "Revenue",
        type: "area",
        data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
      },
      {
        name: "Waste",
        type: "column",
        data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
      },
    ],
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#F97316"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
      },
    },
    fill: {
      type: ["solid", "solid"],
      opacity: [0.15, 0.85],
    },
    stroke: {
      curve: "straight",
      width: [3, 2],
    },

    markers: {
      size: 4,
      hover: {
        sizeOffset: 2,
      },
    },
    labels: {
      show: false,
      position: "top",
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: function (val, { seriesIndex }) {
          return seriesIndex === 0 ? "$" + val + "k" : val + " lbs";
        },
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: false,
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartThree");

  if (chartSelector.length) {
    const chartThree = new ApexCharts(
      document.querySelector("#chartThree"),
      chartThreeOptions,
    );
    chartThree.render();

    const allRevenue = [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235];
    const allWaste = [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140];
    const allMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    // Listen for filter events from the toggle buttons
    document.addEventListener("chartThreeFilter", (e) => {
      const filter = e.detail;
      if (filter === "overview") {
        chartThree.showSeries("Revenue");
        chartThree.showSeries("Waste");
      } else if (filter === "revenue") {
        chartThree.showSeries("Revenue");
        chartThree.hideSeries("Waste");
      } else if (filter === "waste") {
        chartThree.hideSeries("Revenue");
        chartThree.showSeries("Waste");
      }
    });

    // Listen for month selection changes
    document.addEventListener("chartThreeMonths", (e) => {
      const indices = e.detail;
      const filteredMonths = indices.map(i => allMonths[i]);
      const filteredRevenue = indices.map(i => allRevenue[i]);
      const filteredWaste = indices.map(i => allWaste[i]);
      chartThree.updateOptions({
        xaxis: { categories: filteredMonths },
      });
      chartThree.updateSeries([
        { name: "Revenue", type: "area", data: filteredRevenue },
        { name: "Waste", type: "column", data: filteredWaste },
      ]);
    });
  }
};

export default chart03;
