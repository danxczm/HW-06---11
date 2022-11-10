const onTopButton = document.getElementById('myBtn');

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function scrollFunction() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    onTopButton.style.display = 'block';
  } else {
    onTopButton.style.display = 'none';
  }
}

export { topFunction, scrollFunction };
