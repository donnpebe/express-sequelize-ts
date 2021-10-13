import { ProjectDomain } from '../../domain/project/project.domain';

export interface IProjectRepo {
  create(project: ProjectDomain): Promise<ProjectDomain>;
}
