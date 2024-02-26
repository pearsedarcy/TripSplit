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
    } else {
      displayErrorMessage('You can only add up to 5 friends');
      addFriendInput.value = '';
    }
  } else {
    displayErrorMessage('Please enter a friend name');
  }
}
// Create a new friend element
function createFriendElement(name) {
  const newFriend = document.createElement('li');
  newFriend.textContent = name;
  return newFriend;
}
// Count the number of friends
function countFriends() {
  return document.querySelectorAll('.friends-list li').length;
}
// Display error message
function displayErrorMessage(message) {
  errorMessage.textContent = message;
}
