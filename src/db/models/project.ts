import { Model, Optional, DataTypes } from 'sequelize';

import connection from '..';

interface ProjectAttributes {
  id: string;
  title: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectOptionalAttributes = 'id' | 'createdAt' | 'updatedAt';

export default class Project
  extends Model<ProjectAttributes, Optional<ProjectAttributes, ProjectOptionalAttributes>>
  implements ProjectAttributes
{
  id!: string;
  title!: string;
  status!: string;

  createdAt!: Date;
  updatedAt!: Date;
}

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
    timestamps: true,
    sequelize: connection,
    modelName: 'Project',
  }
);
