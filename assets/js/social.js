var instaURL = "https://igpi.ga/"
var fbURL = "https://graph.facebook.com/v2.10/?id=" 
var fbAccessToken = "160526811177215|24f1091fcfbe3cf6a77775e061a9544f"
var instaAccessToken = "&access_token=36374177.8899a4f.8288696c32cb409b8938cf3f0798ad20"
var fbFields="&fields=posts{message,created_time,link,full_picture,type}&access_token=160526811177215|24f1091fcfbe3cf6a77775e061a9544f"


var $grid = $('#fb-row').imagesLoaded( function() {
	$grid.masonry({
	itemSelector: '.fb-col',
	columnWidth: '.fb-sizer',
	percentPosition: true
	});
});

function populateSocial () {
	event.preventDefault()
	var artist = $("#search").val();
	var fbAjaxURL = fbURL+artist+fbFields;
	var instaAjaxURL = instaURL + artist + "/media?callback=?";



	// $.getJSON(instaAjaxURL, function(response){
	// 	console.log(response);
	// })



	$.ajax({
		url: fbAjaxURL,
		type: 'GET',
	}).done(function(result) {
		console.log(result);
		$('#fb-row').empty()
		$('#fb-row').append('<div class="grid-sizer">');
		var fbData = result.posts.data;

		for (var i = 0;i<11;i++) {
			var dataset = fbData[i];

			var imgURL = dataset.full_picture;
			var createdTime = dataset.created_time;
			var link = dataset.link;
			var message = dataset.message;

			console.log("=============")
			// console.log("img URL : " + imgURL);
			// console.log("created time : " + createdTime);
			// console.log("link : " + link);


			var column    = $('<div class="col-sm-4 fb-col">');
			var fbPostImg = $("<img>");
			var fbCard = $("<div>")
			var fbMessageDiv = $("<div>");

			fbPostImg.attr({
				src: imgURL,
				class: "img-rounded img-responsive center-block"
			})

			fbCard.append(fbPostImg);

			var fbMessageDiv = $("<div>");
			
			if (message) {
				fbMessageDiv.text(message);
				fbCard.append(fbMessageDiv);
				message = ""
			}

			column.append(fbCard)
			console.log("We are appending")
        // Masonry layout
        $column =  $( column );
        $grid.append( $column ).masonry( 'appended', $column );
        $grid.imagesLoaded( function() {
          $grid.masonry('layout');
        });
			// var fbCol = $("<div>");
			// fbCol.addClass("col-md-3 col-sm-4 col-xs-6")

			// var fbCard = $("<div>")
			// var fbPostImg = $("<img>");
			// var fbPostDiv = $("<div>");
			// var fbMessageDiv = $("<div>");



			// fbCard.addClass("panel panel-primary");
			// fbPostDiv.addClass("panel-body");
			// fbPostImg.addClass("img-rounded img-responsive center-block");
			// fbPostImg.attr("src", imgURL);
			// fbPostImg.css("width", "200px");
			// fbPostImg.css("height", "200px");
			// fbMessageDiv.addClass("panel-footer");


			// fbPostDiv.append(fbPostImg);
			// fbCard.append(fbPostDiv);

			// if (message) {
			// 	fbMessageDiv.text(message);
			// 	fbCard.append(fbMessageDiv);
			// 	message = ""
			// }
			// fbCol.append(fbCard);


	        // Masonry layout

			// $("#social").append(fbCol)
		}

	})

}

$(document).on("click", "#searchButton", populateSocial)

console.log("this loaded")