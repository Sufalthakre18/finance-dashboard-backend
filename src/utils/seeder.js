/**
 
 * Creates:
 *   - 1 Admin user
 *   - 1 Analyst user
 *   - 1 Viewer user
 *   - 20 sample transactions
 */

import "dotenv/config";
import mongoose from "mongoose";

import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");
};

// ================= USERS =================
const seedUsers = async () => {
  await User.deleteMany({});
  console.log("🗑️ Cleared users");

  const users = await User.create([
    {
      name: "Admin User",
      email: "admin@finance.com",
      password: "admin123",
      role: "admin",
      isActive: true,
    },
    {
      name: "Analyst User",
      email: "analyst@finance.com",
      password: "analyst123",
      role: "analyst",
      isActive: true,
    },
    {
      name: "Viewer User",
      email: "viewer@finance.com",
      password: "viewer123",
      role: "viewer",
      isActive: true,
    },
  ]);

  console.log("👤 Users seeded");
  return users;
};

// ================= TRANSACTIONS =================
const seedTransactions = async (adminId) => {
  await Transaction.deleteMany({});
  console.log("🗑️ Cleared transactions");

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Bonus", "Rental"],
    expense: ["Food", "Rent", "Travel", "Entertainment", "Utilities", "Shopping"],
  };

  const transactions = [];
  const now = new Date();

  for (let i = 0; i < 20; i++) {
    const type = i % 3 === 0 ? "income" : "expense";

    const categoryList = categories[type];
    const category =
      categoryList[Math.floor(Math.random() * categoryList.length)];

    // Random date within last 6 months
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 180));

    transactions.push({
      amount: Number((Math.random() * 5000 + 100).toFixed(2)),
      type,
      category,
      date,
      note: `Sample ${type} record for ${category}`, // ✅ match your model
      createdBy: adminId,
    });
  }

  await Transaction.insertMany(transactions);

  console.log("💰 Transactions seeded (20 records)");
};

// ================= RUN =================
const run = async () => {
  try {
    await connectDB();

    const users = await seedUsers();

    // Admin creates transactions
    await seedTransactions(users[0]._id);

    console.log("\n✅ Seeding complete!");
    console.log("─────────────────────────────────────────");
    console.log("📧 Admin    → admin@finance.com    / admin123");
    console.log("📧 Analyst  → analyst@finance.com  / analyst123");
    console.log("📧 Viewer   → viewer@finance.com   / viewer123");
    console.log("─────────────────────────────────────────\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

run();