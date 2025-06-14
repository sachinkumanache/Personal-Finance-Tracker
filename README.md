📊 Personal Finance Tracker – FinEdge 💰
Track your income, expenses, budgets, and savings in one intuitive dashboard.
Real-time insights powered by React, Firebase, and responsive Tailwind CSS styling.

🔗 Live Demo: https://gleeful-cactus-a87853.netlify.app
📁 GitHub Repo: Personal-Finance-Tracker

🚀 Features
✅ User Authentication (Login & Register with Firebase Auth)

✅ Add Income & Expense Transactions

✅ Create and Track Budgets by Category

✅ Visual Expense Breakdown with Pie Chart

✅ Budget vs Expense Bar Chart

✅ Summary Cards for Income, Expenses & Savings

✅ Real-time Firebase Realtime Database Integration

✅ Mobile Responsive Design with Tailwind CSS

✅ Logout functionality with session management

🖼️ Screenshots

(Add your actual screenshots to the /screenshots folder in your repo and update URLs)

📦 Tech Stack
Tech Usage
React UI Library
Firebase Auth Authentication
Firebase Realtime DB Database (Transactions & Budgets)
Tailwind CSS Styling & Layout
Recharts Data Visualization (Pie, Bar Charts)
Axios API Calls to Firebase
React Router Navigation

📂 Folder Structure
pgsql
Copy
Edit
src/
├── components/
│ ├── Auth/ (Login, Register)
│ ├── Dashboard/ (SummaryCards, BudgetBar, ExpenseChart, etc.)
├── Pages/
│ ├── Dashboard.jsx
│ ├── Home.jsx
├── routes/
│ ├── PrivateRoute.jsx
├── firebaseConfig.js
├── App.jsx
├── index.js
🔐 Authentication
Firebase handles registration and login.

Auth state is managed using onAuthStateChanged.

Private routes are protected using a custom <PrivateRoute />.

🛠️ How to Run Locally
bash
Copy
Edit

# 1. Clone the repo

git clone https://github.com/sachinkumanache/Personal-Finance-Tracker.git

# 2. Navigate into the folder

cd Personal-Finance-Tracker

# 3. Install dependencies

npm install

# 4. Set up Firebase

# - Create Firebase project

# - Enable Authentication & Realtime Database

# - Add your config to firebaseConfig.js

# 5. Run the app

npm run dev
🙋‍♂️ Author
Sachin Kumanache
🔗 LinkedIn
📫 GitHub
