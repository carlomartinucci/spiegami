//= require jquery3
//= require jquery_ujs
//= require popper
//= require bootstrap-sprockets

$(document).on('click', '.inner-block.with-referenced-blocks .card', function(e) {
  target = $(e.target);
  $.ajax({
    url: '/blocks/' + target.closest('[data-block-id]').attr('data-block-id') + '/referenced_blocks'
  })
});