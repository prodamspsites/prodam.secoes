(function($) {
   $(document).ready(function() {
     $(document).on("click", '.portletNavigationTree a', function(event) {
        tipo = $(this).attr('class').split(' ');
        tipo = tipo[1];

        if (tipo != 'link') {

          event.preventDefault();
          link = $(this).attr('href');
          levelClass = $(this).parent().parent().attr('class').split(' ');
          level = levelClass[levelClass.length-1]
        
          console.log($(this).attr('href'));
          
          
          console.log(window.navigator.userAgent);
          var regChrome = new RegExp('Chrome');         
          var regFirefox = new RegExp('Firefox');
          
          //if(regChrome.test(window.navigator.userAgent) || regFirefox.test(window.navigator.userAgent)){
              window.history.pushState("","",$(this).attr('href'));
              document.title = $(this).find('span').contents().text();
          

          $.ajax({
            type: 'GET',
            url: link,
            dataType: 'html',

            beforeSend: function( xhr ) {
              xhr.overrideMimeType( "text/plain; charset=utf8" );
            }
         })
          .done(function( data ) {
              //$('#portal-columns').html($(data).find('#portal-columns'));
              $('#plone-content').html($(data).find('#portal-columns'));
              if($('.navTreeLevel2')[0]) {
                $('body').removeClass('secao-duas-colunas').addClass('secao-tres-colunas');
              } else {
                $('body').removeClass('secao-tres-colunas').addClass('secao-duas-colunas');
              }
          });
        }

     })

    })
})(jQuery);
