const { Op } = require("sequelize");
const moment = require("moment");
const { ExpenseClaim, ClaimType } = require('../models');

// ================= CREATE EXPENSE =================
exports.createExpense = async (req, res) => {
  try {
    const { amount, description, expense_type, claimTypeId } = req.body;
    const filePath = req.file ? req.file.filename : null;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // 1. Get current month range
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    // 2. Calculate total claimed this month by user
    const totalThisMonth = await ExpenseClaim.sum("amount", {
      where: {
        userId: req.user.id,
        createdAt: { [Op.between]: [startOfMonth, endOfMonth] }
      }
    });

    const alreadyClaimed = totalThisMonth || 0;
    const MONTHLY_LIMIT = 5000; // 👈 change if needed

    // 3. Check against limit
    if (alreadyClaimed + parseFloat(amount) > MONTHLY_LIMIT) {
      return res.status(400).json({
        message: `Monthly claim limit of ₹${MONTHLY_LIMIT} exceeded. You already claimed ₹${alreadyClaimed}.`
      });
    }

    // 4. Create expense claim if under limit
    const newClaim = await ExpenseClaim.create({
      amount,
      description,
      expense_type,
      receipt: filePath,
      userId: req.user.id,              // matches your ExpenseClaim model
      claimTypeId: claimTypeId || null, // optional
      status: "pending"
    });

    return res.status(201).json({
      message: "Expense claim created successfully",
      claim: newClaim,
    });

  } catch (err) {
    console.error("Error creating expense claim:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getMyClaims = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const claims = await ExpenseClaim.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: ClaimType,
          as: 'ClaimType',  // must match your association alias
          attributes: ['id', 'name'],
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(claims);

  } catch (err) {
    console.error("Error fetching claims:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
