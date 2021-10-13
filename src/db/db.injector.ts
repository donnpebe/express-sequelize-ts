import { DependencyContainer } from 'tsyringe';
import { UserRepo } from './repositories/user.repo';
import { ProjectRepo } from './repositories/project.repo';

export function register(container: DependencyContainer) {
  container.register('IUserRepo', UserRepo);
  container.register('IProjecRepo', ProjectRepo);
}
