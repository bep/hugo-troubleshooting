(function($){
  var el;
  var settings = {};

  var methods = {
    init: function(options) {
      el = this;

      settings = {
                   token: false,
                   query_param: 'query'
                 };

      if (options) {
        $.extend(settings, options);
      }

      if (!settings.token || settings.query_param == '') {
        return this;
      }

      $.getJSON(
        'https://search.beyondvm.com/api/1/search.json?token=' + settings.token + '&query=' + paramValue(settings.query_param) + '&callback=?', function(data){
          if(settings['complete']) { settings.complete() }
          $.each(data, function(key, val) {
            el.append('<div class="blog-post"><div class="blog-post-title"><h2><a href="' + val.link + '">' + val.title + '</a></h2></div><div class="blog-post-body"><div class="row"><div class="col-md-12">' + (jQuery.trim(val.summary).substring(0, 500).trim(this) + "...") + '</div></div><div class="row"><div class="pull-right"><a class="btn btn-readmore" href="<a href="' + val.link + '">Read More <span class="fa fa-angle-double-right"></span></a></div></div></p></div></div>');
          });
        }
      );

      return this;
    }
  };

  // Extract the param value from the URL.
  function paramValue(query_param) {
    var results = new RegExp('[\\?&]' + query_param + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : false;
  }

  $.fn.tapir = function(method) {
    if (methods[method]) {
      return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.tapir');
    }
  };

})( jQuery );
