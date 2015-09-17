define(function(require) {

  var $ = require('jquery'),
  Base64 = require('base64'),
  Backbone = require('backbone'),
  _ = require('underscore'),
  secaoAjax = require('ajax/secao'),
  TemplateSecaoNivel = require('hbs!views/template/secao-nivel'),
  TemplateSecaoSub = require('hbs!views/template/secao-sub'),
  TemplateConteudo = require('hbs!views/template/conteudo');

  return Backbone.View.extend({

    templateNivel : TemplateSecaoNivel,
    templateSub   : TemplateSecaoSub,
    templateConteudo : TemplateConteudo,

    initialize : function(opts) {
      this.defineRoutes(opts.router);
    },

    defineRoutes: function(router) {
      var self = this;

      router.on('route:showSecao', function(idsBase64) {
        var firstAccess = self.ids ? false : true;

        if (firstAccess) {
          self.ids = Base64.decode(decodeURI(idsBase64)).split(',');

          var idsFirstAccess = Base64.decode(decodeURI(idsBase64)).split(',');

          if (!idsFirstAccess.length) return;
          self.renderSecaoNivel(idsFirstAccess);

        } else {
          self.idsOld = self.ids;
          self.ids = Base64.decode(decodeURI(idsBase64)).split(',');

          self.$el.find('.menu-content').remove();

          if (self.idsOld.length >= self.ids.length) {
            self.back = true;
            self.$el.find('.menu-sub').remove();
            self.renderSubSecoes(_.filter(self.ids, function(v, i) {
              return i > 0;
            }));
          } else {
            self.back = false;
            self.renderSubSecoes([self.ids[self.ids.length - 1]]);
          }
        }
      });
    },

    renderSecaoNivel: function(ids) {
      var self = this;
      var id = ids.shift();
      secaoAjax.findById(id, function(retorno){
        $('#secao-pai-nome').html(retorno.nome);
        $('#title-color-main').addClass('title-' + self.tirarAcentuacao(retorno.nome.toLowerCase()));
        $('.conteudo-menu-main').attr('id', self.tirarAcentuacao(retorno.nome.toLowerCase()) + '-menu-main');
      });

      secaoAjax.findItens(id, function(retorno) {
        for(var i in retorno) {
          retorno[i].hashLink = self.makeHashLink([id, retorno[i].id]);
        }
        $('.conteudo-menu-main').html(self.templateNivel({'secoes' : retorno}));
        self.renderSubSecoes(ids);
      });
    },

    renderSubSecoes: function(ids) {
      var self = this;

      if (ids.length) {
        var id = ids.shift();
        var isConteudo = self.$el.find('li[data-id-item-secao=' + id + ']').hasClass('CONTEUDO');

        if (isConteudo) {
          secaoAjax.findConteudo(id, function(conteudo){
            self.$el.find('#nav-sec-full').append(self.templateConteudo({'conteudo' : conteudo}));
            self.selecionarSecoes();
          });
        } else {
          secaoAjax.findItens(id, function(retorno) {
            if (self.idsOld && !self.back) {
              for(var i in retorno) {
                retorno[i].hashLink = self.makeHashLink(self.ids.concat([retorno[i].id]));
              }
            } else {
              var subIds = _.filter(self.ids, function(i, index) {
                return index <= self.ids.indexOf(id);
              });
              for(var i in retorno) {
                retorno[i].hashLink = self.makeHashLink(subIds.concat([retorno[i].id]));
              }
            }

            var qtdMenuSub = self.$el.find('.menu-sub').size();

            if (qtdMenuSub == 2 && self.ids.length > 3) {
                self.$el.find('li[data-id-item-secao=' + id + ']').addClass('no-hover').append(self.templateSub({'itens': retorno, 'sub': true}));
            } else if (qtdMenuSub == 1) {
                self.$el.find('#nav-sec-full').append(self.templateSub({'itens' : retorno}));
            } else if (qtdMenuSub == 0) {
                self.$el.find('#nav-sec-full').append(self.templateSub({'itens' : retorno}));
            } else if (qtdMenuSub == 2 && self.ids.length < 3) {
                self.$el.find('.menu-sub:last').remove();
                self.$el.find('#nav-sec-full').append(self.templateSub({'itens' : retorno}));
            }


            qtdMenuSub = self.$el.find('.menu-sub').size();
            if (qtdMenuSub > 1) {
              self.$el.find('.conteudo-menu-main').css({'width' : '62px', 'overflow' : 'hidden'});
              self.$el.find('.conteudo-menu-main span').css({'display' : 'none'});
            } else {
              self.$el.find('.conteudo-menu-main').css({'width' : '180px', 'overflow' : 'hidden'});
              self.$el.find('.conteudo-menu-main span').css({'display' : 'inline-block'});
            }
            self.renderSubSecoes(ids);
          });
        }

      } else {
        self.selecionarSecoes();
      }
    },

    selecionarSecoes: function() {
      var selector = [];

      this.$el.find('.selected').removeClass('selected');
      for(var i in this.ids) {
          selector.push('li[data-id-item-secao=' + this.ids[i] + ']');
      }
      this.$el.find(selector.join(',')).addClass('selected');
      this.primeiraImagem();
    },

    makeHashLink: function(ids) {
      return encodeURI(Base64.encode(ids.join(',')));
    },

    primeiraImagem : function(){
      var texto = $('.secao-nivel.selected').find('span').text();
      texto = texto.replace(/ /g, '_').replace(',', '');
      texto = this.tirarAcentuacao(texto);
      texto = texto.toLowerCase();
      $('#img-plano-fundo').attr('src', context + "/img/base-paginas/" + texto + ".jpg");
    },

    tirarAcentuacao : function(texto){
      com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ´`';
      sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC  ';
      nova='';
      for(var i = 0; i < texto.length; i++) {
        if (com_acento.search(texto.substr(i,1))>=0) {
          nova+=sem_acento.substr(com_acento.search(texto.substr(i,1)),1);
        }
        else {
          nova+=texto.substr(i,1);
        }
      }
      return nova;
    }
  });

});