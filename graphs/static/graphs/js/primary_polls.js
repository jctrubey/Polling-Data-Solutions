let line_graphs_card = document.getElementById('line_graphs');
let black_text = document.getElementsByClassName('textchange');

//sets cards hover actions
line_graphs_card.addEventListener("mouseover", function () {
    black_text[0].classList.remove('text-black');
   line_graphs_card.classList.add('bg-primary', 'text-white');
});

line_graphs_card.addEventListener("mouseout", function () {
    line_graphs_card.classList.remove('bg-primary', 'text-white');
    black_text[0].classList.add('text-black');
});

let scatter_plot_card = document.getElementById('scatter_plot');

scatter_plot_card.addEventListener("mouseover", function () {
        black_text[1].classList.remove('text-black');

   scatter_plot_card.classList.add('bg-secondary', 'text-white');
});

scatter_plot_card.addEventListener("mouseout", function () {
    scatter_plot_card.classList.remove('bg-secondary', 'text-white');
        black_text[1].classList.add('text-black');
});