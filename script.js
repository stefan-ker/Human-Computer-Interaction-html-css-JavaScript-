const movies = [
  { title: "Minecraft", image: "minecraft.jpg", year: "2025", description: "Τέσσερις αταίριαστοι άνθρωποι παλεύουν με συνηθισμένα προβλήματα όταν ξαφνικά σύρονται μέσα από μια μυστηριώδη πύλη στον Πάνω Κόσμο: μια παράξενη, κυβική χώρα των θαυμάτων που ανθίζει με τη φαντασία. Για να επιστρέψουν σπίτι, θα πρέπει να κατακτήσουν αυτόν τον κόσμο ενώ παράλληλα ξεκινούν μια μαγική αποστολή με έναν απροσδόκητο, έμπειρο τεχνίτη, τον Στιβ." },
  { title: "Captain America", image: "captainamerica.jpg", year: "2025", description: "Μετά τη συνάντηση με τον νεοεκλεγέντα πρόεδρο των ΗΠΑ, Θάντεους Ρος, ο Σαμ βρίσκεται στη μέση ενός διεθνούς περιστατικού. Πρέπει να ανακαλύψει την αιτία πίσω από μια ειδεχθή παγκόσμια πλεκτάνη προτού ο πραγματικός εγκέφαλος προκαλέσει σοκ σε ολόκληρο τον κόσμο." },
  { title: "Working Man", image: "workingman.jpg", year: "2025", description: "Ο Λέβον Κέιντ άφησε πίσω του μια παρασημοφορημένη στρατιωτική καριέρα στις μυστικές υπηρεσίες για να ζήσει μια απλή ζωή εργαζόμενος σε κατασκευές. Αλλά όταν η κόρη του αφεντικού του, η οποία είναι σαν οικογένεια γι' αυτόν, απάγεται από διακινητές ανθρώπων, η αναζήτησή του να την φέρει σπίτι αποκαλύπτει έναν κόσμο διαφθοράς πολύ μεγαλύτερο από ό,τι θα μπορούσε ποτέ να φανταστεί." },
  { title: "Solo Leveling", image: "sololeveling.jpg", year: "2024", description: "Λένε ότι ό,τι δεν σε σκοτώνει σε κάνει πιο δυνατό, αλλά αυτό δεν ισχύει για τον πιο αδύναμο κυνηγό στον κόσμο, τον Sung Jinwoo. Αφού σφαγιάστηκε βάναυσα από τέρατα σε ένα μπουντρούμι υψηλού επιπέδου, ο Jinwoo επέστρεψε με το Σύστημα, ένα πρόγραμμα που μόνο αυτός μπορούσε να δει, που τον ανεβάζει επίπεδο με κάθε τρόπο. Τώρα, εμπνέεται να ανακαλύψει τα μυστικά πίσω από τις δυνάμεις του και το μπουντρούμι που τις γέννησε." }
];

const moviesList = document.getElementById('movies-list');
const favouritesList = document.getElementById('favourites-list');
const searchInput = document.getElementById('search-input');

let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

renderMovies(moviesList, movies);

function renderMovies(listElement, movieArray, isFavourites = false) {
  listElement.innerHTML = "";
  movieArray.forEach((movie, index) => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" onclick="showMovieDetails('${movie.title}')">
      <h4>${movie.title}${isFavourites ? '⭐' : ''}</h4>
      <button class="${isFavourites ? 'remove-fav-btn' : 'add-fav-btn'}" onclick="${isFavourites ? `removeFavourite(${index})` : `addFavourite(${index})`}">
        ${isFavourites ? 'Διαγραφή' : 'Προσθήκη στα Αγαπημένα'}
      </button>
    `;
    listElement.appendChild(card);
  });
}

function addFavourite(index) {
  if (!favourites.some(fav => fav.title === movies[index].title)) {
    favourites.push(movies[index]);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Προστέθηκε στα αγαπημένα!');
  }
}

function removeFavourite(index) {
  favourites.splice(index, 1);
  localStorage.setItem('favourites', JSON.stringify(favourites));
  renderMovies(favouritesList, favourites, true);
}

function showMovieDetails(title) {
  const movie = movies.find(m => m.title === title);
  const url = `movie-details.html?title=${encodeURIComponent(movie.title)}&image=${encodeURIComponent(movie.image)}&year=${movie.year}&description=${encodeURIComponent(movie.description)}`;
  window.location.href = url;
}

searchInput?.addEventListener('input', function() {
  const searchQuery = searchInput.value.toLowerCase();
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery) || movie.description.toLowerCase().includes(searchQuery)
  );
  renderMovies(moviesList, filteredMovies);
});

function showSection(section) {
  document.getElementById('home-section')?.classList.add('hidden');
  document.getElementById('favourites-section')?.classList.add('hidden');
  document.getElementById('settings-section')?.classList.add('hidden');
  document.getElementById('search-bar')?.classList.add('hidden');

  const navButtons = document.querySelectorAll('#bottom-nav button');
  navButtons.forEach(btn => btn.classList.remove('active'));

  if (section === 'home') {
    document.getElementById('home-section').classList.remove('hidden');
    renderMovies(moviesList, movies);
  } else if (section === 'search') {
    document.getElementById('search-bar').classList.remove('hidden');
    document.getElementById('home-section').classList.remove('hidden');
    renderMovies(moviesList, movies);
  } else if (section === 'favourites') {
    document.getElementById('favourites-section').classList.remove('hidden');
    renderMovies(favouritesList, favourites, true);
  } else if (section === 'settings') {
    document.getElementById('settings-section').classList.remove('hidden');
    document.getElementById('bottom-nav').classList.add('hidden');
  }

  const activeBtn = document.querySelector(`#bottom-nav button[onclick*="${section}"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Θέμα από localStorage
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
}

showSection('home');
