SC.initialize({
  client_id: '340f063c670272fac27cfa67bffcafc4'
});

$(document).ready(function() {

  // Gets the search input
  $('#searchButton').click(function(e) {
    e.preventDefault();

    var val = $('#search').val();
    soundcloud( val );
  });

  function soundcloud( search ) {
    SC.get('/tracks', {
      q: search,
      limit: 2
      // license: 'cc-by-sa'
    }).then(function(tracks) {

      // console.log(tracks);
      $('#soundcloud-row').html('');
      $.each( tracks, function( index, track ) {
        // console.log(track);

        SC.oEmbed( track.permalink_url, {
          auto_play: false,
          maxheight: '100px',
          show_comments: false
        } ).then( function( oEmbed ) {
          console.log('oEmbed response: ', oEmbed);

          var col = $('<div class="col-sm-6">');
              col.html( oEmbed.html.replace( 'visual=true&','visual=false&') );

          $('#soundcloud-row').append( col );
        });

      });

    });
  }

});