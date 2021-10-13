import { Model, Optional, DataTypes } from 'sequelize';

import connection from '..';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserOptionalAttibutes = 'id' | 'createdAt' | 'updatedAt';

export default class User
  extends Model<UserAttributes, Optional<UserAttributes, UserOptionalAttibutes>>
  implements UserAttributes
{
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  salt!: string;

  createdAt!: Date;
  updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    modelName: 'User',
  }
);
