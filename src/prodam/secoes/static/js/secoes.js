(function($) {
   $(document).ready(function() {
     $(document).on("click", '.portletNavigationTree a', function(event) {
        var tii = $(this).attr('class').split(' ');
        var regTipoLink = new RegExp('link');
        var classes = $(this).attr('class');

        //console.log(tii.toString());

        if(regTipoLink.test(tii)){
          //console.log("É link");
        }else {
          event.preventDefault();
          //console.log("NAO É LINK");
          link = $(this).attr('href');
          levelClass = $(this).parent().parent().attr('class').split(' ');
          level = levelClass[levelClass.length-1]
          
          window.history.pushState("","",$(this).attr('href'));
          

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
