import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

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

export const init = (sequelize: Sequelize): void => {
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
      sequelize,
      modelName: 'ProjectAssignment',
    }
  );
};
