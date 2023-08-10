const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
    }
  }

  Comment.init({
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    blogPostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });

  Comment.associate = models => {
  Comment.belongsTo(models.User, { foreignKey: 'userId' });
  Comment.belongsTo(models.BlogPost, { foreignKey: 'blogPostId' });
  };

  return Comment;
};

