var instaURL = "https://igpi.ga/"
var fbURL = "https://graph.facebook.com/v2.10/?id=" 
var fbGetIDURL = "https://graph.facebook.com/v2.10/search?q="
var fbGetIDToken = "&type=page&access_token=160526811177215|24f1091fcfbe3cf6a77775e061a9544f"
var instaAccessToken = "&access_token=36374177.8899a4f.8288696c32cb409b8938cf3f0798ad20"
var fbFields="&fields=posts{message,created_time,link,full_picture,type}&access_token=160526811177215|24f1091fcfbe3cf6a77775e061a9544f"



var $grid = $('#fb-row').imagesLoaded( function() {
	$grid.masonry({
	itemSelector: '.fb-col',
	columnWidth: '.col-sm-4',
	percentPosition: true
	});
});

var $instaGrid = $('#insta-row').imagesLoaded( function() {
	$instaGrid.masonry({
	itemSelector: '.insta-col',
	columnWidth: '.col-sm-4',
	percentPosition: true
	});
});


function populateSocial () {
	event.preventDefault()
	var artistWithSpace = $("#search").val();
	var artist = artistWithSpace.split(" ").join("+");
	var fbIDURL = fbGetIDURL+artist+fbGetIDToken;
	var instaAjaxURL = instaURL + artist + "/media?callback=?";



	$.getJSON(instaAjaxURL, function(result){
		console.log(result);
		$('#insta-row').empty()
		// $('#fb-row').append('<div class="grid-sizer">');
		var instaData = result.items;

		for (var i = 0;i<11;i++) {
			var dataset = instaData[i];

			var imgURL = dataset.images.standard_resolution.url;
			var createdTime = dataset.created_time;
			var message = dataset.caption.text;
			var likes = dataset.likes.count;
			var link = dataset.link;

			console.log("===== INSTAGRAM ========")
			console.log(imgURL)
			console.log(createdTime)
			console.log(message)
			console.log(likes)
			console.log(link)
			console.log("===== INSTAGRAM  END========")
			var instaColumn    = $('<div class="col-sm-4 fb-col">');
			var instaPostImg = $("<img>");
			var instaCard = $("<div>")
			var instaMessageDiv = $("<div>");
			var instaImgURL = $("<a>")

			instaMessageDiv.addClass("fbMessage")
			instaCard.addClass("fbCard")
			instaPostImg.attr({
				src: imgURL,
				class: " img-responsive center-block",
			})

			instaImgURL.attr("href", link);
			instaImgURL.attr("target", "_blank");
			instaImgURL.append(instaPostImg);

			instaCard.append(instaImgURL);
			
			if (message) {
				instaMessageDiv.html(message+"<br>"+"Likes : " + likes);
				instaCard.append(instaMessageDiv);
				message = ""
			}
			console.log(instaCard)
			instaColumn.append(instaCard)
			console.log("We are appending")
	        // Masonry layout
	        $instaColumn =  $( instaColumn );
	        $instaGrid.append( $instaColumn ).masonry( 'appended', $instaColumn );
	        $instaGrid.imagesLoaded( function() {
	          $instaGrid.masonry('layout');
	        });
		}
	})



	// fb ajax call
	$.ajax({
		url: fbIDURL,
		type: "GET",
	}).done(function(idresult){
		var artistID = idresult.data[0].id;
		var fbAjaxURL = fbURL+artistID+fbFields;

		$.ajax({
			url: fbAjaxURL,
			type: 'GET',
		}).done(function(result) {
			console.log(result);
			$('#fb-row').empty()
			// $('#fb-row').append('<div class="grid-sizer">');
			var fbData = result.posts.data;

			for (var i = 0;i<11;i++) {
				var dataset = fbData[i];

				var imgURL = dataset.full_picture;
				var createdTime = dataset.created_time;
				var link = dataset.link;
				var message = dataset.message;

				console.log("=============")
				console.log(link)
				var column    = $('<div class="col-sm-4 fb-col">');
				var fbPostImg = $("<img>");
				var fbCard = $("<div>")
				var fbMessageDiv = $("<div>");
				var fbImgURL = $("<a>")

				fbMessageDiv.addClass("fbMessage")
				fbCard.addClass("fbCard")
				fbPostImg.attr({
					src: imgURL,
					class: " img-responsive center-block",
				})

				fbImgURL.attr("href", link);
				fbImgURL.attr("target", "_blank");
				fbImgURL.append(fbPostImg);

				fbCard.append(fbImgURL);
				
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
			}

		})
	})

	//insta ajax call



}

$(document).on("click", "#searchButton", populateSocial)

console.log("this loaded")