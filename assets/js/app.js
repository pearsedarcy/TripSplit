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
