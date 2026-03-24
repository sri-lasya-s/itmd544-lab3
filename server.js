const express = require("express");
const { OpenAPIBackend } = require("openapi-backend");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");

const app = express();
app.use(express.json());

let studies = [
  { id: "1", studyTitle: "Checkout Test", method: "UsabilityTest", participants: 10 },
  { id: "2", studyTitle: "Login Study", method: "Interview", participants: 5 },
  { id: "3", studyTitle: "Survey UX", method: "Survey", participants: 20 },
  { id: "4", studyTitle: "App Testing", method: "UsabilityTest", participants: 15 },
  { id: "5", studyTitle: "Onboarding Study", method: "Interview", participants: 8 }
];

const api = new OpenAPIBackend({
  definition: path.join(__dirname, "openapi.yaml"),
  validate: true,
});

api.register({

  StudyService_list: (c, req, res) => {
    res.json(studies);
  },

  StudyService_create: (c, req, res) => {
    const body = c.request.requestBody;

    const newStudy = {
      id: String(Date.now()),
      ...body
    };

    studies.push(newStudy);
    res.status(201).json(newStudy);
  },

  StudyService_get: (c, req, res) => {
    const id = c.request.params.id;
    const study = studies.find(s => s.id === id);

    if (!study) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(study);
  },


  StudyService_update: (c, req, res) => {
    const id = c.request.params.id;
    const study = studies.find(s => s.id === id);

    if (!study) {
      return res.status(404).json({ error: "Not found" });
    }

    Object.assign(study, c.request.requestBody);
    res.json(study);
  },


  StudyService_delete: (c, req, res) => {
    const id = c.request.params.id;
    const index = studies.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Not found" });
    }

    studies.splice(index, 1);
    res.json({ message: "Deleted" });
  },


  StudyService_active: (c, req, res) => {
    const activeStudies = studies.filter(s => s.participants > 0);
    res.json(activeStudies);
  },


  validationFail: (c, req, res) => {
    res.status(400).json({ error: "Bad Request" });
  },

  notFound: (c, req, res) => {
    res.status(404).json({ error: "Not Found" });
  },
});


api.init();


app.get("/openapi.yaml", (req, res) => {
  res.setHeader("Content-Type", "text/yaml");
  res.send(fs.readFileSync(path.join(__dirname, "openapi.yaml"), "utf-8"));
});


app.use("/docs", swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: { url: "/openapi.yaml" }
}));

app.use((req, res) => api.handleRequest(req, req, res));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});