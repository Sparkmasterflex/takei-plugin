(function() {
  var TakeiIt;

  TakeiIt = function(el, options) {
    return this.initialize(el, options);
  };

  $.fn.takei_it = function(options) {
    return window.takei = new TakeiIt(this, options);
  };

  $.extend(TakeiIt.prototype, {
    key_combo: [40, 40, 38, 38, 80],
    typed: [],
    image: "george-takei.png",
    sound_clip: "george-takei-oh-my.mp3",
    start_x: "-300px",
    start_y: "-100px",
    end_x: "0px",
    end_y: "0px",
    initialize: function($el, options) {
      var _this = this;
      return $(window).on('keyup', function(e) {
        return _this.test_key_combo(e);
      });
    },
    test_key_combo: function(e) {
      if (this.next_in_combo(e.keyCode)) {
        this.typed.push(e.keyCode);
      } else {
        this.typed = [];
      }
      if (this.combo_entered()) {
        this.add_george();
        return this.typed = [];
      }
    },
    next_in_combo: function(kc) {
      return this.key_combo[this.typed.length] === kc;
    },
    combo_entered: function() {
      return $(this.typed).not(this.key_combo).length === 0 && $(this.key_combo).not(this.typed).length === 0;
    },
    add_george: function() {
      var _this = this;
      if (this.oh_my == null) {
        this.oh_my = new Audio("javascripts/" + this.sound_clip);
      }
      this.$img = $('img.takei-it-image').length ? $('img.takei-it-image') : $("<img class='takei-it-image' src='javascripts/" + this.image + "' alt='GeorgeTakei' />");
      $('body').append(this.$img);
      this.$img.css({
        position: 'fixed',
        bottom: this.start_y,
        right: this.start_x
      });
      return this.animate_to('end', {
        callback: function() {
          _this.oh_my.play();
          return _this.animate_to('start', {
            delay: 1200
          });
        }
      });
    },
    animate_to: function(pos, options) {
      var dlay, spd, to;
      dlay = options.delay || 0;
      spd = options.speed || 400;
      to = pos === 'start' ? {
        bottom: this.start_y,
        right: this.start_x
      } : {
        bottom: this.end_y,
        right: this.end_x
      };
      return this.$img.delay(dlay).animate(to, spd, 'swing', function() {
        return typeof options.callback === "function" ? options.callback() : void 0;
      });
    }
  });

  $(function() {
    return $(window).takei_it();
  });

}).call(this);
