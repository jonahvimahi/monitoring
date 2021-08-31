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
app.use('/style', express.static("./public/styles.css"))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("html file served successfully.");
});
app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Jonah'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error("no name given")
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error("student already exists")
        res.status(400).send('that student already exists')
    }

})

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`we are up and running on ${port}`));
