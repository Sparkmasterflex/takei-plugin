TakeiIt = (el, options) ->
  # which will break as well, so I'll continue programing till it does not break
  this.initialize el, options

$.fn.takei_it = (options) ->
  window.takei = new TakeiIt this, options

$.extend TakeiIt.prototype,
  key_combo:  [40, 40, 38, 38, 80]
  typed:      []
  image:      "george-takei.png"
  sound_clip: "george-takei-oh-my.mp3"
  start_x:    "-300px"
  start_y:    "-100px"
  end_x:      "0px"
  end_y:      "0px"

  initialize: ($el, options) ->
    $(window).on 'keyup', (e) => @test_key_combo(e)

  test_key_combo: (e) ->
    if this.next_in_combo e.keyCode
      this.typed.push e.keyCode
    else
      this.typed = []

    if this.combo_entered()
      this.add_george()
      this.typed = []

  next_in_combo: (kc) ->
    this.key_combo[this.typed.length] is kc

  combo_entered: ->
    $(this.typed).not(this.key_combo).length is 0 and $(this.key_combo).not(this.typed).length is 0

  add_george: ->
    this.oh_my ?= new Audio("javascripts/#{this.sound_clip}")
    this.$img = if $('img.takei-it-image').length
    then $('img.takei-it-image')
    else $("<img class='takei-it-image' src='javascripts/#{this.image}' alt='GeorgeTakei' />")

    $('body').append this.$img
    this.$img.css
      position: 'fixed'
      bottom: this.start_y
      right: this.start_x
    this.animate_to 'end', callback: () =>
      @oh_my.play()
      @animate_to 'start', {delay: 1200}

  animate_to: (pos, options) ->
    dlay = options.delay or 0
    spd = options.speed or 400
    to = if pos is 'start' then {bottom: this.start_y, right: this.start_x} else {bottom: this.end_y, right: this.end_x}
    this.$img.delay(dlay).animate to, spd, 'swing', () -> options.callback?()

$ ->
  $(window).takei_it()