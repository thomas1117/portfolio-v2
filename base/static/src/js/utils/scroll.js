function getClass(className) {
    return document.querySelector(className);
}

function hasClass(className) {
    return this.classList.contains(className);
}

function removeClass(className) {
    return this.classList.remove(className);
}

function addClass(className) {
    this.classList += ' ' + className;
}

const menu = {
    root: getClass('.main-nav'),
    icon: getClass('.hamburger-icon'),
    overlay: getClass('.main-nav-overlay'),
    mobileNav: getClass('.man-nav-mobile'),
    handleHamburger: function () {
        if (hasClass.bind(this)('open')) {
            removeClass.bind(this)('open');
            removeClass.bind(getClass('.main-nav-overlay'))('open');
        } else {
            this.classList += ' open';
            getClass('.main-nav-overlay').classList += ' open';
        }

        const t = this.getAttribute('data-target');
        const target = getClass(t);

        if (hasClass.bind(target)('open')) {
            removeClass.bind(target)('open');
        } else {
            target.classList += ' open';
        }
    },
    handleOverlay: function () {
        removeClass.bind(this)('open');
        const t = this.getAttribute('data-target');
        const target = getClass(t);
        target.classList.remove('open');
        getClass('.hamburger-icon').classList.remove('open');
    },
    attachScrollListener() {
        let scrollPos = 0;
        const nav = getClass('.main-nav');
        const height = nav.clientHeight;
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
    },
    init: function() {
        this.icon.addEventListener('click', this.handleHamburger.bind(this.icon));
        this.overlay.addEventListener('click', this.handleOverlay.bind(this.overlay));
        window.addEventListener('scroll', this.attachScrollListener);
    }
};

menu.init();