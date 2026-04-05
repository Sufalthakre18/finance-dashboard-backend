import Transaction from "../models/Transaction.js";



// access Viewer, Analyst, Admin
// total income, total expenses, net balance, transaction count
export const getSummary = async (req, res, next) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    let totalIncome = 0, totalExpenses = 0, incomeCount = 0, expenseCount = 0;
    result.forEach((item) => {
      if (item._id === "income") {
        totalIncome = item.total;
        incomeCount = item.count;
      } else {
        totalExpenses = item.total;
        expenseCount = item.count;
      }
    });

    const netBalance = totalIncome - totalExpenses;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        netBalance,
        totalTransactions: incomeCount + expenseCount,
        incomeCount,
        expenseCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Viewer, Analyst, Admin
// amount breakdown by category and type
export const getCategoryTotals = async (req, res, next) => {
  try {
    const filter = { isDeleted: false };
    if (req.query.type) filter.type = req.query.type; // filter by income or expense

    const result = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          type: "$_id.type",
          total: 1,
          count: 1,
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

//access Analyst, Admin
//monthly income vs expense for the last N months
export const getMonthlyTrends = async (req, res, next) => {
  try {
    const months = parseInt(req.query.months) || 6; // default last 6 months
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const result = await Transaction.aggregate([
      {
        $match: {
          isDeleted: false,
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          type: "$_id.type",
          total: 1,
          count: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// access Analyst, Admin
//  daily totals for the last 7 days
export const getWeeklyTrends = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await Transaction.aggregate([
      {
        $match: {
          isDeleted: false,
          date: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            type: "$type",
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.date": 1 } },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          type: "$_id.type",
          total: 1,
          count: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

//access Viewer, Analyst, Admin
// Returns last N transactions (default 5)
export const getRecentActivity = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const transactions = await Transaction.find({ isDeleted: false })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    next(error);
  }
};

