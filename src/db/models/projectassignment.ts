import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import connection from '..';
import User from './user';
import Project from './project';

interface ProjectAssignmentAttributes {
  projectId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectAssignmentOptionalAttributes = 'createdAt' | 'updatedAt';

export default class ProjectAssignment
  extends Model<
    ProjectAssignmentAttributes,
    Optional<ProjectAssignmentAttributes, ProjectAssignmentOptionalAttributes>
  >
  implements ProjectAssignmentAttributes
{
  projectId!: string;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

ProjectAssignment.init(
  {
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Project',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    modelName: 'ProjectAssignment',
  }
);

Project.belongsToMany(User, {
  foreignKey: 'projectId',
  through: 'ProjectAssignments',
});

User.belongsToMany(Project, {
  foreignKey: 'userId',
  through: 'ProjectAssignments',
});
