type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface UserDomain {
  id: string;
  email: string;
  password: string;
  salt: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserDomain = Optional<UserDomain, 'id' | 'createdAt' | 'updatedAt'>;
