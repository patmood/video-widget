;(function($) {

  var KamcordVideos = function(el, options) {
    var settings = $.extend({
      autoplay: true,
      muted: true,
      showControls: true
    }, options)

    this.el = el
    this.page = 0
    this._setContainers()
    this.getFeed(this.page)


    // add handlers
  }

  KamcordVideos.prototype = {
    constructor: KamcordVideos,

    addVideo: function(vid) {
      var thumb = vid.thumbnail_urls.small.url
        , templateHTML =
        '<div class="vid-box">' +
          '<div class="preview shadow">' +
            '<div class="play-overlay"></div>' +
            '<div class="interaction">' +
              vid.interaction_counts.likes + ' likes<br>' +
              vid.interaction_counts.comments + ' comments' +
            '</div>' +
            '<div class="duration">' +
              this._calculateDuration(vid.duration) +
            '</div>' +
          '</div>' +
          '<div class="details shadow">' +
            '<div class="game-icon">' +
              '<img src="http://placekitten.com/g/64/64">' +
            '</div>' +
            '<div class="title">' +
              '<a href=' + vid.video_watch_page + ' target="_blank">' +
                vid.title +
              '</a>' +
            '</div>' +
            '<span class="info">' +
              vid.display_list_info[0][0] + ' - ' + vid.display_list_info[0][1] +
            '</span>' +
          '</div>' +
        '</div>'

      var $template = $(templateHTML)
      this.el.find('.vid-container').append($template)
      $template.find('.preview')
              .css('background-image', 'url(' + thumb + ')')
              .one('click', vid, this._playVid)
      return this
    },

    render: function() {
      if (!this.feed.length) return;
      var _this = this
      this.feed.forEach(function(video) {
        _this.addVideo(video)
      })
      return this
    },

    getFeed: function(page) {
      // Normally do $.ajax request here and render in the success callback
      // Hardcoded for simplicity
      this.feed = window.API['page' + page].response.feed_info
      this.render()
      return this
    },

    nextPage: function() {
      this.page += 1
      this.getFeed(this.page)
      return this
    },

    _calculateDuration: function(totalSeconds) {
      var minutes = Math.floor(totalSeconds / 60)
        , seconds = Math.round(totalSeconds % 60)
      return minutes + ':' + seconds
    },

    _playVid: function(e) {
      var url = e.data.video_urls.encoded[0].url
        , vidTemplate =
        '<div class="fill-video">' +
          '<video class="player" controls autoplay muted>' +
            '<source src=' + url + '>Browser not supported :('
          '</video>' +
        '</div>'
      $(this).html(vidTemplate)
    },

    _setContainers: function() {
      var $containers = $(
        '<div class="vid-container"></div>' +
        '<div class="load-more shadow">Load More...</div>'
      )
      this.el.append($containers)
      this.el.find('.load-more').on('click', this.nextPage.bind(this))
    }

  }

  // Create the jQuery method
  $.fn.kamcordVideos = function(options) {
    return this.each(function() {
      var el = $(this)
      el.data('kamcordVideos', new KamcordVideos(el, options))
    })
  }

}(jQuery))
