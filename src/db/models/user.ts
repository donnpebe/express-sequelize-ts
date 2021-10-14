import {
  Column,
  DataType,
  Table,
  Model,
  IsUUID,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  IsEmail,
  BelongsToMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Project } from './project';
import { ProjectAssignment } from './project-assignment';

@Table({
  timestamps: true,
  modelName: 'User',
  tableName: 'Users',
})
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: () => {
      return uuidv4();
    },
    allowNull: false,
  })
  id: string;

  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  salt: string;

  @BelongsToMany(() => Project, () => ProjectAssignment)
  projects: Array<Project & { ProjectAssignment: ProjectAssignment }>;

  @Column
  @CreatedAt
  createdAt: Date;

  @Column
  @UpdatedAt
  updatedAt: Date;
}
