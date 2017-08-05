$(document).ready(function() {

  $("#select-artist").on("click", function(event) {
    event.preventDefault();
    var artistInput = $("#artist-input").val().trim();
    $("#article").hide();
    $(".event").empty();
    $(".list").empty();
    searchBandsInTown(artistInput);
  });

var ArtistURL="";
var artistThumbURL="";
var artistFB="";
var artistName="";

  function searchBandsInTown(artistInput) {
    let queryArtist= 'https://rest.bandsintown.com/artists/' + artistInput + '?app_id=codingbootcamp';
    let queryEvent = 'https://rest.bandsintown.com/artists/' + artistInput + '/events?app_id=codingbootcamp';
    
    $.ajax({
      url: queryArtist,
      method: "GET",
      error:function(xhr, textStatus, errorThrown){},
      success:function(response) {
        let artist=$("<center>").append($("<h1>").html(response.name));
        artist.append('<a href="#" data-toggle="tooltip" data-placement="right" title="Click Here to Enlarge the Picture"><img class="img-responsive image" data-toggle="modal" data-target="#imageModal" src=' + response.thumb_url + '></img></a>');
        artist.append('<br>')
        artist.append('<a href="#" id="more" data-toggle="tooltip" data-placement="right" title="Click Here to Read More">Read more about the artist</a>');
        $(".list").append(artist);
        artistName = response.name;
        artistThumbURL = response.thumb_url;
        ArtistURL = response.image_url;
        artistFB = response.facebook_page_url;
      }
    });
    
    $.ajax({
      url: queryEvent,
      method: "GET",
      error:function(xhr, textStatus, errorThrown){
        $(".noArtist").show();
        $(".noArtist").html("<center><h3>No Artist with that name</h3></center>");
        $(".event").hide();
        $(".list").hide();
        $(".eventTable").hide();
       },
      success:function(response) {
        $(".noArtist").hide();
        $(".event").show();
        $(".list").show();
        $(".eventTable").show();
        if (!response.length) {
          $(".event").html('No upcoming event...');
        } else {
          $(".eventHeader").append(event);
          for (let i = 0; i < 10; i++) {
            let event=$("<tr>");
            event.append("<td class='td'>" + moment(response[i].datetime).format('MM/DD/YYYY h:mm a') + "</td>" );
            event.append("<td class='td'>" + response[i].venue.name + "</td>");
            event.append("<td class='td'>" + response[i].venue.city + ", " + response[i].venue.country +"</td>" );
            $(".event").append(event);
          }
        }
      }
    });
    

    var wikiURL = "https://en.wikipedia.org/w/api.php";
    wikiURL += '?' + $.param({
    'action' : 'opensearch',
    'search' : artistInput,
    'prop'  : 'revisions',
    'rvprop' : 'content',
    'format' : 'json',
    'limit' : 2
    });

    $.ajax({
      url: wikiURL,
      dataType: 'jsonp',
      success: function(data) {
        $('#article').empty();
        let article = $("<p>").html(data);
        article.append('<a href="#" id="more" data-toggle="tooltip" data-placement="right" title="Click Here to Hide">hide</a>');
        $('#article').append(article);
      }
    });

//     $.ajax({
//     url: "https://en.wikipedia.org/w/api.php",
//     data: {
//         format: "json",
//         action: "parse",
//         page: artistInput,
//         prop:"text",
//         section:0,
//     },
//     dataType: 'jsonp',
//     headers: {'Api-User-Agent': 'CBC'},
//     error:function(xhr, textStatus, errorThrown){},
//     success: function (data) {
//       let markup = data.parse.text["*"];
//       let i = $('<div>').html(markup);
//       i.find('a').each(function() { $(this).replaceWith($(this).html()); });
//       i.find('sup').remove();
//       i.find('.mw-ext-cite-error').remove();
//       $('#article').html($(i).find('p'));
//       var article=$('#article').html();
//       var unavailable="<p>Redirect to:</p>"
//       if (article===unavailable){$('#article').html("Sorry, the article you are looking for is not available for publicz")}
//     }
//   });

    $(document).on("click", ".image", function() {
      $('.modalImage').attr('src', ArtistURL); 
    });

    var more=false;
    $(document).on("click", "#more", function() {
      if (!more) {
        $("#article").slideDown(800);
        more=true;
      } else {
        $("#article").slideUp(800);
        more=false;
      }
    });

    $(document).on("click", "#article", function() {
      $("#article").slideUp(800);
        more=false;
      });
  }


});