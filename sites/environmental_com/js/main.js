		$(function(){
			$('#menu a')
				.css( {backgroundPosition: "0 0"} )
				.mouseover(function(){
					$(this).stop().animate({backgroundPosition:"(0 -250px)"}, {duration:400})
				})
				.mouseout(function(){
					$(this).stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
			})
		});