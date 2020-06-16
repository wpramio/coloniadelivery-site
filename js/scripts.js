window.onscroll = function() {toggleHideClass()};
function toggleHideClass() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    document.getElementById('botao-pedido-fixo').classList.remove('hide');
  } else {
    document.getElementById('botao-pedido-fixo').classList.add('hide');
  }
}
  
