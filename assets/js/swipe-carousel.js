import Carousel from '../js/carousel.js';
class SwipeCarousel extends Carousel {
  _initListeners() {
    super._initListeners();
    this.carousel.addEventListener('touchstart', this._swipeStart.bind(this));
    this.carousel.addEventListener('touchend', this._swipeEnd.bind(this));
  }

  _swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  }

  _swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    if (this.swipeStartX - this.swipeEndX < -50) this.prev();
    if (this.swipeStartX - this.swipeEndX > 50) this.next();
  }
}

export default SwipeCarousel;

