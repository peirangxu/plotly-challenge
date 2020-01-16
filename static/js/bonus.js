//Gauge Chart
function unpackWfreq(data, idSelected) {
  var selected = data.metadata.filter(x => x.id === idSelected);
  var wfreq = selected[0].wfreq;

  return wfreq;
}

// Setting up data and layout for gauge plot
function gaugePlot(selectedWfreq) {
  // Trig to calc meter point
  var degrees = 180 - selectedWfreq * 20;
  radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path
  var mainPath = "M -.0 -0.05 L .0 0.05 L ",
    pathX = String(x),
    space = " ",
    pathY = String(y),
    pathEnd = " Z";
  var path = mainPath.concat(pathX, space, pathY, pathEnd);
  console.log(path);

  data3 = [
    {
      type: "category",
      x: [0],
      y: [0],
      marker: { size: 10, color: "850000" },
      showlegend: false,
      name: "scrubs/week",
      hoverinfo: "name"
    },

    {
      type: "pie",
      showlegend: false,
      hole: 0.5,
      rotation: 90,
      values: [
        81 / 9,
        81 / 9,
        81 / 9,
        81 / 9,
        81 / 9,
        81 / 9,
        81 / 9,
        81 / 9,
        81 / 9,
        81
      ],
      text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
      direction: "clockwise",
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          "rgba(240, 230, 215, .5)",
          "rgba(232, 226, 202, .5)",
          "rgba(210, 206, 145, .5)",
          "rgba(202, 209, 95, .5)",
          "rgba(170, 202, 42, .5)",
          "rgba(110, 154, 22, .5)",
          "rgba(14, 127, 0, .5)",
          "rgba(10, 120, 22, .5)",
          "rgba(0, 105, 11, .5)",
          "white"
        ]
      },
      labels: [
        "0-1",
        "1-2",
        "2-3",
        "3-4",
        "4-5",
        "5-6",
        "6-7",
        "7-8",
        "8-9",
        ""
      ],
      hoverinfo: "label"
    }
  ];

  var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    title: {
      text: "<b>Belly Button Washing Frequency</b> <br>Scrubs per Week",
      xref: "paper"
    },
    height: 600,
    width: 700,
    margin: {
      t: 200,
      r: 100
    },
    xaxis: {
      type: "category",
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      type: "category",
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };
  return [data3, layout];
}
