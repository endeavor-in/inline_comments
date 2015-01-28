(function ($) {
  comment_form_visible = false;
  Drupal.behaviors.inlineComment = {
    attach: function (context) {
      $('.node .content').wrap('<div id="node_wrapper"></div>');
      Drupal.inline_comment();
      urlPattern = /system\/ajax/;
      //Attach a function to be executed whenever an Ajax request completes successfully
      $(document).ajaxSuccess(function(e,xhr,settings) {
        if (settings.url.match(urlPattern)) {
          $('#floating, .comment-add').css('display','none');
          comment_form_visible = false;
          Drupal.inline_comment();
          $('.node .content').parents('div:first').attr('id','node_wrapper');
         // $('#node_wrapper').parents('div:first').unwrap();
          //$('div').children('#node_wrapper').unwrap();
          $('.contextual-links-region h2').children().remove();
          $('[name="text_selection_id"],[name="comment_title"],[name="comment_description"],[name="field_name"]').val('');
        }
      });
    }
  }
  Drupal.inline_comment = function(context) {
    var allow_inline_comment = Drupal.settings.inline_comment.allow_inline_comment;
    var allow_comment = Drupal.settings.inline_comment.allow_comment;
    //when select some text, openup form and set some hidden field values
    if(allow_inline_comment == 1 && allow_comment == 2) {
      $('#content .field-item').click(function(e){
        //$('#add-inline-comment-image').empty();
        if(!(comment_form_visible)) { 
          //get field name from parent div
          var ancestor = $(this).parents('.field:first');
          var ancestorClasses = $(ancestor).attr('class');
          var fieldnameClass = ancestorClasses.match(/field-name-[^\s]+/);
          fieldnameClass = fieldnameClass[0];
          var fieldName = fieldnameClass.replace('field-name-','');
          fieldName = fieldName.replace(/-/g,'_');
          var test = $(this).text().length;
          if(window.getSelection() != '') {
            //get selected text range value
            var textRange = window.getSelection().getRangeAt(0);
            //get length of selected text
            var selectedTextLength = textRange.toString().length;
            //get current element
            var delta = $(this).index();
            //check if selected text is string or null value
            if (textRange.toString()) {
              //set hidden fields field_name,selected_text and delta value
              $('[name  = field_name]').val(fieldName);
              $('[name  = selected_text]').val(textRange);
              $('[name  = delta]').val(delta);
              var coords = Drupal.getSelectionCoordinates(false);
              //Insert node after selected text for getting the start postion
              newNode = document.createElement("p");
              newNode.className = "hotspot";
              newNode.appendChild(document.createTextNode("Hotspot"));
              textRange.insertNode(newNode);
              //get start postion count  of selected text from the whole content
              var startPos = $(this).html().indexOf('<p class="hotspot">Hotspot</p>') - selectedTextLength;
              //set hidden form fields of start_position,text_length
              $('[name  = start_position]').val(startPos);
              $('[name  = text_length]').val(selectedTextLength);
              //remove the inserted node
              $('.hotspot').remove();
              //Get vertical scroll position
              var scrollTop = $(window).scrollTop();
              //assign left and top postion for add image
              var left = coords.x - 10;
              var top = coords.y + scrollTop - 25;
              // Remove image for old selection if not use for comment
              $('#add-inline-comment-image').empty();
              //Append add image at nearby selected text              
              $('#page-wrapper').after("<div id='add-inline-comment-image' class='add-inline-comment-image'><img title='Add a comment for selected text' src='../sites/all/modules/inline_comments/comment_add.png' style='position:absolute; left:" + left + "px; top:" + top + "px'/></div>");
           
              //Click handler on add image for showing form
              $('#add-inline-comment-image').click(function(e) {
                var newcss = scrollTop + 100;
                $('[name  = text_selection_id]').val('');
                $('#floating').css({'display':'block','position':'absolute','left':'40%','top':newcss + 'px','background-color':'#ffffff','padding':'10px','border':'1px solid','z-index':'2'});
                $(this).remove();
                comment_form_visible = true;
              });
            }
          }
        }
      });
    }
    //when hover on selected text, get selected text id for new inline comment
    $('.inline-comment').hover(function(){
      if(!(comment_form_visible)) {
        var selectedId = $(this).attr('id');
        var textSelectionid = selectedId.match(/\d+/);
        var relValue = $(this).attr('rel');
        //when click on new a post comment, openup the inline comment form and close the cluetip popup
        $(relValue + ' #new_inline_comment').click(function(e){
          //Get vertical scroll position
          var scrollTop = $(window).scrollTop();
          var newcss = scrollTop + 100;
          //set hidden field text_selection_id value
          $('[name  = text_selection_id]').val(textSelectionid);
          $('#floating').css({'display':'block','position':'absolute','left':'40%','top':newcss,'background-color':'#ffffff','padding':'10px','border':'1px solid','z-index':'2'});
          $('#cluetip').css({'display':'none'});
          comment_form_visible = true;
        });
      }
    });
    //create cluetip with options
    $('.inline-comment').cluetip({
      width:250,
      sticky:true,
      closeText:'',
      closePosition: 'title',
      local:true,
      mouseOutClose: 'both',
      topOffset: 0,
      leftOffset: 0,
      showTitle: false
    });
    //close inline comment form and empty the field values
    $('.close').click(function() {
      $('#floating').css('display','none');
      $('[name="text_selection_id"],[name="comment_description"],[name="comment_title"],[name="field_name"],[name="selected_text"],[name="delta"]').val('');
      comment_form_visible = false;
    });
  }
  Drupal.getSelectionCoordinates = function(start) {
    var x = 0, y = 0, range;
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(sel.rangeCount - 1);
        range.collapse(start);
        var dummy = document.createElement("span");
        range.insertNode(dummy);
        var rect = dummy.getBoundingClientRect();
        x = rect.left;
        y = rect.top;
        dummy.parentNode.removeChild(dummy);
      }
    }
    return {x: x, y: y};
  }
}(jQuery));
