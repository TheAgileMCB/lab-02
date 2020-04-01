'use strict';
console.log('ready to rock');

function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.prototype.render = function (container) {
  let $container = $(container);
  let $template = $container.find('#photo-template');

  console.log('render');

  let $horn = $template.clone();
  $horn.removeAttr('ID');
  $horn.find('.horn-title').text(this.title);
  $horn.find('.horn-img').attr('src', this.image_url);
  $horn.find('.horn-description').text(this.description);
  $container.append($horn);
};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

console.log('about to AJAX', ajaxSettings);

$.ajax('data/page-1.json', ajaxSettings)
  .then(function (data) {
    console.log(data);

    data.forEach(horn => {
      let actualHorn = new Horn(horn);
      actualHorn.render('main');
    });


  });
