/* eslint-disable prefer-rest-params */
/* eslint-disable no-undef */

function SwipeCarousel() {
  Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initListeners = function () {
  Carousel.prototype._initListeners.apply(this);
  this.carousel.addEventListener('touchstart', this._swipeStart.bind(this));
  this.carousel.addEventListener('touchend', this._swipeEnd.bind(this));
};

SwipeCarousel.prototype._swipeStart = function (e) {
  this.swipeStartX = e.changedTouches[0].pageX;
};

SwipeCarousel.prototype._swipeEnd = function (e) {
  this.swipeEndX = e.changedTouches[0].pageX;
  if (this.swipeStartX - this.swipeEndX < -50) this.prev();
  if (this.swipeStartX - this.swipeEndX > 50) this.next();
};
