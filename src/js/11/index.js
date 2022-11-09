import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PicturesApiService from './get-pictures-API';
let simpleLightBox = new SimpleLightbox('.simple_light_box-js');
const refs = {
  inputEl: document.querySelector('input'),
  formEl: document.querySelector('.search-form'),
  containerEl: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

const picturesApiService = new PicturesApiService();

function renderPopularOnLoadPage() {
  picturesApiService.fetchPictures().then(data => {
    renderPictures(data);
    simpleLightBox.refresh();
  });
}

renderPopularOnLoadPage();

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  picturesApiService.query = e.currentTarget.elements.searchQuery.value;

  picturesApiService.resetPage();

  picturesApiService.fetchPictures().then(data => {
    if (data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.loadMoreButton.classList.add('is-hidden');
      clearPicturesContainer();
      return;
    }

    refs.loadMoreButton.classList.remove('is-hidden');
    clearPicturesContainer();
    renderPictures(data);
    simpleLightBox.refresh();
    if (data.total < 40) {
      refs.loadMoreButton.classList.add('is-hidden');
    }
    Notify.info(`Hooray! We found ${data.totalHits} images.`);
  });
}

function onLoadMore() {
  picturesApiService
    .fetchPictures()
    .then(data => {
      if (data.hits.length < 40) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadMoreButton.classList.add('is-hidden');
      }
      return data;
    })
    .then(renderPictures);
  simpleLightBox.refresh();
}

function renderPictures(data) {
  const markup = data.hits
    .map(
      ({ user, webformatURL, largeImageURL, tags, likes, downloads }) =>
        `<div class="photo-card">
      <div class="info">
			<p class="info-item">
          <b>${user}</b>
        </p>
        <p class="info-item">
          ❤ ${likes}</p>
        </p>
        <p class="info-item">
          ⬇ ${downloads}
        </p>
				<a href="${largeImageURL}" target=”_blank”>Download</a>
				</div>
      <a class="simple_light_box-js" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a>

    </div>
    `
    )
    .join('');
  refs.containerEl.insertAdjacentHTML('beforeend', markup);
}

function clearPicturesContainer() {
  refs.containerEl.innerHTML = '';
  refs.inputEl.value = '';
}

let mybutton = document.getElementById('myBtn');
window.onscroll = () => scrollFunction();
function scrollFunction() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}
mybutton.addEventListener('click', topFunction);

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
