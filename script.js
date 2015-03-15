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
            '<div class="avatar">' +
              '<img src="http://placekitten.com/g/32/32">' +
            '</div>' +
            '<div class="stats">' +
              '<div class="title">' +
                vid.title +
              '</div>' +
              '<div class="info">' +
                vid.display_list_info[0][0] + ' - ' + vid.display_list_info[0][1]
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'

      var template = $().add(templateHTML)
      this.el.append(template)
      template.find('.preview').css('background-image', 'url(' + thumb + ')')
    },

    addFeed: function() {
      if (!this.feed.length) return
      var _this = this
      this.feed.forEach(function(video) {
        _this.addVideo(video)
      })
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
