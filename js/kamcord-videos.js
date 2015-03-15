;(function($) {

  var KamcordVideos = function(el, options) {
    var settings = $.extend({
      autoplay: false
    }, options)

    this.el = el

    var feedInfo = this.getFeed(1)

    this.addFeed()

    // add handlers
  }

  KamcordVideos.prototype = {
    constructor: KamcordVideos,

    addVideo: function(vid) {
      var thumb = vid.thumbnail_urls.small.url
        , templateHTML =
        '<div class="vid-box">' +
          '<div class="preview shadow">' +
          '</div>' +
          '<div class="details shadow">' +
            '<div class="game-icon">' +
              '<img src="http://placekitten.com/g/32/32">' +
            '</div>' +
            '<div class="stats">' +
              '<div class="title">' +
                '<a href=' + vid.video_watch_page + ' target="_blank">' +
                  vid.title +
                '</a>' +
              '</div>' +
              '<div class="info">' +
                vid.display_list_info[0][0] + ' - ' + vid.display_list_info[0][1] +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'

      var template = $().add(templateHTML)
      this.el.append(template)
      template.find('.preview')
              .css('background-image', 'url(' + thumb + ')')
              .one('click', vid, this.playVid)
    },

    addFeed: function() {
      if (!this.feed.length) return
      var _this = this
      this.feed.forEach(function(video) {
        _this.addVideo(video)
      })
    },

    playVid: function(e) {
      var url = e.data.video_urls.encoded[0].url
        , vidTemplate =
        '<div class="fill-video">' +
          '<video controls autoplay muted class="player">' +
            '<source src=' + url + '>Browser not supported :('
          '</video>' +
        '</div>'
      $(this).html(vidTemplate)

    },

    getFeed: function(page) {
      // Normally do GET request here
      return this.feed = window.API['page' + page].response.feed_info
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
