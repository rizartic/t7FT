// Event listener when clicking on character card.
document.getElementById('button').addEventListener("click", function(){
    document.querySelector('.character-info-window-overlay').style.display = 'flex';
});

//Event listener when closing the character modal.
document.querySelector('.close').addEventListener('click', function(){
    document.querySelector('.character-info-window-overlay').style.display='none';
});