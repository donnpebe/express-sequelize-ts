import {
  Column,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user';
import { ProjectAssignment } from './project-assignment';

@Table({
  timestamps: true,
  modelName: 'Project',
  tableName: 'Projects',
})
export class Project extends Model {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @BelongsToMany(() => User, () => ProjectAssignment)
  users: Array<User & { ProjectAssignment: ProjectAssignment }>;

  @Column
  @CreatedAt
  createdAt: string;

  @Column
  @UpdatedAt
  updatedAt: string;
}
