$(document).ready(function(){

  $('#undock').click(function(){
    $('#igallery').animate({ height: "+="+60 }, 400 );
  });

  $('#dock').click(function(){
    $('#igallery').animate({ height: "-="+60 }, 400 );
  });

  var $i= -1;
  var thumb_frame = $('.thumb_frame');
  thumb_frame.css({'left':(800 - thumb_frame.innerWidth())/2 });

  /**
   * step
   * init width of thumb_frame 
   * init next img pointer position
   * init prev img pointer position
   * init dock/undock img pointer position
   *
   */
  var width = 800;
  var igallery = $('#igallery');

  var ig_thumb_frame = $('.thumb_frame');
  var thumb_img_items = ig_thumb_frame.find('img').length;
  var ig_thumb_frame_width = thumb_img_items*50+thumb_img_items*10;
  ig_thumb_frame.css({'width': ig_thumb_frame_width});

  var ig_next = igallery.find('#next');
  ig_next.css({'left': ig_thumb_frame_width + ig_thumb_frame.position().left });

  var ig_prev = igallery.find('#prev');
  ig_prev.css({'left': ig_thumb_frame.position().left-30 });


  igallery.find('.undock').click(undock);
  igallery.find('.dock').click(dock);

  function dock() {
    igallery.find('.dock,.undock').unbind('click');
    $('#igallery').animate({ height: "-="+60 }, 400 );
    $(this).removeClass('dock')
      .addClass('undock')
      .click(undock)
      .attr('src','images/undock.png')
      .attr('title','Undock into separate');
  }

  function undock(){
    igallery.find('.dock,.undock').unbind('click');
    $('#igallery').animate({ height: "+="+60 }, 400 );
    $(this).removeClass('undock')
      .addClass('dock')
      .click(dock)
      .attr('src','images/dock.png')
      .attr('title','Dock into gallery');
  }


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
