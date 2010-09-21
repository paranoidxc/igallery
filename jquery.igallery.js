$(document).ready(function(){
  $('#undock').click(function(){
    $('#igallery').animate({ height: "+="+60, }, 400 );
  });

  $('#dock').click(function(){
    $('#igallery').animate({ height: "-="+60, }, 400 );
  });

  var $i= -1;
  var thumb_frame = $('.thumb_frame');
  thumb_frame.css({'left':(800 - thumb_frame.innerWidth())/2 });

  function showItem($j) {
    var last_index  = $j-1;
    $('img.#next').unbind('click');
    $('img.#prev').unbind('click');
    //console.log("SHOW ITEM  === "+$j);
    if( $j >= $('.thumb_frame li img').length ) {
      $j=0;
      console.log(' > = ');
      last_index = $('.thumb_frame li img').length-1;
    }else if( $j < 0 ){
      $j = $('.thumb_frame li img').length -1;
      last_index = $('.thumb_frame li img').length;
    }
    
    $i=$j;
    $('.thumb_frame li.current_pointer')
      .animate( {'top': "+="+10}, 400)
      .removeClass('current_pointer');

//    $($('.thumb_frame li')[$j]).addClass('current_pointer');
//    $($('.thumb_frame li')[last_index]).animate( {'top': "+="+10}, 400);
    $($('.thumb_frame li')[$j])
      .animate( {'top': "-="+10}, 400)
      .addClass('current_pointer');
    
    if( $("#current_2").attr('src').length > 0 ) {
      $('#current_1').stop(true,true).attr('src', $('#current_2').attr('src')).css({'display':'block','z-index':1001}).fadeOut(400);
    }

    $('#current_2')
    .css({'display':'none','z-index':1000}).stop(true,true)
    .attr('src', $($('.thumb_frame li')[$j]).find('img').attr('source_src')).fadeIn(400);
    $('img.#next').click(showNextItem);
    $('img.#prev').click(showPrevItem);		
  }

  function showPrevItem() {
    $(document).stopTime("transition");
    showItem(--$i);
    $(document).everyTime(2000,"transition",function(){
      showNextItem();
    });
  }

  function showNextItem() {
    $(document).stopTime("transition");
    //console.log( $i );
    showItem(++$i);
    $(document).everyTime(2000,"transition",function(){
      showNextItem();
    });
  }

  showNextItem();

  $("#next").click(showNextItem);
  $("#prev").click(showPrevItem);

  $('.thumb_frame li').click(function(){
    $(document).stopTime("transition");
    showItem($(this).index());
    $(document).everyTime(2000,"transition",function(){
      showNextItem();
    });
  });

});
