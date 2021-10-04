export const projectassignments = (projectIds: string[], userIds: string[]) => {
  let assignments: Array<{ projectId: string; userId: string }> = [
    {
      projectId: projectIds[0],
      userId: userIds[0],
    },
    {
      projectId: projectIds[1],
      userId: userIds[0],
    },
    {
      projectId: projectIds[1],
      userId: userIds[1],
    },
    {
      projectId: projectIds[2],
      userId: userIds[1],
    },
  ];

  return assignments;
};
