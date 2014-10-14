$(function(){


	// Cursor at end fix via teedyay on github
	jQuery.fn.putCursorAtEnd = function(){
	    return this.each(function(){
	        $(this).focus()

	        // If this function exists...
	        if (this.setSelectionRange){
		        // (Doesn't work in IE)
		        // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
		        var len = $(this).val().length * 2;
		        this.setSelectionRange(len, len);
	        } else {
		        // replace the contents with itself
		        // (Doesn't work in Google Chrome)
		        $(this).val($(this).val());
	        }
	        // Scroll to the bottom, in case we're in a tall textarea
	        // (Necessary for Firefox and Google Chrome)
	        this.scrollTop = 999999;
	    });
   	};
   	$('#search_term').putCursorAtEnd();

   	displayTweetOverlay = function(elem){
   		thatTweet = elem.closest('.tweet');
   		setTimeout(function() {
   			// Fade In Overlay
			thatTweet.find('.overlayBody').show();	
		}, 300);

		setTimeout(function() {
			thatTweet.find('.overlayBody').removeClass('fadeIn')
			  .addClass('fadeOut');
		}, 2000);

		setTimeout(function() {
			thatTweet.find('.overlayBody').hide();
		}, 4000);
   	}

   	// Using modernizer, we know if this browser supports CSS Transformations
	if ($('html').hasClass('csstransforms3d')) {

		// Add the flip functionality to our tweets
		$('.tweet').removeClass('scroll').addClass('flip');	

		// ** HOVER Effects
		// Tease Tweet Downwards
		$('.userIdentifier').hover(function(){
			$(this).closest('.mainBody').addClass('teaseDown');
		}, function(){
			$(this).closest('.mainBody').removeClass('teaseDown');
		});
		// Tease Tweet Leftwards
		$('.reply.notSent').hover(function(){
			$(this).closest('.mainBody').addClass('teaseLeft');
		}, function(){
			$(this).closest('.mainBody').removeClass('teaseLeft');
		});
		// ** End HOVER Effects

		
		// ** HOVER Effects
		// Getting User Information Flip Down
		$('.userIdentifier').on('click', function(event){
			event.stopPropagation();
			event.preventDefault();

			// todo: Refactor this flip behavior into one method with flip behavior
			// todo: Get rid of triple event bubbling
			// console.log('Clicking Reply');
			// console.log(event.isPropagationStopped());
			var thatTweet = $(this).closest('.tweet');

			// Make sure other flipper doesn't show
			//thatTweet.find('.replyBody').hide();

			// Reply Body / Main Body fade out
			thatTweet.find('.replyBody').removeClass('fadeIn').addClass('fadeOut').hide();
			thatTweet.find('.mainBody').removeClass('.teaseDown');
			thatTweet.find('.mainBody').removeClass('fadeIn');
			thatTweet.find('.mainBody').addClass('behind'); // For chrome jank
			thatTweet.find('.contentWrapper').removeClass('fadeIn').addClass('fadeOut');

			// User Body fade in
			thatTweet.find('.userBody').removeClass('fadeOut');
			thatTweet.find('.userBody').addClass('fadeIn').show();


			// Follower Count fade out
			// thatTweet.find('.followerCount').removeClass('fadeIn');
			// thatTweet.find('.followerCount').addClass('fadeOut');
			thatTweet.find('.followerCount').addClass('fadeOut');

			// Flipper
			thatTweet.find('.topTweetWrapper').addClass('flipTop');

		});

		$('.userBody').on('click', '.flipBack', function(event){ 
			event.preventDefault();
			event.stopPropagation();

			// We're flipping back up
			// todo: Get rid of triple event bubbling
			var thatTweet = $(this).closest('.tweet');
			
			// Main Body fade in
			thatTweet.find('.contentWrapper').removeClass('fadeOut').addClass('fadeIn');

			// Follower Count fade in
			thatTweet.find('.followerCount').addClass('fadeIn');

			// Flip that Back
			thatTweet.find('.topTweetWrapper').removeClass('flipTop');
		});

		$('.replyBody').on('click', '.flipBack', function(event){
			event.preventDefault();
			event.stopPropagation();

			console.log('clickBack')
			// todo: Get rid of triple event bubbling
			var thatTweet = $(this).closest('.tweet');
			
			// Main Body fade in
			thatTweet.find('.contentWrapper').removeClass('fadeOut').addClass('fadeIn');

			// Reply Body fade out
			// thatTweet.find('.replyBody').addClass('fadeOut');
			// thatTweet.find('.replyBody').removeClass('fadeIn');

			// Follower Count fade in
			thatTweet.find('.followerCount').addClass('fadeIn');

			// Flip that Back
			thatTweet.find('.topTweetWrapper').removeClass('flipLeft');
		});

			// Sending Replies		
			$('.reply.notSent').on('click', function(event){
				event.stopPropagation();
				event.preventDefault();

				// todo: Get rid of triple event bubbling
				// console.log('Clicking Reply');
				// console.log(event.isPropagationStopped());
				var thatTweet = $(this).closest('.tweet');

				// Make sure other flipper doesn't show
				thatTweet.find('.userBody').hide();

				// Main Body fade out
				thatTweet.find('.mainBody').removeClass('.teaseLeft');
				thatTweet.find('.mainBody').removeClass('fadeIn');
				thatTweet.find('.mainBody').addClass('behind'); // For chrome jank
				thatTweet.find('.contentWrapper').removeClass('fadeIn').addClass('fadeOut');

				// Reply Body fade in
				thatTweet.find('.replyBody').removeClass('fadeOut');
				thatTweet.find('.replyBody').addClass('fadeIn').show();

				// Follower Count fade out
				// thatTweet.find('.followerCount').removeClass('fadeIn');
				// thatTweet.find('.followerCount').addClass('fadeOut');
				thatTweet.find('.followerCount').addClass('fadeOut');

				// Make text area focus
				thatTweet.find('.replyText').focus();
				thatTweet.find('.replyText').putCursorAtEnd();

				// Flipper
				thatTweet.find('.topTweetWrapper').addClass('flipLeft');

			});

			$('.sendReply').on('click', function(event){
				event.stopPropagation();

				// todo: Get rid of triple event bubbling
				// console.log('Clicking Reply');
				// console.log(event.isPropagationStopped());
				var thatTweet = $(this).closest('.tweet');
				// Main Body fade in
				// thatTweet.find('.mainBody').removeClass('fadeOut');
				// thatTweet.find('.mainBody').addClass('fadeIn');
				thatTweet.find('.contentWrapper').addClass('fadeIn');

				// Reply Body fade out
				// thatTweet.find('.replyBody').addClass('fadeOut');
				// thatTweet.find('.replyBody').removeClass('fadeIn');

				// Follower Count fade in
				//thatTweet.find('.followerCount').removeClass('fadeOut');
				//thatTweet.find('.followerCount').addClass('fadeIn');
				thatTweet.find('.followerCount').show();

				// Flip that Back
				thatTweet.find('.topTweetWrapper').removeClass('flipLeft');


				// Display feedback for reply
				thatTweet.find('.reply.notSent').hide();

				displayTweetOverlay($(this));	
			});

		} else {

		// If CSS 3 Animations aren't supported
		// $('.tweet').hover(
		// 	function () {
		// 		$(this).find('.tweet-detail').stop().animate({bottom:0}, 500, 'easeOutCubic');
		// 	},
		// 	function () {
		// 		$(this).find('.tweet-detail').stop().animate({bottom: ($(this).height() * -1) }, 500, 'easeOutCubic');			
		// 	}
		// );

		}

		var followingBox = null;
		// Follower Button Interactivity
		$('.notFollowing').hover(function(){
			followingBox = $(this);
			$(this).hide();
		});

		$('.follow').on('mouseout', function(){
			followingBox.show();
		});

		$('.follow').on('click', function(){
			followingBox = $(this).closest('.status').find('.unfollow');
			followingBox.show();
			$(this).closest('.status').find('.notFollowing').hide();
			$(this).hide();
			$(this).closest('.status').find('.following').show();
			// Lastly reverse order of boxes by changing default state
			$(this).closest('.noFol').addClass('fol').removeClass('noFol');
		});

		$('.unfollow').on('click', function(){
			$(this).closest('.status').find('.following').hide();
			$(this).hide();
			$(this).closest('.status').find('.notFollowing').show();
			$(this).closest('.status').find('.follow').show();
			// Lastly reverse order of boxes by changing default state
			$(this).closest('.fol').addClass('noFol').removeClass('fol');
		});

		$('.following').hover(function(){
			followingBox = $(this);
			$(this).hide();
		});

		$('.unfollow').on('mouseout', function(){
			followingBox.show();
		});

		$('.favorite.notSent').on('click', function(e){
			$(this).closest('.noFav').addClass('fav').removeClass('noFav');
			// $(this).closest('.tweetActions').find('.favorite.sent').show();
		});

		$('.favorite.sent').on('click', function(e){
			$(this).closest('.fav').addClass('noFav').removeClass('fav');
			//$(this).closest('.tweetActions').find('.favorite').show();
		});

		$('.retweet.notSent').on('click', function(){
			$(this).hide();
		});

		//**** Text area character count 140
		$('.replyText').on('keyup', function(e) {
			var len = $(this).val().length;
			var letterCount = $(this).closest('.replyBody').find('.letterCount');
			var remaining = 140 - len;
			if (remaining < 10) {
				letterCount.addClass('warning');
			}
			letterCount.html(remaining);
		});


		//**** Flashing Map Tweet Text
		var flashingTweetText = $('.flashingTweetText');
		$("#map").on('click', '.tweet-location-dot', function(event){
			// $(this).attr('data-text');
			
		});

		$("#map").on('mouseenter', '.tweet-location-dot', function(event){
			// console.log($(this).attr('data-text'));
			flashingTweetText.removeClass('fadeOut');
			flashingTweetText.html($(this).attr('data-text'));
		});

		$("#map").on('mouseleave', '.tweet-location-dot', function(event){
			// console.log($(this).attr('data-text'));
			flashingTweetText.addClass('fadeOut');
		});

		// $("#map").delegate('.tweet-location-dot', 'hover', function ( event ) {
		//     if (event.type == 'mouseover') {
		//         console.log($(this).attr('data-text'));
		//         console.log('mouseover')
		//     } if (event.type == 'mouseenter'){
		//     	console.log('mouseenter');
		//     } else {
		//         console.log('Some other event');
		//     }
		// });

		// $("#map").find('.tweet-location-dot').hover(function(){
	 //    	console.log($(this).attr('data-text'));
	 //    	console.log('entering');
		// }, function(){
		//     console.log('leaving');
		// });

		



		// $('.tweet.flip').hover(
		// 	function () {
		// 		// Main Body fade out
		// 		$(this).find('.mainBody').removeClass('fadeIn');
		// 		$(this).find('.mainBody').addClass('fadeOut');
		// 		// Reply Body fade in
		// 		$(this).find('.replyBody').removeClass('fadeOut');
		// 		$(this).find('.replyBody').addClass('fadeIn');
		// 		// Follower Count fade out
		// 		$(this).find('.followerCount').removeClass('fadeIn');
		// 		$(this).find('.followerCount').addClass('fadeOut');

		// 		$(this).find('.topTweetWrapper').addClass('flipLeft');
		// 	},
		// 	function () {
		// 		// Main Body fade in
		// 		$(this).find('.mainBody').removeClass('fadeOut');
		// 		$(this).find('.mainBody').addClass('fadeIn');
		// 		// Reply Body fade out
		// 		$(this).find('.replyBody').addClass('fadeOut');
		// 		$(this).find('.replyBody').removeClass('fadeIn');
		// 		// Follower Count fade in
		// 		$(this).find('.followerCount').removeClass('fadeOut');
		// 		$(this).find('.followerCount').addClass('fadeIn');

		// 		$(this).find('.topTweetWrapper').removeClass('flipLeft');			
		// 	}
		// );
		
	
});