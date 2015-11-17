(function($) {
   $(document).ready(function() {
     $(document).on("click", '.portletNavigationTree a', function(event) {
        event.preventDefault();
        link = $(this).attr('href');
        tipo = $(this).attr('class').split(' ');
        tipo = tipo[tipo.length-1]
        levelClass = $(this).parent().parent().attr('class').split(' ');
        level = levelClass[levelClass.length-1]
        $.ajax({
          type: 'GET',
          url: link,
          dataType: 'html',

          beforeSend: function( xhr ) {
            xhr.overrideMimeType( "text/plain; charset=utf8" );
          }
       })
        .done(function( data ) {
            $('#portal-columns').html($(data).find('#portal-columns'));
            if($('.navTreeLevel2')[0]) {
              $('body').removeClass('secao-duas-colunas').addClass('secao-tres-colunas');
            } else {
              $('body').removeClass('secao-tres-colunas').addClass('secao-duas-colunas');
            }
        });

     })

    })
})(jQuery);