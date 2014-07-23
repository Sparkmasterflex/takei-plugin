(function() {
  var TakeiIt;

  TakeiIt = function(el, options) {
    return this.initialize(el, options);
  };

  $.fn.takei_it = function(options) {
    window.takei = new TakeiIt(this, options);
    return this;
  };

  $.fn.takei_it.defaults = {
    key_combo: [40, 40, 38, 38, 80],
    image: "javascripts/george-takei.png",
    sound_clip: "javascripts/george-takei-oh-my.mp3",
    position: 'bottom-right'
  };

  $.extend(TakeiIt.prototype, {
    typed: [],
    initialize: function($el, options) {
      var _ref,
        _this = this;
      this.klass = "takei-it-image-" + (this.random_img_klass());
      $(window).on('keyup', function(e) {
        return _this.test_key_combo(e);
      });
      this.options = $.extend({}, $.fn.takei_it.defaults, options);
      return _ref = this.options, this.key_combo = _ref.key_combo, this.image = _ref.image, this.sound_clip = _ref.sound_clip, this.position = _ref.position, _ref;
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
      if (this.oh_my == null) this.oh_my = new Audio(this.sound_clip);
      this.$img = $("img." + this.klass).length ? $("img." + this.klass) : $("<img class='" + this.klass + "' src='" + this.image + "' alt='GeorgeTakei' />");
      if (!$("img." + this.klass).length) $('body').append(this.$img);
      this.$img.css({
        position: 'fixed'
      });
      this.$img.css(this.start());
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
      to = pos === 'start' ? this.start() : this.end();
      return this.$img.delay(dlay).animate(to, spd, 'swing', function() {
        return typeof options.callback === "function" ? options.callback() : void 0;
      });
    },
    start: function() {
      switch (this.position) {
        case 'bottom-right':
          return {
            right: "-300px",
            bottom: "-100px"
          };
        case 'bottom-left':
          return {
            left: "-300px",
            bottom: "-100px"
          };
      }
    },
    end: function() {
      switch (this.position) {
        case 'bottom-right':
          return {
            right: "0px",
            bottom: "0px"
          };
        case 'bottom-left':
          return {
            left: "0px",
            bottom: "0px"
          };
      }
    },
    random_img_klass: function() {
      var chars, i, result;
      result = '';
      chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (i = 0; i < 7; i++) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      return result;
    }
  });

  $(function() {
    return $(window).takei_it().takei_it({
      key_combo: [40, 40, 39, 39, 80],
      position: 'bottom-left'
    });
  });

}).call(this);
