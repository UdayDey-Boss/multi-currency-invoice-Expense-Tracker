import { useState } from "react";

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Software");
  const [date, setDate] = useState("");

  const categories = [
    "Software",
    "Travel",
    "Office",
    "Equipment",
    "Marketing",
    "Other",
  ];

  function addExpense() {
    if (title === "") {
      return;
    }

    const newExpense = {
      id: Math.random(),
      title: title,
      amount: Number(amount),
      category: category,
      date: date,
    };

    const newExpenses = expenses.concat(newExpense);
    setExpenses(newExpenses);

    setTitle("");
    setAmount(0);
    setCategory("Software");
    setDate("");
  }

  function removeExpense(id) {
    const newExpenses = expenses.filter(function (expense) {
      return expense.id !== id;
    });
    setExpenses(newExpenses);
  }

  function calculateTotal() {
    let total = 0;
    for (let i = 0; i < expenses.length; i = i + 1) {
      total = total + expenses[i].amount;
    }
    return total;
  }

  function getCategoryTotal(categoryName) {
    let total = 0;
    for (let i = 0; i < expenses.length; i = i + 1) {
      if (expenses[i].category === categoryName) {
        total = total + expenses[i].amount;
      }
    }
    return total;
  }

  function getMaxTotal() {
    let max = 0;
    for (let i = 0; i < categories.length; i = i + 1) {
      const catTotal = getCategoryTotal(categories[i]);
      if (catTotal > max) {
        max = catTotal;
      }
    }
    return max;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Expenses</h1>

      <div className="bg-white border border-gray-300 rounded p-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Add Expense</h2>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={function (e) {
              setTitle(e.target.value);
            }}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={function (e) {
              setAmount(e.target.value);
            }}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={function (e) {
              setCategory(e.target.value);
            }}
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="Software">Software / Subscriptions</option>
            <option value="Travel">Travel</option>
            <option value="Office">Office Supplies</option>
            <option value="Equipment">Equipment</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={function (e) {
              setDate(e.target.value);
            }}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <button
          onClick={addExpense}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      <div className="bg-white border border-gray-300 rounded mb-6">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Category</th>
              <th className="text-right p-3">Amount</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map(function (expense) {
              return (
                <tr key={expense.id} className="border-b border-gray-200">
                  <td className="p-3 text-gray-700">{expense.date}</td>
                  <td className="p-3 text-gray-700">{expense.title}</td>
                  <td className="p-3 text-gray-700">{expense.category}</td>
                  <td className="p-3 text-right text-gray-800">
                    {expense.amount.toFixed(2)}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={function () {
                        removeExpense(expense.id);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-300 rounded p-4 mb-6 w-80 ml-auto">
        <div className="flex justify-between bg-gray-800 text-white p-3 rounded">
          <span className="font-bold">Total Expenses</span>
          <span className="font-bold">{calculateTotal().toFixed(2)} BDT</span>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Expense Breakdown by Category
        </h2>

        {expenses.length === 0 && (
          <p className="text-gray-500">No expenses yet. Add some above.</p>
        )}

        {expenses.length > 0 && (
          <div>
            {categories.map(function (cat) {
              const catTotal = getCategoryTotal(cat);
              const maxTotal = getMaxTotal();

              let barWidth = 0;
              if (maxTotal > 0) {
                barWidth = (catTotal / maxTotal) * 100;
              }

              return (
                <div key={cat} className="mb-4">
                  <div className="flex justify-between mb-1 text-gray-700">
                    <span>{cat}</span>
                    <span>{catTotal.toFixed(2)} BDT</span>
                  </div>
                  <div className="bg-gray-200 rounded h-6 w-full">
                    <div
                      className="bg-blue-500 h-6 rounded"
                      style={{ width: barWidth + "%" }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpensesPage;
