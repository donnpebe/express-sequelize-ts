import {
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  ForeignKey,
  IsUUID,
  Table,
  PrimaryKey,
} from 'sequelize-typescript';
import { Project } from './project';
import { User } from './user';
import { DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  modelName: 'ProjectAssignment',
  tableName: 'ProjectAssignments',
})
export class ProjectAssignment extends Model {
  @IsUUID(4)
  @PrimaryKey
  @ForeignKey(() => Project)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  projectId: string;

  @IsUUID(4)
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column
  @CreatedAt
  createdAt: Date;

  @Column
  @UpdatedAt
  updatedAt: Date;
}
