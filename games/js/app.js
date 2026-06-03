document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const gameCards = document.querySelectorAll('.game-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn =>
                btn.classList.remove('active')
            );

            button.classList.add('active');

            // Selected category
            const selectedCategory = button.dataset.category;

            // Filter cards
            gameCards.forEach(card => {

                const categories =
                    card.dataset.category.split(' ');

                const shouldShow =
                    selectedCategory === 'all' ||
                    categories.includes(selectedCategory);

                card.style.display =
                    shouldShow ? 'block' : 'none';
            });

        });

    });

});