	$(document).ready(function(){
		points = 0, harder_ = 0, lives_ = 3, drinked_1 = 0, drinked_2 = 0, drinked_3 = 0, drinked_4 = 0;
		player__ = 'egor';
		if($('.misha-selected').length==1)
				player__ = 'misha';

		function collision($div1, $div2) {
		    var x1 = $div1.offset().left;
		    var y1 = $div1.offset().top;
		    var x2 = $div2.offset().left;
		    var y2 = $div2.offset().top;
		    if ((y1 + $div1.outerHeight(true)) < y2 ||
		        y1 > (y2 + $div2.outerHeight(true)) ||
		        (x1 + $div1.outerWidth(true)) < x2  ||
		        x1 > (x2 + $div2.outerWidth(true)))
		        return false;
		    return true;
		}
		function randomInteger(min, max) {
	    	var rand = min - 0.5 + Math.random() * (max - min + 1)
	    	rand = Math.round(rand);
	    	return rand;
	  	}

		$('.btn-play').click(function(){
			$('.row').append('<div class="rules"><h2> Правила простые:</h2><p>1. На предприятии не бухать (-100).</p><p>2. Можно пить gura cainarului (+50).</p><p>3. Пропускаешь провода или ленту 3 раза и тебе пизда от начальства.</p><p>4. Лента только для Мишы, провода только для Егора, за это тоже дают пизды и не платят.</p><p>5. Хочешь премию проси у начальства, он ускорит тебе конвеер.</p><a href="#" class="into-the-game">В игру</a></div>');

			$('.into-the-game').click(function(e){
				$('.rules').remove();
				init();
				e.preventDefault();
			});
		});

		function hero_init($offset, $follower)
		{
		    var mouseX = 0, mouseY = 0, limitX = 510-10; 

		    $(window).mousemove(function(e){
		        var offset = $offset.offset();
		        mouseX = Math.min(e.pageX - offset.left, limitX);
		        if (mouseX < 0) mouseX = 0;
			});
		 
		    var follower = $follower;
		    var xp = 0, yp = 0;
		    var loop = setInterval(function(){
		        xp += (mouseX - xp) / 20;
		        follower.css({left:xp});    
		    }, 10);
		}

		function init_one_bottle(){
			var val = randomInteger(2,57)*10;
			$('.top-game').append('<div class="bottle-" style="left:'+val+'px;top:0"></div>');
		}
		function init_tea(){
			var val = randomInteger(2,57)*10;
			$('.top-game').append('<div class="tea-" style="left:'+val+'px;top:0"></div>');
		}
		function init_provoda(){
			var val = randomInteger(2,57)*10;
			$('.top-game').append('<div class="provoda-" style="left:'+val+'px;top:0"></div>');
		}
		function init_lenta(){
			var val = randomInteger(2,57)*10;
			$('.top-game').append('<div class="lenta-" style="left:'+val+'px;top:0"></div>');
		}
		function move_down(){

			$('.bottle-').each(function(){
				var cur = $(this).offset();
				cur.top+=10;
				$(this).css('top', cur.top+'px');
				if(cur.top>418) $(this).remove();
			});
			$('.tea-').each(function(){
				var cur = $(this).offset();
				cur.top+=10;
				$(this).css('top', cur.top+'px');
				if(cur.top>418) 
				{
					$(this).remove();
				}
			});
			$('.provoda-').each(function(){
				var cur = $(this).offset();
				cur.top+=10;
				$(this).css('top', cur.top+'px');
				if(cur.top>418) {
					$(this).remove();
					if(player__=='egor')
					{	
						lives_--;
						$('.live-count').text(lives_);
					}	
				}
			});
			$('.lenta-').each(function(){
				var cur = $(this).offset();
				cur.top+=10;
				$(this).css('top', cur.top+'px');
				if(cur.top>418) {
					$(this).remove();
					if(player__=='misha')
					{	
						lives_--;
						$('.live-count').text(lives_);
					}	
				}
			});

			{

			}
			setTimeout(move_down,500);
		}

		function game_over(){
			if(lives_<=0){
				$('.row').text('');
				$('.row').append('<div class="result"><h2 class="game-over-1 game-font-class"> Pe o smena: '+points+' de lei.</h2><div class="center-bottles"> <div class="bottle"></div>x'+drinked_1*2+' <div class="tea"></div>x'+drinked_2*2+' <div class="provoda"></div>x'+drinked_3*2+' <div class="lenta"></div>x'+drinked_4*2+'</div> <br><small class="game-over-2"> Te rog premia: '+harder_+'</small><a class=" game-over-3" href="">Попробовать еще раз</a></div>');
			}else setTimeout(game_over,500);
		}

		function check(){
			$('.bottle-').each(function(){
				if(collision($(this),$('.draksel-boy')))
				{
					points-=100;
					drinked_1+=0.5;
					$('.score').text(points);
					$(this).remove();
				}
			});

			$('.tea-').each(function(){
				if(collision($(this),$('.draksel-boy'))){
					points+=50;
					drinked_2+=0.5;
					$('.score').text(points);
					$(this).remove();
				}
			});

			$('.provoda-').each(function(){
				if(collision($(this),$('.draksel-boy'))){
					if(player__=='misha')
					{
						lives_--;
						$('.live-count').text(lives_);
						points-=250;
					}
					points+=250;
					drinked_3+=0.5;
					$('.score').text(points);
					$(this).remove();
				}
			});

			$('.lenta-').each(function(){
				if(collision($(this),$('.draksel-boy'))){	
					if(player__=='egor')
					{
						lives_--;
						$('.live-count').text(lives_);
						points-=100;
					}
					points+=100;
					drinked_4+=0.5;
					$('.score').text(points);
					$(this).remove();
				}
			});
			setTimeout(check,500);

		}

		function bottles_init(){
			var ch = randomInteger(0,1000);
			if(ch<=500) 
				 player__=='egor'?init_provoda():init_lenta();
			else if(ch<=700) init_tea();
			else if(ch<=900) init_one_bottle();
			else player__=='egor'? init_lenta():init_provoda();
			setTimeout(bottles_init,1500);
		}

		function init()
		{			
			player__ = 'egor';
			if($('.misha-selected').length==1)
				player__ = 'misha';
			$('.act-menu').text('');
			$('.logo').remove();
			$('.top-head').append('<div class="logo"></div>');
			$('.logo').addClass('in-game-logo');
			$('.top-head').append('<div class="score1 game-font-class"></div>');
			$('.score1').append('<div class="score"></div> <div class="text-center">Lei</div>');
			$('.score').append(points);
			$('.game-inn').append('<div class="game-area"><div class="top-game"></div><div class="bottom-game"></div></div>');
			$('.top-head').append('<div class="lives game-font-class"></div>');
			$('.lives').append('Viata: <span class="live-count">'+lives_+'</div>');
			$('.top-head').append('<div class="new-game game-font-class">te rog<br>premia((</div>');
			$('.bottom-game').append('<div class="draksel-boy '+player__+'-player"></div>');
			hero_init($('.bottom-game'),$(".draksel-boy"));
			bottles_init();	
			move_down();
			check();
			game_over();
			$('.new-game').click(function(){
				harder();
			});

		}

		function harder(){
			harder_++;
			$('.game-inn').text('');
			$('.top-head').text('');
			$('.act-menu').text('');
			init();
		}


		$('iframe:last').remove();
		$('div:last').remove();
	});
