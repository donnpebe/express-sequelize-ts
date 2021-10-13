import { v4 as uuidv4 } from 'uuid';

export const users = [
  {
    id: uuidv4(),
    name: 'Fofana Fofo',
    email: 'fofana@example.com',
    // password123
    password:
      '$argon2i$v=19$m=4096,t=3,p=1$NmVmZWMzYTllYTkwNzM0OTUzNTkxYWY2ODcyYjhkZmE$3lfzmVNIiq6FgBk4Bxucv9CzHMgaFpl4u94Qfdoy4L4',
    salt: 'abc6efec3a9ea90734953591af6872b8dfa',
  },
  {
    id: uuidv4(),
    name: 'Famana Vuvu',
    email: 'famana@example.com',
    password:
      '$argon2i$v=19$m=4096,t=3,p=1$NmVmZWMzYTllYTkwNzM0OTUzNTkxYWY2ODcyYjhkZmE$3lfzmVNIiq6FgBk4Bxucv9CzHMgaFpl4u94Qfdoy4L4',
    salt: '6efec3a9ea90734953591af6872b8dfa',
  },
];
