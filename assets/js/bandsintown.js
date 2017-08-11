// declare variables
var ArtistURL="";
var artistThumbURL="";
var artistName="";
var more=false;

$(document).ready(function() {
// when document ready, hide most of the div and show some div
  $("#bandsintown, #youtube, #social, #instagram, #article, #recentSearch, #artist-navigation, #spotify").hide();

// when the search button executed, run searchBandsInTown function, show most of the div and hide some div
  $("#searchButton").on("click", function(event) {
    $("#bandsintown, #youtube, #social, #instagram, #recentSearch, #artist-navigation, #spotify").show();
    event.preventDefault();
    var artistInput = $("#search").val().trim();
    $("#article, #feature-carousel").hide();
    $(".event").empty();
    $(".list").empty();
    $("#search").val("");
    searchBandsInTown(artistInput);

    window.scrollTo(0, 0);

  });

// function searchBandsInTown start for search the artist including all the information
  function searchBandsInTown(artistInput) {
    let queryArtist= 'https://rest.bandsintown.com/artists/' + artistInput + '?app_id=codingbootcamp';
    let queryEvent = 'https://rest.bandsintown.com/artists/' + artistInput + '/events?app_id=codingbootcamp';

    // run bandsintown API to get the info
    $.ajax({
      url: queryArtist,
      method: "GET",
      error:function(xhr, textStatus, errorThrown){},
      success:function(response) {
        let artist=$("<center>").append($("<h1>").html(response.name));
        artist.append('<a href="#!" data-toggle="tooltip" data-placement="bottom" title="Click Here to Enlarge the Picture"><img class="img-responsive image" data-toggle="modal" data-target="#imageModal" src=' + response.thumb_url + '></img></a>');
        artist.append('<br>')
        artist.append('<a href="#!" id="more" data-toggle="tooltip" data-placement="bottom" title="Click Here to Read More">Read more about the artist</a>');
        $(".list").append(artist);
        artistName = response.name;
        artistThumbURL = response.thumb_url;
        ArtistURL = response.image_url;
      }
    });

    // run bandsintown API to get the events
    $.ajax({
      url: queryEvent,
      method: "GET",
      error:function(xhr, textStatus, errorThrown){
        $(".noArtist").show();
        $(".noArtist").html("<center><h3>No Artist with that name</h3></center>");
        $("#youtube, #social, #instagram, #article, #recentSearch, #artist-navigation, #spotify").hide();
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
          $(".event").html('<br>No upcoming event...');
        } else if (response.length<10){
          $(".eventHeader").append(event);
          for (let i = 0; i < response.length; i++) {
            let event=$("<tr>");
            event.append("<td class='td'>" + moment(response[i].datetime).format('MM/DD/YY') + "</td>" );
            event.append("<td class='td'>" + response[i].venue.name + "</td>");
            event.append("<td class='td'>" + response[i].venue.city + ", " + response[i].venue.country +"</td>" );
            event.append('<td><a href="'+response[i].offers[0].url+'"target="_blank"><button class="btn btn-sm center-block ticketBtn">Tickets and more</button></a></td>');
            $(".event").append(event);
          }
        }else {
          $(".eventHeader").append(event);
          for (let i = 0; i < 10; i++) {
            let event=$("<tr>");
            event.append("<td class='td'>" + moment(response[i].datetime).format('MM/DD/YY') + "</td>" );
            event.append("<td class='td'>" + response[i].venue.name + "</td>");
            event.append("<td class='td'>" + response[i].venue.city + ", " + response[i].venue.country +"</td>" );
            event.append('<td><a href="'+response[i].offers[0].url+'"target="_blank"><button class="btn btn-sm center-block ticketBtn">Tickets and more</button></a></td>');
            $(".event").append(event);
          }
        }
      }
    });

    // run WIKIPEDIA API to get more info about the artist
    $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: {
        format: "json",
        action: "parse",
        page: artistInput,
        prop:"text",
        section:0,
    },
    dataType: 'jsonp',
    headers: {'Api-User-Agent': 'CBC'},
    error:function(xhr, textStatus, errorThrown){},
    success: function (data) {
      let markup = data.parse.text["*"];
      let i = $('<div>').html(markup);
      i.find('a').each(function() { $(this).replaceWith($(this).html()); });
      i.find('sup').remove();
      i.find('.mw-ext-cite-error').remove();
      $('#article').html($(i).find('p'));
      var article=$('#article').html();
      var unavailable="<p>Redirect to:</p>"
      if (article===unavailable){$('#article').html("Sorry, we are unable to find the article.")}
    }
  });
  } /*function searchBandsInTown end*/

  // hide the article when it clicked
  $(document).on("click", "#article", function() {
    $("#article").slideUp(800);
      more=false;
  });

  // when more information requested, show the article
  $(document).on("click", "#more", function() {
    if (!more) {
      $("#article").slideDown(800);
      more=true;
    } else {
      $("#article").slideUp(800);
      more=false;
    }
  });

  // when the image clicked, show the modal
  $(document).on("click", ".image", function() {
    $('.modalImage').attr('src', ArtistURL);
  });

  // when carousel clicked, go to that artist
  $(document).on("click", "#carousel", function() {
    var artist = ($(this).attr("artistName"));
    $("#search").val(artist);
    $("#searchButton").click();
  });

  $(document).on("click", ".recentSearchButton, .artist", function() {
    var artist = ($(this).attr("artistName"));
    $("#search").val(artist);
    $("#searchButton").click();
    window.scrollTo(0, 0);
  });

});