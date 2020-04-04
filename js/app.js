'use strict';

var keywords = [];
var allHorns = [];
let templateId = '#photo-template';
const fileName1 = 'data/page-1.json';
const fileName2 = 'data/page-2.json';
var fileNameUsed = '';

console.log('ready to rock');

function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;

  // for (let key in horn) {
  //   this[key] = horn[key];
  // }
}

// Horn.prototype.render = function (container) {
//   let $container = $(container);
//   let $template = $('#photo-template');
//   let $horn = $template.clone();
//   $horn.removeAttr('id');
//   $horn.addClass('myHorns');
//   $horn.find('.horn-title').text(this.title);
//   $horn.find('.horn-img').attr('src', this.image_url);
//   $horn.find('.horn-description').text(this.description);
//   $container.append($horn);
//   dropDownRender(this);
// };

Horn.prototype.toHtml = function () {
  let template = $(templateId).html();
  let html = Mustache.render(template, this);

  return html;
}


function dropDownRender(object) {
  let $select = $('.dropDown');
  let $optionTemp = $('.optionTemplate');
  let $option = $optionTemp.clone();
  $option.removeClass('optionTemplate');
  $option.text(object.keyword);
  if (!keywords.includes(object.keyword)) {
    // console.log($option);
    keywords.push(object.keyword);
    $select.append($option);
  }

  /*------------------------------------------------------
   $createOptions.val(image.keyword)
  -----------------------------------------------------*/
}
// function dropDownRender2() {
//   console.log('rendered drop down menu');
//   keywords.forEach(element => {
//     $('.dropDown').append(element);
//   });
// }
// dropDownRender2();
$(document).ready(function () {
  $('.dropDown').change(function () {
    let selectedKeyword = $(this).children('option:selected').text();
    console.log(selectedKeyword);
    let $oldHorns = $('.myHorns');
    
    if (selectedKeyword !== 'Filter by Keyword') {
      $oldHorns.remove();
    allHorns.forEach(element => {
      if (element.keyword === selectedKeyword) {
        $('main').append(element.toHtml());
      }
    });
  }
  });
});

$(document).ready(function () {
  $('.dropDownSort').change(function () {
    let selectedSort = $(this).children('option:selected').val();
    console.log(selectedSort);
    sortHorns(selectedSort);
  });
});

function sortHorns(sortType) {
  $('main').empty();
  if (sortType === 'numberHorns') {
  allHorns.sort((a, b) => {
    return a.horns - b.horns;
  });
} else if (sortType === 'title') {
  allHorns.sort((a,b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    } else {
      return 0;
    } 
  } )
}
  renderHorns(allHorns);
}



const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

console.log('about to AJAX', ajaxSettings);

function summonHorns(filename) {
  console.log('we have summoned the horns');
  fileNameUsed = filename;
  allHorns = [];
  keywords = [];
  $('.dropDown').find('option:not(:first-child)').remove();
  $.ajax(filename, ajaxSettings)
    .then(function (data) {

      data.forEach(horn => {
        let actualHorn = new Horn(horn);
        allHorns.push(actualHorn);
      });
      // console.log(allHorns);

      // allHorns.forEach(ourNewHorns => {
      //   $('main').append(ourNewHorns.toHtml());
      // });
      renderHorns(allHorns);
      allHorns.forEach(element => {
        // console.log(element);
        dropDownRender(element);
      })
    });

}
summonHorns(fileName1);

function renderHorns(arr) {
  arr.forEach(ourNewHorns => {
    $('main').append(ourNewHorns.toHtml());
  });

}
//toggle
$(function () {
  $('.toggle').on('click', function (event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $('main').empty();
    console.log(fileNameUsed);
    if (fileNameUsed === fileName1) {
      summonHorns(fileName2);
      console.log(fileNameUsed);

    } else if (fileNameUsed === fileName2) {
      summonHorns(fileName1);
    }

  });
});
