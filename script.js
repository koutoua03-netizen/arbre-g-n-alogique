fetch("data.json")
  .then(res => res.json())
  .then(data => renderTree(data));

function renderTree(data) {
  const width = 1200;
  const height = 700;

  const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom().on("zoom", (event) => {
      svgGroup.attr("transform", event.transform);
    }));

  const svgGroup = svg.append("g");

  const root = d3.hierarchy(data);

  const treeLayout = d3.tree().size([width - 200, height - 200]);
  treeLayout(root);

  // liens
  svgGroup.selectAll(".link")
    .data(root.links())
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("x1", d => d.source.x + 100)
    .attr("y1", d => d.source.y + 100)
    .attr("x2", d => d.target.x + 100)
    .attr("y2", d => d.target.y + 100);

  // nodes
  const nodes = svgGroup.selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x + 100},${d.y + 100})`);

  // avatars
  nodes.append("circle")
    .attr("r", 25)
    .attr("fill", d => d.data.gender === "female" ? "#ff69b4" : "#3498db");

  // texte
  nodes.append("text")
    .attr("dy", 45)
    .attr("text-anchor", "middle")
    .text(d => d.data.name);
}
