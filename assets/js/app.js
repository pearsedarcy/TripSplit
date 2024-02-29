// Add event listeners to li of nav items
const friendsNavItem = document.getElementById('friends');
const expensesNavItem = document.getElementById('expenses');
const balanceNavItem = document.getElementById('balance');

// Add event listeners to the nav items
friendsNavItem.addEventListener('click', () => {
  addExpenseButton.style.display = 'none';
  cancelExpenseButton.style.display = 'none';
  addExpenseCompleteBtn.style.display = 'none';
  document.querySelector('#friends-section').style.display = 'flex';
  document.querySelector('#expenses-section').style.display = 'none';
  document.querySelector('#balance-section').style.display = 'none';
  if (addFriendsForm.style.display === 'flex')
  { addFriendsCompleteBtn.style.display = 'flex';
    addFriendsButton.style.display = 'none';}
  else {addFriendsButton.style.display = 'flex';}
  friendsNavItem.classList.add('active');
  expensesNavItem.classList.remove('active');
  balanceNavItem.classList.remove('active');
  addExpenseButton.style.display = 'none';
  addExpenseForm.style.display = 'none';
});

expensesNavItem.addEventListener('click', () => {
  addFriendsButton.style.display = 'none';
  addExpenseCompleteBtn.style.display = 'flex';
  addExpenseButton.style.display = 'flex;';
  document.querySelector('#friends-section').style.display = 'none';
  document.querySelector('#expenses-section').style.display = 'flex';
  document.querySelector('#balance-section').style.display = 'none';
  document.querySelector('#form-buttons').style.display = 'flex';
  if (getExpenses().length < 0) { addExpenseButton.style.display = 'flex'; }
  if (addExpenseForm.style.display === 'flex')
  { addExpenseCompleteBtn.style.display = 'flex';
    cancelExpenseButton.style.display = 'flex';
    addExpenseCompleteBtn.style.display = 'flex';
    addExpenseButton.style.display = 'none';}
  else {addFriendsCompleteBtn.style.display = 'none';}
  friendsNavItem.classList.remove('active');
  expensesNavItem.classList.add('active');
  balanceNavItem.classList.remove('active');

  addFriendsButton.style.display = 'none';
  addFriendsForm.style.display = 'none';
  addExpenseForm.style.display = 'flex';
  if (getExpenses() > 0) { addExpenseButton.style.display = 'flex'; }
   else {addExpenseCompleteBtn.style.display = 'flex';}
}); 

balanceNavItem.addEventListener('click', () => {
  document.querySelector('#friends-section').style.display = 'none';
  document.querySelector('#expenses-section').style.display = 'none';
  document.querySelector('#balance-section').style.display = 'flex';
  addFriendsCompleteBtn.style.display = 'none';
  addFriendsButton.style.display = 'none';
  friendsNavItem.classList.remove('active');
  expensesNavItem.classList.remove('active');
  balanceNavItem.classList.add('active');
  addExpenseCompleteBtn.style.display = 'none';
  addExpenseButton.style.display = 'none';
  cancelExpenseButton.style.display = 'none';
  addFriendsButton.style.display = 'none';
  addFriendsForm.style.display = 'none';
});

