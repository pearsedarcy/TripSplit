addEventListener();
// Add event listener to the nav links
function addEventListener() {
let nav = document.querySelector('nav').firstElementChild.children;
for (let i = 0; i < nav.length; i++) {
  nav[i].addEventListener('click', function() {
    console.log(`clicked  ${[i]}`);
});
}
};

/*
=== 1. Add Friend to the Friends list ===
  - 1.1 - Get the add friends form
  - 1.2 -Add event listener to the form
  - 1.3 -Prevent the default form submission
  - 1.4 -Get the add friends form name input, with the id of 'add-friends-input'
  - 1.5 -Get UL with the class of 'friends
  - 1.6 -Create new list item
  - 1.7 -Create text node for new friend
  - 1.8 -Append new friend name to new friend list item
  - 1.9 -Append new friend list item to form friend list
  - 1.10 -Clear the input field
    TODO Change the color of the input field border when clicked, focused
    TODO Prevent empty form submission, add a validation to the form
    TODO Add a delete button to the list items
    TODO Add a message when the list is empty
    TODO Limit the number of friends to add
*/

// -1.1 - 
const addFriendsForm = document.getElementById('add-friends-form');
// -1.2 -
addFriendsForm.addEventListener('submit', submitFriendForm);
// Main function to submit the form
function submitFriendForm(event){
  // -1.3 -
  event.preventDefault();
  // -1.4 -
  const addFriendInput = document.querySelector('#add-friends-input');
  // -1.5 -
  const friendsList = document.querySelector('.friends-list');
  // -1.6 -
  const newFriend = document.createElement('li');
  // -1.7 -
  const newFriendName = document.createTextNode(addFriendInput.value);
  // -1.8 -
  newFriend.appendChild(newFriendName);
  // -1.9 -
  friendsList.appendChild(newFriend);
  // -1.10 -
  addFriendInput.value = '';
}
