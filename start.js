const { exec } = require("child_process");

const serverProcess = exec("node Server/server.js");
serverProcess.stdout.on("data", (data) => console.log(`Server: ${data}`));
serverProcess.stderr.on("data", (data) => console.error(`Server Error: ${data}`));

const frontendProcess = exec("node src/app.js");
frontendProcess.stdout.on("data", (data) => console.log(`Frontend: ${data}`));
frontendProcess.stderr.on("data", (data) => console.error(`Frontend Error: ${data}`));
