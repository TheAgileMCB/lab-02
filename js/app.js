'use strict';

const keywords = [];
const allHorns = [];
// const newHorns = [];
console.log('ready to rock');

function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  allHorns.push(this);
}

Horn.prototype.render = function (container) {
  let $container = $(container);
  let $template = $container.find('#photo-template');
  let $horn = $template.clone();
  $horn.removeAttr('ID');
  $horn.addClass('myHorns');
  $horn.find('.horn-title').text(this.title);
  $horn.find('.horn-img').attr('src', this.image_url);
  $horn.find('.horn-description').text(this.description);
  $container.append($horn);
  dropDownRender(this);
};

function dropDownRender(object) {
  let $select = $('.dropDown');
  let $optionTemp = $('.optionTemplate');
  let $option = $optionTemp.clone();
  $option.removeClass();
  $option.text(object.keyword);


  if (keywords.every(function (element) {
    return element !== object.keyword;
  }))
  {keywords.push(object.keyword);
    $select.append($option);
  }

}
$(document).ready(function () {
  $('.dropDown').change(function () {
    let selectedKeyword = $(this).children('option:selected').text();
    console.log(selectedKeyword);
    let $oldHorns = $('.myHorns');
    $oldHorns.remove();
    // newHorns = [];
    allHorns.forEach(element => {
      if (element.keyword === selectedKeyword) {
        element.render('main');
      }
    });


  });
});


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
