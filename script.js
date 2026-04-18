fetch("data.json")
  .then(res => res.json())
  .then(data => drawTree(data));

function drawTree(data) {
  const width = 1000;
  const height = 600;

  const svg = d3.select("#tree")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom().on("zoom", function (event) {
      svgGroup.attr("transform", event.transform);
    }));

  const svgGroup = svg.append("g");

  const root = d3.hierarchy(data);

  const treeLayout = d3.tree().size([width, height]);
  treeLayout(root);

  svgGroup.selectAll("line")
    .data(root.links())
    .enter()
    .append("line")
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y)
    .attr("stroke", "#555");

  svgGroup.selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 10)
    .attr("fill", "green");

  svgGroup.selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .attr("x", d => d.x + 12)
    .attr("y", d => d.y + 4)
    .text(d => d.data.name);
}