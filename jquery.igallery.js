(function($){	  
  $.fn.igallery = function(options){
    var opts = $.extend($.fn.igallery.defaults,options);
    
    /*Define gallery objects for reuse */
    var igallery;
    var id,img_path;
    var iterator = -1;
    var igallery_identfiy_code , transition_identify;
    var tf,tf_imgs,tf_width;
    var photo1,photo2,undock,overlay,next,prev,overlay_tips;


    function showPrevItem() {
      $(document).stopTime(transition_identify);
      showItem(--iterator);
      $(document).everyTime(opts.interval,transition_identify,function(){
        showNextItem();
      });
    }

    function showNextItem() {
      $(document).stopTime(transition_identify);
      showItem(++iterator);
      $(document).everyTime(opts.interval,transition_identify,function(){
        showNextItem();
      });
    }



    function showItem(j) {
      if( j >= tf_imgs.length ) {
        iterator = j = 0;
      }else if( j < 0 ){
        iterator = j = tf_imgs.length -1;
      }
      var tf_img = $(tf_imgs[j]);
      igallery.find( '.cp'+igallery_identfiy_code)
              .animate( {'top': "+="+10}, opts.speed)
              .removeClass('cp'+igallery_identfiy_code);
      tf_img
      .animate( {'top': "-="+10}, opts.speed)
      .addClass('cp'+igallery_identfiy_code);

      if( opts.overlay_tips ) {
        overlay_tips
          .text( tf_img.attr('title') );
      }


      if( photo2.attr('src') != undefined ) {
        photo1
          .stop(true,true)
          .attr('src', photo2.attr('src'))
          .css({'display':'block','z-index':1001}).fadeOut(opts.speed);
      }
      photo2
        .css({'display':'none','z-index':1000, 'width':opts.gallery_width, 'height':opts.gallery_height})
        .stop(true,true)
        .attr('src', tf_img.attr('source_src')).fadeIn(opts.speed);
    }

    function dockCL() {
      undock.unbind('click');
      igallery.animate({ height: "-="+overlay.height() }, opts.speed );
      $(this).removeClass('dock'+igallery_identfiy_code)
        .addClass('undock'+igallery_identfiy_code)
        .click(undockCL)
        .attr('src',img_path+'undock.png')
        .attr('title','Undock into separate');
    }

    function undockCL(){
      undock.unbind('click');
      igallery.animate({ height: "+="+overlay.height() }, opts.speed );
      $(this).removeClass('undock'+igallery_identfiy_code)
        .addClass('dock'+igallery_identfiy_code)
        .click(dockCL)
        .attr('src',img_path+'dock.png')
        .attr('title','Dock into gallery');
    }



    function css_igallery(){
      igallery.css({
        'width'     : opts.gallery_width,
        'height'    : opts.gallery_height,
        'border'    : opts.gallery_border,
        'background': opts.gallery_bg,
        'position'  : opts.gallery_position
//        'margin'    : opts.gallery_margin
      });
    };

    function build_overlay() {
      overlay = $('<div/>')
        .attr('id', 'overlay'+igallery_identfiy_code)
        .css({
            'opacity': '0.5', 'background':'#000',
            'position': 'absolute', 'bottom': '0',
            'height':  tf.height()+14,
            'z-index': '1002',
            'width': '100%' })
        .prependTo(igallery);
    };

    function build_controller() {
      next = $('<img />')
        .attr('id','next'+igallery_identfiy_code)
        .attr('src', img_path+'next.png')
        .css({
            'position':'absolute',
            'cursor': 'pointer',
            'z-index':  '100000',
            'vertical-align':'middle',
            'left':tf_width + tf.position().left
            })
      .prependTo(igallery);

      prev = $('<img />')
        .attr('id','prev'+igallery_identfiy_code)
        .attr('src', img_path+'prev.png')
        .css({
            'position':'absolute',
            'cursor': 'pointer',
            'z-index':  '100000',
            'vertical-align': 'bottom',
            'left':tf.position().left-30
            })
      .prependTo(igallery);

      next.css({ 'bottom': (overlay.height()-22)/2});
      prev.css({ 'bottom': (overlay.height()-22)/2 });
      next.click(showNextItem);
      prev.click(showPrevItem);

      undock = $('<img />')
        .attr('src', img_path+'undock.png')
        .addClass('undock'+igallery_identfiy_code)
        .css({ 'z-index': 100000, 'position': 'absolute', 'cursor': 'pointer', 'bottom': '15px','right': '5px' })
        .attr('title',"Undock into separate")
        .prependTo(igallery);
      undock.css({ 'bottom': (overlay.height()-22)/2 });
      undock.click(undockCL);

    };

    function build_dis_photo() {
      photo1 = $('<img />')
        .attr({ 'src' : $(tf_imgs[0]).attr('source_src'), 'id': 'photo1'+igallery_identfiy_code})
        .addClass(igallery_identfiy_code)
        .prependTo(igallery);
      
      photo2 = $('<img />')
        .attr({ 'src' : $(tf_imgs[0]).attr('source_src'), 'id': 'photo2'+igallery_identfiy_code})
        .addClass(igallery_identfiy_code)
        .prependTo(igallery);

      $(photo1).css({ 'position': 'absolute', 'top': '0','left':'0', 'width':opts.gallery_width, 'height':opts.gallery_height });
      $(photo2).css({ 'position': 'absolute', 'top': '0','left':'0', 'width':opts.gallery_width, 'height':opts.gallery_height });
    }
    /************************************************/
    /* Main plugin code         */
    /* set gallery prototype */
    /************************************************/
 	  return this.each(function() {

      igallery = $(this);
      tf = igallery.find('.thumb_frame');
      tf_imgs = tf.find('img');
      id = igallery.attr('id');
      igallery_identfiy_code = id+''+ (Math.random()+'').replace('.','');
      transition_identify = 'transition' + igallery_identfiy_code;
      
      css_igallery();
      tf_width = tf_imgs.length*opts.thumb_width +tf_imgs.length*10;
      tf.css({'width': tf_width, 
        'z-index': '1003',
        'position': 'absolute',
        'left'  : (opts.gallery_width-tf_width)/2
      });

      build_overlay();

      tf.css({'bottom': (overlay.height() - tf.height())/2});

      //Determine path between current page and filmstrip images
			//Scan script tags and look for path to IGallery plugin
      $('script').each(function(i){
				var s = $(this);
				if(s.attr('src') && s.attr('src').match(/jquery\.igallery/)){
					img_path = s.attr('src').split('jquery.igallery')[0]+'themes/'+opts.theme+'/';	
				}
			});

      build_controller();
      build_dis_photo();

      if( opts.overlay_tips ) {
        overlay_tips = $('<div/>')
                      .attr('id','overlay_tips'+igallery_identfiy_code)
                      .css({
                          'opacity': '0.5', 'background':'#000',
                          'position': 'absolute', 'top': 10, 'right': 10,
                          'z-index': '1002',
                          'padding': 5,
                          'color' : '#fff'
                          })
                      .prependTo(igallery);
      }

      tf_imgs.click(function(){
        $(document).stopTime(transition_identify);
        var i;
        for( i=0; i< tf_imgs.length; i ++ ){
          if( $(tf_imgs[i]).attr('src') == $(this).attr('src') ){
            break;
          }
        }
        iterator = i;
        showItem(iterator);
        $(document).everyTime(opts.interval,transition_identify,function(){
          showNextItem();
        });
      });

      showNextItem()
    });/* END Main plugin code */

  };


 

  /************************************************/
  /* igallery deafult settings        */
  /* overwrite by igallery function   */
  /************************************************/
  $.fn.igallery.defaults = {
    'gallery_width'   :800,
    'gallery_height'  :300,
    'gallery_border'  :'5px solid #131313',
    'gallery_bg'      :'url(images/div4.jpg) repeat 0 0',
    'gallery_position':'relative',
    'theme'           :'light',
    'overlay_tips'    : false,
    'overlay'         : false,
    'thumb_width'     :50,
    'thumb_height'    :50,
    'speed'           :400,
    'interval'        :1000,
    'z-index'	        :10000
  };
 })(jQuery);