// Get all the Friends List and Friends Form Elements
const addFriendsForm = document.getElementById('add-friends-form');
const addFriendInput = document.querySelector('#add-friends-input');
const friendsList = document.querySelector('.friends-list');
const errorMessage = document.querySelector('#friends-list-error');
// Add event listener to the form
addFriendsForm.addEventListener('submit', submitFriendsForm);
// Add friend to the list
function submitFriendsForm(event) {
  event.preventDefault();
  const friendName = addFriendInput.value.trim();
  if (friendName !== '') {
    if (countFriends() < 5) {
      const newFriend = createFriendElement(friendName);
      friendsList.appendChild(newFriend);
      getFriends();
      addFriendsToSelect();
      addFriendInput.value = '';
      errorMessage.textContent = '';
      niceLabels[0].style.borderColor = legends[0].style.color = '#b9b9b9';
    } else {
      displayErrorMessage('You can only add up to 5 friends');
      addFriendInput.value = '';
    }
  } else {
    displayErrorMessage("Please enter a friend's name");
  }
}
// Create a new friend element
function createFriendElement(name) {
  const newFriend = document.createElement('li');
  newFriend.textContent = name;
  // Add a profile picture to the friend element
  const profilePicture = document.createElement('div');
  profilePicture.classList.add('profile-picture');
  profilePicture.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  profilePicture.textContent = name.charAt(0).toUpperCase();
  newFriend.appendChild(profilePicture);
  // Create a delete button
  const deleteButton = document.createElement('a');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
      <path d="M312-172q-25 0-42.5-17.5T252-232v-488h-40v-28h148v-28h240v28h148v28h-40v488q0 26-17 43t-43 17H312Zm368-548H280v488q0 14 9 23t23 9h336q12 0 22-10t10-22v-488ZM402-280h28v-360h-28v360Zm128 0h28v-360h-28v360ZM280-720v520-520Z"/>
    </svg>
  `;
  // Add event listener to the delete button
  deleteButton.addEventListener('click', () => {
    if (confirm(true)) {
      newFriend.remove();
      getFriends();
      deleteNameFromSelect();
      displayErrorMessage('');
    }
  });
  newFriend.appendChild(deleteButton);
  return newFriend;
}
// Count the number of friends
function countFriends() {
  return document.querySelectorAll('.friends-list li').length;
}
// Display error message
function displayErrorMessage(message) {
  errorMessage.textContent = message;
  if (message !== '') {
    niceLabels[0].style.borderColor = legends[0].style.color = 'red';
  } else {
    niceLabels[0].style.borderColor = legends[0].style.color = '#b9b9b9';
  }
}

function handleInputFocus(input, niceLabel, legend) {
  input.addEventListener('focus', function() {
    niceLabel.style.borderColor = legend.style.color = '#BB86FC'; // Change border color and legend color on focus
  });
}

// Function to handle input blur event
function handleInputBlur(input, niceLabel, legend) {
  input.addEventListener('blur', function() {
    niceLabel.style.borderColor = legend.style.color = '#b9b9b9'; 
    displayErrorMessage(''); 
  });
}

// Get references to input elements, nice labels, and legends
const niceLabels = document.querySelectorAll('.nice-label');
const legends = document.querySelectorAll('legend');
const inputs = document.querySelectorAll('.input-box');

// Iterate through inputs and attach focus and blur event listeners
for (let i = 0; i < inputs.length; i++) {
  handleInputFocus(inputs[i], niceLabels[i], legends[i]);
  handleInputBlur(inputs[i], niceLabels[i], legends[i]);
}

// Toggle the Add Friends form visibility and section header with action button
const addFriendsCompleteBtn = document.getElementById('add-friends-complete-button');
const addFriendsButton = document.getElementById('add-friends-button');
const friendsListHeader = document.querySelector('#friends-list-header');
const addFriendsHeader = document.querySelector('#add-friends-header');

addFriendsCompleteBtn.addEventListener('click', () => {
  if (countFriends() < 2) {
    displayErrorMessage('Please add at least two friends');
  } else {
    displayErrorMessage('');
    addFriendsHeader.style.display = 'none';
    addFriendsForm.style.display = 'none';
    addFriendsCompleteBtn.style.display = 'none';
    addFriendsButton.style.display = 'flex';
    friendsListHeader.style.display = 'flex';
    friendsNavItem.style.display = 'flex';
    expensesNavItem.style.display = 'flex';
  }
});

addFriendsButton.addEventListener('click', () => {
  addFriendsForm.style.display = 'flex';
  addFriendsCompleteBtn.style.display = 'flex';
  addFriendsButton.style.display = 'none';
  friendsListHeader.style.display = 'none';
  addFriendsHeader.style.display = 'flex';
});

// Loop through the Friends list items and add the names to the friends array
function getFriends() {
  const friends = [];
  const friendsListItems = document.querySelectorAll('.friends-list li');
  for (let i = 0; i < friendsListItems.length; i++) {
    friends.push({ name: friendsListItems[i].textContent.trim().slice(0, -1) });
  }
  return friends;
}

// Handle Add Expense Form Submission
const addExpenseForm = document.getElementById('add-expenses-form');
const expenseNameInput = document.getElementById('expense-title-input');
const expenseAmountInput = document.getElementById('expense-cost-input');
const paidByInput = document.getElementById('expense-paid-by-input');

// Add event listener to the form
addExpenseForm.addEventListener('submit', submitExpenseForm);

// Submit the expense form
function submitExpenseForm(event) {
  event.preventDefault();
  const expenseName = expenseNameInput.value.trim();
  const expenseAmount = expenseAmountInput.value.trim();
  const paidBy = paidByInput.value.trim();
  if (expenseName !== '' && expenseAmount !== '' && paidBy !== '') {
    const newExpense = createExpenseElement(expenseName, expenseAmount, paidBy);
    addExpenseForm.reset();
    displayExpense(newExpense);
    getExpenses();
    calculateTotalSpent();
    calculateTotalSpentByEachFriend();
    displayTotalSpentByEachFriend();
    divideTotalSpentByFriends();
    calculateAmountOwed();
    displayAmountOwed();
    balanceNavItem.style.display = 'flex';
  } else {
    alert('Please fill in all the fields');
  }
}

// Create a new expense element
function createExpenseElement(title, cost, paidBy) {
  const newExpense = {
    title,
    cost,
    paidBy
  };
  return newExpense;
}

// Display the expense
function displayExpense(expense) {
  const expenseList = document.querySelector('.expenses-list');
  const newExpense = document.createElement('li');
  newExpense.innerHTML = `
    <span class="expense-paid-by">${expense.paidBy}</span>
    <p class="action-word">paid for</p>
    <span class="expense-title">${expense.title}</span>
    <span class="money">€<span id="expense-cost">${expense.cost}</span></span>
  `;
  expenseList.appendChild(newExpense);
}

// Add the expense details to the expenses array
function getExpenses() {
  const expenses = [];
  const expenseListItems = document.querySelectorAll('.expenses-list li');
  for (let i = 0; i < expenseListItems.length; i++) {
    expenses.push({
      expense: expenseListItems[i].querySelector('.expense-title').textContent.trim(),
      cost: expenseListItems[i].querySelector('#expense-cost').textContent.trim(),
      paidBy: expenseListItems[i].querySelector('.expense-paid-by').textContent.trim()
    });
  }
  return expenses;
}


// Dynamically add the friends to the paid by select input
const paidBySelect = document.getElementById('expense-paid-by-input');
function addFriendsToSelect() {
  const friends = getFriends();
  for (let i = 0; i < friends.length; i++) {
    const option = document.createElement('option');
    option.value = friends[i].name;
    option.textContent = friends[i].name;
    paidBySelect.appendChild(option);
    // Remove the duplicate options
    for (let j = 0; j < paidBySelect.options.length; j++) {
      for (let k = j + 1; k < paidBySelect.options.length; k++) {
        if (paidBySelect.options[j].value === paidBySelect.options[k].value) {
          paidBySelect.remove(k);
        }
      }
    }
  }
}

// Delete name from the paid by select input if the name is removed from the friends list
function deleteNameFromSelect() {
  const friends = getFriends();
  for (let i = 0; i < paidBySelect.options.length; i++) {
    let optionExists = false;
    for (let j = 0; j < friends.length; j++) {
      if (paidBySelect.options[i].value === friends[j].name) {
        optionExists = true;
      }
    }
    if (!optionExists) {
      paidBySelect.remove(i);
    }
  }
}

// Toggle the Add Expense form visibility and section header with action button

const addExpenseCompleteBtn = document.getElementById('add-expense-complete-button');
const addExpenseButton = document.getElementById('add-expense-button');
const expensesListHeader = document.querySelector('#expenses-header');
const addExpenseHeader = document.querySelector('#add-expenses-header');
const cancelExpenseButton = document.getElementById('add-expense-cancel-button');

addExpenseCompleteBtn.addEventListener('click', () => {
  if (expenseNameInput.value !== '' && expenseAmountInput.value !== '' && paidByInput.value !== '') {
  addExpenseHeader.style.display = 'none';
  addExpenseForm.style.display = 'none';
  addExpenseCompleteBtn.style.display = 'none';
  cancelExpenseButton.style.display = 'none';
  addExpenseButton.style.display = 'flex';
  expensesListHeader.style.display = 'flex';
}
});

addExpenseButton.addEventListener('click', () => {
  addExpenseForm.style.display = 'flex';
  addExpenseCompleteBtn.style.display = 'flex';
  cancelExpenseButton.style.display = 'flex';
  addExpenseButton.style.display = 'none';
  expensesListHeader.style.display = 'none';
  addExpenseHeader.style.display = 'flex';
});

cancelExpenseButton.addEventListener('click', () => {
  addExpenseHeader.style.display = 'none';
  addExpenseForm.style.display = 'none';
  addExpenseCompleteBtn.style.display = 'none';
  cancelExpenseButton.style.display = 'none';
  addExpenseButton.style.display = 'flex';
  expensesListHeader.style.display = 'flex';
});


// Calculate the total cost of all the expenses combined
function calculateTotalSpent() {
  const expenses = getExpenses();
  let totalSpent = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalSpent += parseInt(expenses[i].cost);
  }
  return totalSpent; 
} 

// Calculate the total amount each friend has spent
function calculateTotalSpentByEachFriend() {
  const friends = getFriends();
  const expenses = getExpenses();
  const TotalSpentByEachFriend = [];
  for (let i = 0; i < friends.length; i++) {
    let total = 0;
    for (let j = 0; j < expenses.length; j++) {
      if (expenses[j].paidBy === friends[i].name) {
        total += parseInt(expenses[j].cost);
      }
    }
    TotalSpentByEachFriend.push({
      name: friends[i].name,
      total
    });
  }
  return TotalSpentByEachFriend;
}

// Display the TotalSpentByEachFriend
function displayTotalSpentByEachFriend() {
  const TotalSpentByEachFriend = calculateTotalSpentByEachFriend();
  const totalsList = document.querySelector('.totals-list');
  totalsList.innerHTML = '';
  for (let i = 0; i < TotalSpentByEachFriend.length; i++) {
    const newtotals = document.createElement('li');
    newtotals.innerHTML = `
      <span class="totals-name">${TotalSpentByEachFriend[i].name}</span>
      <p class="action-word">has spent</p>
      <span class="money">€${TotalSpentByEachFriend[i].total}</span>
    `;
    totalsList.appendChild(newtotals);
  }
}

// divide the total amount spent by the number of friends
function divideTotalSpentByFriends() {
  const totalSpent = calculateTotalSpent();
  const friends = getFriends();
  const dividedTotal = (totalSpent / friends.length).toFixed(2);
  return dividedTotal;
}

// Calculate the amount each friend owes or is owed
function calculateAmountOwed() {
  const friends = getFriends();
  const TotalSpentByEachFriend = calculateTotalSpentByEachFriend();
  const dividedTotal = divideTotalSpentByFriends();
  const amountOwed = [];
  for (let i = 0; i < friends.length; i++) {
    let total = 0;
    for (let j = 0; j < TotalSpentByEachFriend.length; j++) {
      if (friends[i].name !== TotalSpentByEachFriend[j].name) {
        total += dividedTotal - TotalSpentByEachFriend[j].total;
      }
    }
    if (total < 0) {
      total = `<p class="action-word">owes</p> €${Math.abs(total).toFixed(2)}`;
    } else if (total > 0) {
      total = `<p class="action-word">is owed</p> €${Math.abs(total).toFixed(2)}`;
    } else {
      total = '<p class="action-word">is all settled up</p>';
    }
    amountOwed.push({
      name: friends[i].name,
      total
    });
  }
  return amountOwed;
}

// Display the amount each friend owes or is owed
function displayAmountOwed() {
  const amountOwed = calculateAmountOwed();
  const balanceList = document.querySelector('.balance-list');
  balanceList.innerHTML = '';
  for (let i = 0; i < amountOwed.length; i++) {
    const newOwed = document.createElement('li');
    newOwed.innerHTML = `
      <span class="owed-name">${amountOwed[i].name}</span>
      <span class="owed-amount"><span class="money-owed">${amountOwed[i].total}</span></span>
    `;
    balanceList.appendChild(newOwed);
  }
}

// Show Introduction Section
const introductionSection = document.getElementById('introduction-section');
const getStartedButton = document.getElementById('get-started-button');

// Hide all the other sections
document.querySelector('#friends-section').style.display = 'none';
document.querySelector('#expenses-section').style.display = 'none';
document.querySelector('#balance-section').style.display = 'none';

// Hide all other buttons 
addExpenseButton.style.display = 'none';
addExpenseForm.style.display = 'none';
addExpenseCompleteBtn.style.display = 'none';
cancelExpenseButton.style.display = 'none';
addFriendsCompleteBtn.style.display = 'none';
addFriendsForm.style.display = 'none';
friendsNavItem.style.display = 'none';

// Show friends section when the get started button is clicked
getStartedButton.addEventListener('click', () => {
  introductionSection.style.display = 'none';
  document.querySelector('#friends-section').style.display = 'flex';
  friendsNavItem.style.display = 'flex';
  addFriendsForm.style.display = 'flex';
  addFriendsCompleteBtn.style.display = 'flex';
});
