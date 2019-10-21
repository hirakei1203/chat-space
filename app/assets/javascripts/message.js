$(function(){

  function buildHTML(message){
    let image = message.image ? `<img src= ${message.image}>` : ""
    let html = `<div class="chat-main__messages__message">
                  <div class="chat-main__messages__message__upper-info">
                    <div class="chat-main__messages__message__upper-info__talker">
                    ${message.name}
                    </div>
                  <div class="chat-main__messages__message__upper-info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="chat-main__messages__message__text">
                  ${message.content}
                  ${image}
                </div>
                </div>`
                return html;
  }

  let reloadMessages = function() {
    last_message_id = params[:id].to_i
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };

  let buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
       `let html = <div class="message" data-id = ${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
            ${message.user_name}
           </div>
           <div class="upper-message__date">
            &{message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
            ${message.content}
           </p> 
           <img src=${message.image.url}, class="lower-message__image" >
         </div> 
       </div>`
    } else if (message.content) {
      `var html = <div class="message" data-id=${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
            ${message.user_name}
           </div>
           <div class="upper-message__date">
            ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
            ${message.content}
           </p>
         </div>
       </div>`
    } else if (message.image.url) {
      var html = `<div class="message" data-id=${message.id}>
         <div class="upper-message"> 
           <div class="upper-message__user-name">
            ${message.user_name} 
           </div>
           <div class="upper-message__date"> 
            ${message.created_at} 
           </div>
         </div>
         <div class="lower-message"> 
          <img src="${message.image.url}, "class="lower-message__image" >
        </div>
      </div>`
    };
    return html;
  };


  $('#form__switch').on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__messages').append(html);
      $('#form__switch')[0].reset();
      $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージか画像を入力してください');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  });

  var reloadMessages = function() {
    last_message_id = params[:id].to_i
    $.ajax({
      url: "group_messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      let insertHTML = 'buildMessageHTML';
      $('').append(insertHTML);
     


    })
    .fail(function() {
      console.log('error');
    });
  };


});