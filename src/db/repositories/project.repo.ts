import { injectable } from 'tsyringe';
import { ProjectDomain } from '../../domain/project/project.domain';
import { IProjectRepo } from '../interfaces/project.repo.interface';

@injectable()
export class ProjectRepo implements IProjectRepo {
  async create(project: ProjectDomain): Promise<ProjectDomain> {
    return project;
  }
}
