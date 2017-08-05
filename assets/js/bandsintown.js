// declare all variables use for bandsintown
var ArtistURL="";
var artistThumbURL="";
var artistFB="";
var artistName="";


// when the search button execute, run searchBandsInTown function
$(document).ready(function() {

  $("#searchButton").on("click", function(event) {
    event.preventDefault();
    var artistInput = $("#search").val().trim();
    $("#article").hide();
    $(".event").empty();
    $(".list").empty();
    $("#search").val("");
    searchBandsInTown(artistInput);
  });


// function to search the artist including all the information
  function searchBandsInTown(artistInput) {
    let queryArtist= 'https://rest.bandsintown.com/artists/' + artistInput + '?app_id=codingbootcamp';
    let queryEvent = 'https://rest.bandsintown.com/artists/' + artistInput + '/events?app_id=codingbootcamp';
    
    $.ajax({
      url: queryArtist,
      method: "GET",
      error:function(xhr, textStatus, errorThrown){},
      success:function(response) {
        let artist=$("<center>").append($("<h1>").html(response.name));
        artist.append('<a href="#!" data-toggle="tooltip" data-placement="right" title="Click Here to Enlarge the Picture"><img class="img-responsive image" data-toggle="modal" data-target="#imageModal" src=' + response.thumb_url + '></img></a>');
        artist.append('<br>')
        artist.append('<a href="#!" id="more" data-toggle="tooltip" data-placement="right" title="Click Here to Read More">Read more about the artist</a>');
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
        article.append('<a href="#!" id="more" data-toggle="tooltip" data-placement="right" title="Click Here to Hide">hide</a>');
        $('#article').append(article);
      }
    });

// when the image click, show the modal
    $(document).on("click", ".image", function() {
      $('.modalImage').attr('src', ArtistURL); 
    });

// when more information requeested
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

// to hide the article
    $(document).on("click", "#article", function() {
      $("#article").slideUp(800);
        more=false;
      });
  }

});