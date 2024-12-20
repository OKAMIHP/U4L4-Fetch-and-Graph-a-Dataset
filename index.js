let data = [];

async function getdata() {
  const txt = await (await fetch("NVIDIA_STOCK.csv")).text();
  data = txt
    .split("\n")
    .map((d) => d.split(","))
    .slice(1)
    .filter((row) => row.length > 3);
}

getdata().then(() => {
  new Chart(document.getElementById("temperatureChart"), {
    type: "line",
    data: {
      labels: data.map((d) => d[0]),
      datasets: [
        {
          label: "Revenue (millions)",
          data: data.map((d) => parseFloat(d[2])),
          borderWidth: 3,
          backgroundColor: "#ff00d4",
          borderColor: "#550370",
        },
        {
          label: "Profit (millions)",
          data: data.map((d) => parseFloat(d[3])),
          borderWidth: 3,
          backgroundColor: "#550370",
          borderColor: "#ff00d4",
        },
        {
          label: "Spent (millions)",
          data: data.map((d) => parseFloat(d[2]) - parseFloat(d[3])),
          borderWidth: 3,
          backgroundColor: "#ffffff",
          borderColor: "#000000",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "NVIDIA Stock Price Analysis",
          font: { size: 18 },
        },
        legend: { display: true, position: "top" },
      },
      scales: {
        x: { title: { display: true, text: "Date" } },
        y: { title: { display: true, text: "Amount (millions)" } },
      },
    },
  });
});
