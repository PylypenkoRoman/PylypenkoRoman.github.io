$(document).ready(function(){
	var timer;
	var win;
	var currentStroke = 0;
	var currentTime = 0;
	var pause = false;

	$("#start-btn").click( function(){
		$(this).fadeOut();
		$(this).parent().find(".curtain").fadeOut("slow");
		$(this).parent().find(".last-block").fadeOut("slow");
		$(this).parent().find(".buttons-wrapper").show("slow");
		$(this).parent().find(".counters-wrapper").show("slow");
		$(this).parent().find(".block").css({"color":"#fff"});
		methods.createArray(methods.mix);
		timeCounter.startCounter();
	});

	$("#reset-btn").click( function(){
		if (pause) {
			return;
		}else{
			methods.mix();
			strokeCounter.resetCounter();
			timeCounter.stopCounter();
			timeCounter.resetCounter();
			timeCounter.startCounter();
		};
	});

	$("#pause-continue-btn").click( function(){
		$(this).text() == "Continue" ? $(this).text("Pause") : $(this).text("Continue");
		$(this).parents().find(".curtain").toggle();

		pause == false ? timeCounter.stopCounter() : timeCounter.startCounter();
		pause == false ? pause = true : pause = false;

	});

	$("#close-btn").click( function(){
		$(this).parent("#win-pop-up").hide();
		$(".curtain").fadeOut();
		$("#reset-btn").trigger("click");
		$(".button").attr('disabled', false);
	});


	$("#barley-break").on("click", ".block",function(e){

			var position = parseFloat(e.currentTarget["id"]);

			if (methods.checkTop(position)) {
				methods.move (position, -84, 0, -4)
			};

			if (methods.checkBottom(position)) {
				methods.move (position, 84, 0, 4)
			};

			if (methods.checkLeft(position)) {
				methods.move (position, 0, -84, -1)
			};

			if (methods.checkRight(position)) {
				methods.move (position, 0, 84, 1)
			};

		});

	var methods = {

		createArray : function(func){
			methods.booleanArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true];
			func();
		},

		checkTop : function(position){
			var newPosition = parseFloat(position) - 4;
			if (newPosition > 0) {
				return methods.booleanArray[newPosition];
			}else{
				 return false;
			}
  		},

  		checkBottom : function(position){
			var newPosition = parseFloat(position) + 4;

			if (newPosition <= 16) {
				return methods.booleanArray[newPosition];
			}else{
				 return false;
			};

  		},

  		checkLeft : function(position){
			var newPosition = parseFloat(position) - 1;
			if ( (newPosition != 0) && (newPosition != 4) && (newPosition != 8) && (newPosition != 12) ) {
				return methods.booleanArray[newPosition];
			}else{
				 return false;
			};

  		},

  		checkRight : function(position){
  			var newPosition = parseFloat(position) + 1;

			if ( (newPosition != 5) && (newPosition != 9) && (newPosition != 13) && (newPosition != 17) ) {
				return methods.booleanArray[newPosition];
			}else{
				 return false;
			};

  		},
  		check_place : function(){
  			var block;
  			for (var j = 1; j <= 16; ++j) {
				block = $("#"+j);
				block_text = block.text();
				if (block_text == j) {
					block.removeClass("no_in_place");
				}else{
					block.addClass("no_in_place");
  				};
  			};

  		},

  		check_win: function(){
  			for (var k = 1; k <= 15; k++) {
  				if ($("#"+k).html() != k) {
  					win = false;
  					break;
				}
  			}
  			methods.win(win);
  			win = true;
  		},
  		win: function(win){
  			if (win) {
	  			timeCounter.stopCounter();
				$(".curtain").fadeIn();
				$("#stroke-result").text(currentStroke);
				$("#time-result").text(currentTime);
				$(".button").attr('disabled', true);
				$("#win-pop-up").show();
			};
  		},

  		move:  function(position, move_top, move_left, moveInArray){
			var obj = $("#"+position);

			var top = obj.offset().top
			var left = obj.offset().left
 			var newLocation = {};
 			newLocation.top = top + move_top;
 			newLocation.left = left + move_left;
 			obj.offset(newLocation);

 			methods.booleanArray[position] = true;
 			methods.booleanArray[position + moveInArray] = false;

 			obj.attr("id",( position + moveInArray));

			methods.check_place();

			strokeCounter.countMove();

			methods.check_win();
  		},

  		mix: function(){

			for (var i = 1; i <= 20; ++i) {
				win = false;
					
				var random_direction = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
				var empty_cell = 0;
				for (var j = 1; j <= 16; ++j) {
					if (methods.booleanArray[j] == true){
						empty_cell = j;
					}
				}
					
				switch(random_direction){
					case 1:
						$("#"+(empty_cell+1)).trigger("click");
						break;
					case 2:
						$("#"+(empty_cell-1)).trigger("click");
						break;
					case 3:
						$("#"+(empty_cell+4)).trigger("click");
						break;
					case 4:
						$("#"+(empty_cell-4)).trigger("click");
						break;
					default:
						break;
				};
				win = true;

			};
			strokeCounter.resetCounter();
  		}

	};

	var	strokeCounter = {

		countMove : function(){
			++currentStroke;
			$("#stroke-counter span").text(currentStroke + " stroke");
		},
		resetCounter : function(){
			currentStroke = 0;
			$("#stroke-counter span").text("0 stroke");
		}

	};

	var timeCounter = {

		startCounter : function(){
			timer = setInterval( function(){
				++currentTime;

				if (currentTime < 60) {
					var formatingCurrentTime = currentTime + " sec";
				}else if( 60 <= currentTime && currentTime < 3600){
					var mm = Math.floor(currentTime / 60);
					var ss = Math.floor(currentTime % 60);
					formatingCurrentTime = mm + " min " + ss + " sec";
				}else{
					var hh = Math.floor(currentTime / 3600);
					mm = Math.floor((currentTime % 3600) / 60);
					ss = Math.floor((currentTime % 3600) % 60);
					formatingCurrentTime = hh + "h " + mm + " m " + ss + " s";
				};
				$("#time-counter").text(formatingCurrentTime);
			}, 1000);
		},
		resetCounter : function(){
			currentTime = 0;
			$("#time-counter").text("0 sec");
		},
		stopCounter : function(){
			clearInterval(timer);
		}

	};
	
 });
