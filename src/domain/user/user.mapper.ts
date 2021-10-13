import { UserDomain } from './user.domain';
import { UserDto } from './user.dto';

export class UserMapper {
  static toUserDto(user: UserDomain): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
