export default {
  getNextDate(datesArray, referenceDate){
    var now = new Date(referenceDate);
    var closest = Infinity;

    datesArray.forEach(function(d) {
      var date = new Date(d);
      if (date >= now && date < closest) {
        closest = d;
      }
    });

    if (closest === Infinity) {
      return null;
    } else {
      return closest;
    }
  },
  nextDateByDayOfWeek(weekDay, referenceDate) {
    referenceDate = new Date(referenceDate);
    weekDay = weekDay.toLowerCase();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let referenceDateDay = referenceDate.getDay();

    for (var i = 7; i--;) {
      if (weekDay === days[i]) {
        weekDay = (i <= referenceDateDay) ? (i + 7) : i;
        break;
      }
    }

    let daysUntilNext = weekDay - referenceDateDay;

    return referenceDate.setDate(referenceDate.getDate() + daysUntilNext);
  },
  nextDateByDayOfWeekArray(daysArray, referenceDate) {
    let tempArray = [];
    for (var i = 0; i < daysArray.length; i++) {
      tempArray.push( new Date (this.nextDateByDayOfWeek(daysArray[i], referenceDate) ) );
    }
    return this.getNextDate(tempArray, referenceDate);
  },
  isDateLessOrEquals(time1, time2) {
    return new Date(time1) <= new Date(time2);
  },
  countDays(start, end) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(start);
    const secondDate = new Date(end);

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  },
  addDays(date, quantity) {
    let result = new Date(date);
    result.setDate(result.getDate() + quantity);
    return result;
  },
  getFirstSunday(date) {
    var firstDay =  this.getFirstDayOfMonth(date);
    return new Date(
      firstDay.setDate(
        firstDay.getDate()
        -firstDay.getDay()
      )
    );
  },
  getFirstDayOfMonth(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(), 1
    );
  },
  getNextMonth(date){
    let nextMonth;

    this.$emit('nextMonth');

    if (date.getMonth() == 11) {
      nextMonth = new Date(date.getFullYear() + 1, 0, 1);
    } else {
      nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    return nextMonth;
  },

  swipeAfterScroll(direction){
    if (this.screenSize !== 'desktop' && this.isOpen) {
      const swiperWrapper = document.getElementById('swiperWrapper');

      const renderNextMonth = (times = 4) => {
        let x = times;

        do {
          this.renderNextMonth();
        } while( x-- );
      };

      // If wrapper has vertical scroll
      if (swiperWrapper.scrollHeight > swiperWrapper.clientHeight) {
        if( swiperWrapper.scrollTop === (swiperWrapper.scrollHeight - swiperWrapper.offsetHeight) ) {
          renderNextMonth(4);
        }
        else if ( swiperWrapper.scrollTop === 0){
          this.renderPreviousMonth();
        }
        else { return; }
      }
      else if (direction == 'up'){
        renderNextMonth(4);
      }
      else if (direction == 'down') {
        this.renderPreviousMonth();
      }
    }
  },

  handleTouchStart(evt) {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  },

  handleTouchMove(evt) {
    if ( !this.xDown || !this.yDown ) { return; }

    this.xUp = evt.touches[0].clientX;
    this.yUp = evt.touches[0].clientY;

    let xDiff = this.xDown - this.xUp;
    let yDiff = this.yDown - this.yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      if ( xDiff > 0 ) {
        // swipe right
      } else {
        // swipe left
      }
    } else {
      if ( yDiff > 0 ) {
        // swipe up
        this.swipeAfterScroll('up');
      } else {
        // swipe down
        this.swipeAfterScroll('down');
      }
    }
    this.xDown = null;
    this.yDown = null;
  },
};
