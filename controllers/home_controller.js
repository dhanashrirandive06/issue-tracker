// import Project Schema from Model
const Project = require("../models/project");

// redirect to home page
module.exports.home = async (req, res) => {
  try {
    const projects = await Project.find({});
    return res.render("home", {
      title: "Home",
      projects: projects,
    });
  } catch (error) {
    console.log("Error in create Project", error);
  }
};

//redirect to createProject page
module.exports.createproject = (req, res) => {
  return res.render("createproject", {
    title: "Home",
  });
};

//create Project and redirect to home page
module.exports.create = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const project = new Project({
      title: title,
      author: author,
      description: description,
    });

    await project.save();
    const projects = await Project.find({});
    return res.render("home", {
      title: "Home",
      projects: projects,
    });
  } catch (error) {
    console.log("Error in create Project", error);
  }
};

//redirect to createissue page
module.exports.createissue = (req, res) => {
  const id = req.params;
  return res.render("createissue", {
    title: "Create issue",
    projectId: id,
  });
};

//redirect to project details page after clicking particular project on home page
module.exports.projectdetails = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    return res.render("projectdetails", {
      title: "projectdetails",
      projectId: id,
      projectDetails: project,
      issues: project.issues,
    });
  } catch (error) {
    console.log("Error in Project details", error);
  }
};

//create Issue and redirect to project details page
module.exports.createIssue = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  project.issues.push({
    issueTitle: req.body.issueTitle,
    issueAuthor: req.body.issueAuthor,
    issueDesc: req.body.issueDesc,
    issueLabel: req.body.issueLabel,
  });

  await project.save();

  return res.render("projectDetails", {
    title: "Project Details",
    projectId: id,
    projectDetails: project,
    issues: project.issues,
  });
};

//show all the issues on projectDetails page
module.exports.showAll = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  return res.render("projectDetails", {
    title: "Details",
    projectId: id,
    projectDetails: project,
    issues: project.issues,
  });
};

//filter issues by label or author
module.exports.filterIssue = async (req, res) => {
  const { id } = req.params;
  const { label, author } = req.body;
  const project = await Project.findById(id);
  const issues1 = project.issues.filter((issue) => {
    let isContain = false;
    issue.issueLabel.forEach((element) => {
      if (label.includes(element)) {
        isContain = true;
      }
    });
    if (isContain) {
      return issue;
    }
  });
  const issues2 = project.issues.filter((issue) => {
    if (issue.issueAuthor.includes(author)) {
      return issue;
    }
  });

  const issues = [...issues1, ...issues2];
  return res.render("projectDetails", {
    title: "Details",
    projectId: id,
    projectDetails: project,
    issues: issues,
  });
};

//search issue by issue Title or issue Description
module.exports.searchIssue = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  const issues1 = project.issues.filter((issue) => {
    const title = issue.issueTitle.toLowerCase();
    const inputTitle = req.body.inputTitle.toLowerCase();
    const isTitle = title.includes(inputTitle);
    if (isTitle) {
      return issue;
    }
  });
  const issues2 = project.issues.filter((issue) => {
    const desc = issue.issueDesc.toLowerCase();
    const inputDesc = req.body.inputDesc.toLowerCase();
    const isDesc = desc.includes(inputDesc);
    if (isDesc) {
      return issue;
    }
  });

  const issues = [...issues1, ...issues2];

  return res.render("projectDetails", {
    title: "Details",
    projectId: id,
    projectDetails: project,
    issues: issues,
  });
};
