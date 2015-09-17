define(function(require) {
  var $ = require('jquery');

  var HeaderAjax = {

    findSecretarias : function(callback){
      $.ajax({
        url         : context + '/header/secretarias',
        type        : 'GET',
        dataType    : 'json',a
        success     : callback
      });
    },

    findSubprefeituras : function(callback){
      $.ajax({
        url     : context + '/header/subprefeituras',
        type        : 'GET',
        dataType    : 'json',
        success     : callback
      });
    },

    findOrgaos : function(callback){
      $.ajax({
        url     : context + '/header/orgaos',
        type        : 'GET',
        dataType    : 'json',
        success     : callback
      });
    }
  };

  return HeaderAjax;
});