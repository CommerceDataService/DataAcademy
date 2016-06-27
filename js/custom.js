/* =========================================
 * full screen intro 
 *  =======================================*/

function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";
    // var screenHeight = '';
    
    var $windowHeight = $(window).height() // should return a number and not a string of a number
    var newHeight = $windowHeight*.80  // displays height at 80% of window height
    var screenHeight = newHeight + "px"

 //    if ($(window).height() > 500) {
	// screenHeight = $(window).height() + "px";
 //    }
 //    else {
	// screenHeight = "500px";
 //    }


    $("#intro, #intro .item").css({
	width: screenWidth,
	height: screenHeight
    });
}

$.ajax({
   type: 'GET',
   url: '/scripts/cda_courses.json',
   dataType: 'json',
   success: function( data ) {
      

      //This is the initial thumbnail view build
      var thumbnailSource = $('#course_listing_template').html();
      var thumbnailTemplate = Handlebars.compile(thumbnailSource);
      var thumbnailHTML = thumbnailTemplate(data);
      $('#Container').append(thumbnailHTML);


      // Initializes MixItUp functionality after the AJAX call is successful
      // and after the Handlebars templates are built
      // $('#Container').mixItUp({
      //    controls: {
      //       enable: false // we won't be needing these
      //    },
      //    callbacks: {
      //       onMixFail: function(state){
      //          console.log('this is failing');
      //       }
      //    }
      // });
      
   }
});