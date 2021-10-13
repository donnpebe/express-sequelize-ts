import { CreateUserDomain, UserDomain } from '../../domain/user/user.domain';

export interface IUserRepo {
  create(user: CreateUserDomain): Promise<UserDomain>;
  emailExists(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<UserDomain | null>;
}
