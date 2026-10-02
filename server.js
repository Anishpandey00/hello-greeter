const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

function greetingFor(hour) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }
  if (url.pathname === "/api/greeting") {
    // Optional ?hour=0-23 lets the client send its own local hour
    const hourParam = parseInt(url.searchParams.get("hour"), 10);
    const hour = Number.isInteger(hourParam) && hourParam >= 0 && hourParam <= 23 ? hourParam : new Date().getHours();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ greeting: greetingFor(hour), hour }));
  }

  fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Server error");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`Greeter running on port ${PORT}`));

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
