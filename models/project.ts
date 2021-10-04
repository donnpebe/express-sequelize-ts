import { Model, Sequelize, Optional, DataTypes } from 'sequelize';

interface ProjectAttributes {
  id: string;
  title: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectOptionalAttributes = 'id' | 'createdAt' | 'updatedAt';

export default class Project
  extends Model<ProjectAttributes, Optional<ProjectAttributes, 'id'>>
  implements ProjectAttributes
{
  id!: string;
  title!: string;
  status!: string;

  createdAt!: Date;
  updatedAt!: Date;

  static associate(models: any) {
    Project.belongsToMany(models.User, {
      foreignKey: 'projectId',
      through: 'ProjectAssignments',
    });
  }
}

export const init = (sequelize: Sequelize): void => {
  Project.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
};
