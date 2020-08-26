const express = require("express");
const cors = require("cors");


const {uuid, isUuid} = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
    const { url, title,techs } = request.body;
    if( isValid(url) && isValid(title) && techs.length > 0){
        const repository = {
            id: uuid(),
            url,
            title,
            techs,
            likes:0,
        }
        repositories.push(repository);
        return response.json(repository);
    }
    return response.status(400).json({error: "Invalid data to create new repository."});
});

app.put("/repositories/:id", (request, response) => {
  // TODO
    const {id} = request.params;
    const { url, title, techs, likes} = request.body;
    let repository = {};

    if(isUuid(id)) {
        const repositoryIndex = repositories.findIndex(r => r.id == id);
        if(repositoryIndex >= 0 && !likes){
            repository = {
                id,
                url,
                title,
                techs,
            }
            repositories[repositoryIndex] = repository;

        }
        else {
            repository = {
                id,
                likes:0,
            }
            repositories[repositoryIndex] = repository;
        }
        return response.json(repository);
    }

    return response.status(400).json({error: "Repository not found"});
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
    const {id} = request.params;
    if(isUuid(id)) {
        const repositoryIndex = repositories.findIndex(r => r.id == id);
        if( repositoryIndex >= 0) {
            repositories.splice(repositoryIndex,1);
            return response.status(204).send();
        }

    }
    return response.status(400).json({error: "Repository not found"});
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
    const {id} = request.params;
    if(isUuid(id)) {
        let repositoryNew = {}
        const repositoryIndex = repositories.findIndex(r => r.id == id);
        repository = repositories[repositoryIndex]
        repositoryNew = {
            id: repository.id,
            url: repository.url,
            title: repository.title,
            techs: repository.techs,
            likes:repository.likes+1,
        }
        repositories.splice(repositoryIndex,1);
        repositories.push(repositoryNew);
        return response.json(repositoryNew);
    }
    return response.status(400).json({error: "Repository not found"});
});
function isValid(value){
    return  null != value && '' !== value;
}

module.exports = app;
