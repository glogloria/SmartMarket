import ApexCharts from "apexcharts";

// ===== chartFour
const chart04 = () => {
  const chartFourOptions = {
    series: [35, 25, 15, 12, 8, 5],
    labels: ["Dairy", "Produce", "Bakery", "Deli", "Frozen", "Other"],
    colors: ["#22C55E", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#94A3B8"],
    chart: {
      type: "donut",
      height: 320,
      fontFamily: "Outfit, sans-serif",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      markers: {
        radius: 12,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "% waste";
        },
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 280,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSelector = document.querySelectorAll("#chartFour");

  if (chartSelector.length) {
    const chartFour = new ApexCharts(
      document.querySelector("#chartFour"),
      chartFourOptions,
    );
    chartFour.render();
  }
};

export default chart04;
