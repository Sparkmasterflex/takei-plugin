TakeiIt = (el, options) ->
  # which will break as well, so I'll continue programing till it does not break
  this.initialize el, options

$.fn.takei_it = (options) ->
  window.takei = new TakeiIt this, options
  this

$.fn.takei_it.defaults =
  key_combo:  [40, 40, 38, 38, 80]
  image:      "javascripts/george-takei.png"
  sound_clip: "javascripts/george-takei-oh-my.mp3"
  position:   'bottom-right'

$.extend TakeiIt.prototype,
  typed: []

  initialize: ($el, options) ->
    this.klass = "takei-it-image-#{this.random_img_klass()}"
    $(window).on 'keyup', (e) => @test_key_combo(e)
    this.options = $.extend {}, $.fn.takei_it.defaults, options
    {@key_combo, @image, @sound_clip, @position} = this.options


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
    this.oh_my ?= new Audio(this.sound_clip)
    this.$img = if $("img.#{this.klass}").length
    then $("img.#{this.klass}")
    else $("<img class='#{this.klass}' src='#{this.image}' alt='GeorgeTakei' />")

    $('body').append this.$img unless $("img.#{this.klass}").length
    this.$img.css {position: 'fixed'}
    this.$img.css this.start()
    this.animate_to 'end', callback: () =>
      @oh_my.play()
      @animate_to 'start', {delay: 1200}

  animate_to: (pos, options) ->
    dlay = options.delay or 0
    spd = options.speed or 400
    to = if pos is 'start' then this.start() else this.end()
    this.$img.delay(dlay).animate to, spd, 'swing', () -> options.callback?()

  start: ->
    switch this.position
      when 'bottom-right' then {right: "-300px", bottom: "-100px"}
      when 'bottom-left' then {left: "-300px", bottom: "-100px"}

  end: ->
    switch this.position
      when 'bottom-right' then {right: "0px", bottom: "0px"}
      when 'bottom-left' then {left: "0px", bottom: "0px"}

  random_img_klass: ->
    result = ''
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for i in [0...7]
      result += chars[Math.round(Math.random() * (chars.length - 1))]
    result


$ ->
  $(window)
    .takei_it()
    .takei_it
      key_combo: [40, 40, 39, 39, 80]
      position: 'bottom-left'
