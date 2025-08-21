
const sequelize = require('../config/db');
const User = require('./User');
const ClaimType = require('./ClaimType');
const ExpenseClaim = require('./ExpenseClaim');
const Approval = require('./approval');

// User <-> ExpenseClaim
User.hasMany(ExpenseClaim, { foreignKey: 'userId', as: 'claims' });
ExpenseClaim.belongsTo(User, { foreignKey: 'userId', as: 'User' });  // alias 'User' to match frontend usage

// ClaimType <-> ExpenseClaim
ClaimType.hasMany(ExpenseClaim, { foreignKey: 'claimTypeId', as: 'claims' });
ExpenseClaim.belongsTo(ClaimType, { foreignKey: 'claimTypeId', as: 'ClaimType' });

// ExpenseClaim <-> Approval
ExpenseClaim.hasOne(Approval, { foreignKey: 'expenseClaimId', as: 'approval' });
Approval.belongsTo(ExpenseClaim, { foreignKey: 'expenseClaimId', as: 'expenseClaim' });

module.exports = { sequelize, User, ClaimType, ExpenseClaim, Approval };
