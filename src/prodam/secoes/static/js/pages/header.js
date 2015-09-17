
require([ 'jquery', 'backbone', 'views/secretarias', 'views/subprefeitura', 'views/orgaos'],
  function($, Backbone, SecretariaView, SubprefeituraView, OrgaosView) {
    $(function() {
      var secretarias = new SecretariaView({
        el : '.lista-secretarias'
      });

      var subprefeituras = new SubprefeituraView({
        el : '.lista-subprefeituras'
      });

      var orgaos = new OrgaosView({
        el : '.lista-orgaos'
      });

      $('#global_search').click(function(){
        if($('#buscaGeral').val() != ""){
          $('#busca').submit();
        }
      });
    });
});
