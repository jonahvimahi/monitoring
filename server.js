const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "c5ddd9596e1c4017859997949cb9e7db",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const students = [];
const app = express();
app.use(express.json())


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("html file served successfully.");
});
app.post("/api/student", (req, res) => {
    const { name } = req.body;
    name = name.trim();
    
    students.push(name)
    
    rollbar.log('student added successfully', {author: "Jonah", type: 'manual entry'})
    
    res.status(200).send(students)
});

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`we are up and running on ${port}`));
