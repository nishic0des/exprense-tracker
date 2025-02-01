document.addEventListener("DOMContentLoaded", () => {
  console.log("hello");

  const expenseForm = document.getElementById("expense-form");
  let expenseName = document.getElementById("expense-name");
  let expenseAmount = document.getElementById("expense-amount");
  const addExpensebtn = document.getElementById("add-expense-btn");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalamt = calculate();
  render();
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());
    if (name != "" && !isNaN(amount) && amount > 0) {
      const expenseobj = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(expenseobj);

      save();
      render();
      update();
      expenseName.value = "";
      expenseAmount.value = "";
    }
  });
  function save() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculate() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function update() {
    totalamt = calculate();
    totalAmount.textContent = totalamt.toFixed(2);
  }

  function render() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      let li = document.createElement("li");
      li.innerHTML = `
        ${expense.name}- $${expense.amount}
<button data-id="${expense.id}">Remove</button>
        `;
      expenseList.appendChild(li);
    });
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expid = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expid);
      save();
      render();
      update();
    }
  });
});
