const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) {
    }
  }

  BlogPost.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BlogPost',
  });

  return BlogPost;
};

BlogPost.associate = models => {
BlogPost.belongsTo(models.User, { foreignKey: 'userId' });
};
