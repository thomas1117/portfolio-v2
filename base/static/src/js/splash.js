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
    root: getClass('.nav-slider'),
    overlay: getClass('.nav-slider-overlay'),
    link: document.getElementById('confusing'),
    handleClick: function () {
        // if (hasClass.bind(this)('open')) {
        //     removeClass.bind(this)('open');
        //     removeClass.bind(getClass('.main-nav-overlay'))('open');
        // } else {
        //     this.classList += ' open';
        //     getClass('.main-nav-overlay').classList += ' open';
        // }

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
    },
    init: function() {
        this.overlay.addEventListener('click', this.handleOverlay.bind(this.overlay));
        this.link.addEventListener('click', this.handleClick);
    }
};

menu.init();