(function($){	  
  $.fn.rmasker = function(){
    if( $.fn.imasker.defaults.masker.css('display') == 'block'){
      $.fn.imasker();
    }
  };
  
	$.fn.imasker = function(options){			  	  
    $height = document.body.scrollHeight == 0 ? $(window).height() : document.body.scrollHeight;
    $width = $(window).width();    
    
		if( $.fn.imasker.defaults.masker == null ) {			
			options = $.extend($.fn.imasker.defaults,options);
		 	$.fn.imasker.defaults.masker = $masker = $('<div></div>');
      $masker.attr('id', options.id);
		 	$masker.css({
		 		'position': options.position,
		 		'top'     : options.top,
		 		'left'    : options.left,
		 		'z-index' : options['z-index'],
		 		'background' : options.background,
		 		'opacity'    : options.opacity,
		 		'height': $height,	 		
		 		'width' : $width
		 	});		 	
		 	$('body').append($masker);
	 	}else{
	 		$.fn.imasker.defaults.masker.css({
		 		'height': $height,	 		
		 		'width' : $width,
        'display': 'block'
	 		});
	 	};	 	

    if(!$.fn.imasker.defaults.resizeHandler){
      $.fn.imasker.defaults.resizeHandler = true;
      $(window).resize(function(){
		    $.fn.rmasker();
      });
    };

	};
	
	$.fn.imasker_hide = function(){
		$masker = $.fn.imasker.defaults.masker;
		if(  $masker != null ){
			$.fn.imasker.defaults.masker.css({'display': 'none'}) ;
		}
	};
	
	$.fn.imasker_remove = function(){
		$masker = $.fn.imasker.defaults.masker;
		if(  $masker != null ){
			$masker.remove();			
			$.fn.imasker.defaults.masker = null;			
		}
	};
	
	$.fn.imasker.defaults = {
		'background' :'#000',
		'opacity'    :'0.5',
		'position'   :'absolute',
		'top'        :'0',
		'left'       :'0',
		'z-index'	   : null,
		'masker'     : null,
    'id'         : 'imasker',
    'resizeHandler': false
	};
})(jQuery);
