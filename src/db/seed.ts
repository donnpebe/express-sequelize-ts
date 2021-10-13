import dotenv from 'dotenv';
dotenv.config();

import { User, Project, ProjectAssignment } from './models';
import { users } from './seeders/users';
import { projects } from './seeders/projects';
import { projectassignments } from './seeders/projectassignments';

const seedUsers = async () => {
  const promises = users.map(async user => {
    await User.create(user);
  });

  await Promise.all(promises);
  console.log('users');
};

const seedProjects = async () => {
  const promises = projects.map(async project => {
    await Project.create(project);
  });

  await Promise.all(promises);
  console.log('projects');
};

const seedProjectAssignments = async () => {
  const assigns = projectassignments(
    projects.map(p => p.id),
    users.map(u => u.id)
  );
  const promises = assigns.map(async asg => {
    await ProjectAssignment.create(asg);
  });

  await Promise.all(promises);

  console.log('projectsass');
};

const runSeeder = async () => {
  await seedUsers();
  await seedProjects();
  await seedProjectAssignments();
};

if (require.main === module) {
  runSeeder().catch(e => console.error('An error occured when running the seeder tasks: ', e));
}
