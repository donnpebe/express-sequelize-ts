import { injectable } from 'tsyringe';
import { CreateUserDomain, UserDomain } from '../../domain/user/user.domain';
import { IUserRepo } from '../interfaces/user.repo.interface';
import { User } from '../models';

@injectable()
export class UserRepo implements IUserRepo {
  async emailExists(email: string): Promise<boolean> {
    if (email) {
      const existing = await User.findOne({ where: { email } });
      return !!existing;
    }

    return false;
  }

  async findByEmail(email: string): Promise<UserDomain | null> {
    return await User.findOne({ where: { email } });
  }

  async create(user: CreateUserDomain): Promise<UserDomain> {
    return await User.create(user);
  }
}
