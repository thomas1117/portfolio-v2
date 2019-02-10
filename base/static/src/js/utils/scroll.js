let scrollPos = 0;
const nav = document.querySelector('.main-nav');
const height = nav.clientHeight;

function checkPosition() {
  let windowY = window.scrollY;

  if (windowY < scrollPos) {
    // Scrolling UP

    if (windowY < height) {
        if (nav.classList.contains('darken')) {
            nav.classList.remove('darken');
        }
    }
    
  } else {
    // Scrolling DOWN

    if (windowY > height) {
        if (!nav.classList.contains('darken')) {
            nav.classList += ' darken';
        }
    }
    
  }

  scrollPos = windowY;
}

window.addEventListener('scroll', checkPosition);