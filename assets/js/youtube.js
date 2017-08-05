// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
  // This API key is intended for use only in this lesson.
  // See http://goo.gl/PdPA1 to get a key for your own applications.
  gapi.client.setApiKey('AIzaSyBWLFMCKJ6Uy5pVPe73pk-YGYfpAagp9x4');
}

function search(q) {
	// Use the JavaScript client library to create a search.list() API call.
	var request = gapi.client.youtube.search.list({
		q: q,
		part: 'snippet',
		maxResults: 4,
		order: 'viewCount',
		safeSearch: 'moderate',
		type: 'video',
		videoEmbeddable: true
	});

	// Send the request to the API server,
	// and invoke onSearchRepsonse() with the response.
	request.execute(onSearchResponse);
	}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
  // console.log(response);
  var videos = response.items;

  // Clear out youtube div
  $('#videos-row').html('');

  $.each( videos , function( index, video ) {
    var videoID = video.id.videoId;
    var thumb = video.snippet.thumbnails.medium.url;
    var col   = $('<div class="col-video col-sm-3">');
    var item  = $('<div class="video-item" data-video-id="">');
    item.attr('data-video-id', videoID );
    var embed = $('<div class="embed-responsive embed-responsive-16by9">');
    var image = $('<img>');
    image.attr('src', thumb ).addClass('media-fluid');

    col.append( item.append(image) );

    // append columns to the #youtube
    $('#videos-row').append( col );
  });
}


$(document).ready(function() {

	// Gets the search input
  $('#searchButton').click(function(e) {
    e.preventDefault();
    var val = $('#search').val();

    // Run the search
    search(val);
  });

  // When a video is clicked load modal
  $(document).on('click', '.video-item', function(event) {
    event.preventDefault();

    var videoId = $(this).attr('data-video-id');
    var videoSrc = 'https://www.youtube.com/embed/'+ videoId + '?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0';

    $('#modal-video .embed-responsive-item').attr( 'src', videoSrc );
    $('#modal-video').modal();
  });


  // Stops Video from playing when modal is closed
  $('#modal-video').on('hide.bs.modal', function (e) {
    $('#modal-video .embed-responsive-item').attr( 'src', '' );
  });

});

