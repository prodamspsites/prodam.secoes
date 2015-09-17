define(function(require) {

  var $ = require('jquery'),
  Backbone = require('backbone'),
  headerAjax = require('ajax/header'),
  templateOrgaos = require('hbs!views/template/orgaos');

  return Backbone.View.extend({
    template : templateOrgaos,

    events : {
    },

    initialize : function() {
      this.buscarOrgaos();
    },

    render : function(orgaos) {
      this.$el.html(this.template({'orgaos' : orgaos}));
      return this;
    },

    buscarOrgaos : function() {
      var self = this;
      headerAjax.findOrgaos(function(retorno){
        self.render(retorno);
      });
    }
  });

});