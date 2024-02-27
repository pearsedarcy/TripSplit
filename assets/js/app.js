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
      niceLabel.style.borderColor = legend.style.color = '#b9b9b9';
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
  deleteButton.addEventListener('click', () => {
    alert('Are you sure you want to remove this friend?');
    newFriend.remove();
    getFriends();
    deleteNameFromSelect();
    displayErrorMessage('');
    
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
    niceLabel.style.borderColor = legend.style.color = 'red';
  } else {
    niceLabel.style.borderColor = legend.style.color = '#b9b9b9';
  }
}

// Change border color of input on focus and blur
const addFriendsInput = document.getElementById('add-friends-input');
const niceLabel = document.querySelector('.nice-label');
const legend = document.querySelector('legend');

addFriendsInput.addEventListener('focus', function() {
  niceLabel.style.borderColor = legend.style.color =  '#BB86FC';
});

addFriendsInput.addEventListener('blur', function() {
  niceLabel.style.borderColor = legend.style.color = '#b9b9b9';
  displayErrorMessage('');
});

// Toggle the Add Friends form visibility and section header with action button
const addFriendsCompleteBtn = document.getElementById('add-friends-complete-button');
const addFriendsButton = document.getElementById('add-friends-button');
const friendsListHeader = document.querySelector('#friends-list-header');
const addFriendsHeader = document.querySelector('#add-friends-header');

addFriendsCompleteBtn.addEventListener('click', () => {
  if (countFriends() === 0) {
    displayErrorMessage('Please add at least one friend');
  } else {
    displayErrorMessage('');
    addFriendsHeader.style.display = 'none';
    addFriendsForm.style.display = 'none';
    addFriendsCompleteBtn.style.display = 'none';
    addFriendsButton.style.display = 'flex';
    friendsListHeader.style.display = 'flex';
    
  }
});

addFriendsButton.addEventListener('click', () => {
  addFriendsForm.style.display = 'block';
  addFriendsCompleteBtn.style.display = 'flex';
  addFriendsButton.style.display = 'none';
  friendsListHeader.style.display = 'none';
  addFriendsHeader.style.display = 'flex';
});

// Loop through the Friends list items and add the names to the friends array
const friends = [];
function getFriends() {
  const friends = [];
  const friendsListItems = document.querySelectorAll('.friends-list li');
  for (let i = 0; i < friendsListItems.length; i++) {
    friends.push({ name: friendsListItems[i].textContent.trim().slice(0, -1) });
  }
  console.log(friends);
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
  console.log(expenseAmount);
  console.log(expenseName);
  const paidBy = paidByInput.value.trim();
  console.log(paidBy);
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
    <p class="paid-for">paid for</p>
    <span class="expense-title">${expense.title}</span>
    <span class="expense-cost">${expense.cost}</span>
  `;
  expenseList.appendChild(newExpense);
}

// Create an array to store the expense details
const expenses = [];

// Add the expense details to the expenses array
function getExpenses() {
  const expenses = [];
  const expenseListItems = document.querySelectorAll('.expenses-list li');
  for (let i = 0; i < expenseListItems.length; i++) {
    expenses.push({
      expense: expenseListItems[i].querySelector('.expense-title').textContent.trim(),
      cost: expenseListItems[i].querySelector('.expense-cost').textContent.trim(),
      paidBy: expenseListItems[i].querySelector('.expense-paid-by').textContent.trim()
    });
  }
  console.log(expenses);
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

// Calculate the total cost of all the expenses combined
function calculateTotalSpent() {
  const expenses = getExpenses();
  let totalSpent = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalSpent += parseInt(expenses[i].cost);
  }
  console.log(totalSpent);
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
  console.log(TotalSpentByEachFriend);
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
      <span class="totals-amount">€${TotalSpentByEachFriend[i].total}</span>
    `;
    totalsList.appendChild(newtotals);
  }
}

// divide the total amount spent by the number of friends
function divideTotalSpentByFriends() {
  const totalSpent = calculateTotalSpent();
  const friends = getFriends();
  const dividedTotal = (totalSpent / friends.length).toFixed(2);
  console.log(dividedTotal);
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
  console.log(amountOwed);
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
      <span class="owed-amount">${amountOwed[i].total}</span>
    `;
    balanceList.appendChild(newOwed);
  }
}