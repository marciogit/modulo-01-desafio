const express = require('express');
const app = express();
app.use(express.json());

const projects = [
    { 
        id: 0, 
        title: "Flower Store", 
        tasks:[
            "Front End",
            "Refine Images"
        ]
    },{
        id: 1,
        title: "Bank Statements",
        tasks: [
            "Create new secure route",
            "Push to git"
        ]
    }
]

function checkIfProjectExists (req, res, next) {
    const { id } = req.params;
    const project = projects.find(i => i.id == id);

    if(!project) {
        return res.status(400).json({ msg: "Project does not exist "});
    }

    return next();
}

function logRequests (req, res, next) {
    console.log("Request");
    next();
    return next();
}

app.use(logRequests);


// Mostra a lista de todos os projetos
// Show a list of all projects
app.get('/get', (req, res) => {
    return res.json(projects);
})

// Cria um novo projeto
// Create a new project
app.post('/projects', (req, res) => {
    const { id, title } = req.body;
    const project = { id, title, tasks: []}
    projects.push(project);
    return res.json(project);
})


// Cria uma tarefa para um projeto
// Add a new task to a project
app.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const project = projects.find(v => v.id == id);
    project.tasks.push(title);
    return res.json(project);
})

// Altera o titulo de um projeto baseado no id informado
// Change the project title based on id
app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const project = projects.find(m => m.id == id);
    project.title = title
    return res.json(project);
})

app.listen(3000);