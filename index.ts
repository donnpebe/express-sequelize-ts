import express from 'express';
import db from './models';
import { users } from './seeders/users';
import { projects } from './seeders/projects';
import { projectassignments } from './seeders/projectassignments';

const seedUsers = async () => {
  const promises = users.map(async user => {
    await db.User.create(user);
  });

  await Promise.all(promises);
};

const seedProjects = async () => {
  const promises = projects.map(async project => {
    await db.Project.create(project);
  });

  await Promise.all(promises);
};

const seedProjectAssignments = async () => {
  const assigns = projectassignments(
    projects.map(p => p.id),
    users.map(u => u.id)
  );
  const promises = assigns.map(async asg => {
    await db.ProjectAssignment.create(asg);
  });

  await Promise.all(promises);
};

const app = express();
const port = process.env.PORT || 3001;

db.sequelize.sync({ force: true }).then(async () => {
  try {
    await seedUsers();
    await seedProjects();
    await seedProjectAssignments();
  } catch (err) {
    console.log(err);
    console.log('seed already applied');
  }
  app.listen(port, () => {
    console.log(`App listerning on port ${port}`);
  });
});
