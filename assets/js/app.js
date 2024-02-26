// Get all the elements Friends List and Friends Form Elements
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
  // Create a delete button
  const deleteButton = document.createElement('a');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
      <path d="M312-172q-25 0-42.5-17.5T252-232v-488h-40v-28h148v-28h240v28h148v28h-40v488q0 26-17 43t-43 17H312Zm368-548H280v488q0 14 9 23t23 9h336q12 0 22-10t10-22v-488ZM402-280h28v-360h-28v360Zm128 0h28v-360h-28v360ZM280-720v520-520Z"/>
    </svg>
  `;
  deleteButton.addEventListener('click', () => {
    newFriend.remove();
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
const deleteButton = document.querySelectorAll('.delete-button');

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