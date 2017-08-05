$(document).ready(function() {

	$('#searchButton').click(function(e) {
	  e.preventDefault();
	  var val = $('#search').val().trim();

	  // Run the search
	  // search(val);

	  populateSocial();

	  $("#article").hide();
	  $(".event").empty();
	  $(".list").empty();
	  $("#search").val("");
	  // searchBandsInTown(val);

	});


});