import { v4 as uuidv4 } from 'uuid';

export const projects = [
  {
    id: uuidv4(),
    title: 'An Elegy About Hello World',
    status: 'active',
  },
  {
    id: uuidv4(),
    title: 'An Elegy About Getting Started',
    status: 'active',
  },
  {
    id: uuidv4(),
    title: 'A Beautiful Way To Express Helplessness',
    status: 'completed',
  },
];
