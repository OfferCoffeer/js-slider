function Carousel(containerID = '.carousel', slideID = '.slide') {
  this.carousel = document.querySelector(containerID);
  this.slides = this.carousel.querySelectorAll(slideID);
}

Carousel.prototype = {

  _initProps() {
    this.currentSlide = 0;
    this.isPlaying = true;
    this.interval = 2000;

    this.SLIDES_LENGTH = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';

    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';

  },

  _initControls() {
    const controls = document.createElement('div');
    const pause = `<span class="control" id="pause">${this.FA_PAUSE}</span>`;
    const prev = `<span class="control" id="prev">${this.FA_PREV}</span>`;
    const next = `<span class="control" id="next">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = pause + prev + next;

    this.carousel.append(controls);

    this.pauseBtn = document.querySelector('#pause');
    this.prevBtn = document.querySelector('#prev');
    this.nextBtn = document.querySelector('#next');
  },

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_LENGTH; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;

      indicators.append(indicator);
    }

    this.carousel.append(indicators);

    this.indicatorContainer = this.carousel.querySelector('.indicators');
    this.indicators = this.indicatorContainer.querySelectorAll('.indicator');
  },

  _tick() {
    this.timerID = setInterval(() => this._goToNext(), this.interval);
  },

  _goToNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  },

  _goToPrev() {
    this._goToNth(this.currentSlide - 1);
  },

  _goToNext() {
    this._goToNth(this.currentSlide + 1);
  },

  _pause() {
    clearInterval(this.timerID);
    this.isPlaying = false;
    this.pauseBtn.innerHTML = this.FA_PLAY;
  },

  _play() {
    this._tick();
    this.isPlaying = true;
    this.pauseBtn.innerHTML = this.FA_PAUSE;
  },

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      this._goToNth(+target.dataset.slideTo);
      this._pause();
    }
  },

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  },

  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  },

  prev() {
    this._goToPrev();
    this._pause();
  },

  next() {
    this._goToNext();
    this._pause();
  },

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  }
};

Carousel.prototype.constructor = Carousel;
