import { Model, Sequelize, Optional, DataTypes } from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
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

  createdAt!: Date;
  updatedAt!: Date;

  static associate(models: any) {
    // define association here
    User.belongsToMany(models.Project, {
      foreignKey: 'userId',
      through: 'ProjectAssignments',
    });
  }
}

export const init = (sequelize: Sequelize): void => {
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
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
};
