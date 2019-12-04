let primary_polls_card = document.getElementById('primary_polls');
let black_text = document.getElementsByClassName('textchange');

//sets the cards hover actions
primary_polls_card.addEventListener("mouseover", function () {
    black_text[0].classList.remove('text-black');
   primary_polls_card.classList.add('bg-primary', 'text-white');
});

primary_polls_card.addEventListener("mouseout", function () {
    primary_polls_card.classList.remove('bg-primary', 'text-white');
    black_text[0].classList.add('text-black');
});

let general_polls_card = document.getElementById('general_polls');

general_polls_card.addEventListener("mouseover", function () {
        black_text[1].classList.remove('text-black');

   general_polls_card.classList.add('bg-secondary', 'text-white');
});

general_polls_card.addEventListener("mouseout", function () {
    general_polls_card.classList.remove('bg-secondary', 'text-white');
        black_text[1].classList.add('text-black');
});