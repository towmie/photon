const auth = '563492ad6f91700001000001021de1f93a204ebe91169c1bfd365e96';
const gallery = document.querySelector('.gallery');
const searchIput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

let searchValue;

searchIput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhoto(searchValue);
});

more.addEventListener('click', loadMore);

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}&per_page=15`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
  }

  const data = await fetchingApi(fetchLink);
  generatePicture(data);
}

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchingApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePicture(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    // console.log(data);
    galleryImg.innerHTML = `
    <div class='gallery-info'>
        <p>${photo.photographer}</p>
        <a target='_blank' class="" href='${photo.src.original}'>Download</a>
    </div>
    <img class="photo-img" src="${photo.src.large}"></img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curratedPhoto() {
  fetchLink = 'https://api.pexels.com/v1/curated?page=1&per_page=15';
  const data = await fetchingApi(fetchLink);
  generatePicture(data);
}

async function searchPhoto(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=15`;
  const data = await fetchingApi(fetchLink);

  generatePicture(data);
}

function clear() {
  gallery.innerHTML = '';
  searchIput.value = '';
}

curratedPhoto();
