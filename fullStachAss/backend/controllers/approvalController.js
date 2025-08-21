
const { ExpenseClaim, User, ClaimType, Approval } = require('../models');

const approveOrReject = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const { claimId } = req.params;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const claim = await ExpenseClaim.findByPk(claimId);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    const approval = await Approval.create({ status, remarks, ExpenseClaimId: claimId });

    claim.status = status;
    await claim.save();

    res.json({ message: `Claim ${status}`, approval, claim });
  } catch (error) {
    console.error('Error approving/rejecting claim:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllClaims = async (req, res) => {
  try {
    const claims = await ExpenseClaim.findAll({
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username', 'role'],
        },
        {
          model: ClaimType,
          as: 'ClaimType',
          attributes: ['name'],
        },
        {
          model: Approval,
          as: 'approval',
          attributes: ['status', 'approvedBy'],
        },
      ],
    });
    res.json(claims);
  } catch (err) {
    console.error('Error fetching claims:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = {
  approveOrReject,
  getAllClaims,
};
