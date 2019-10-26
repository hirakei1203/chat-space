$(function(){

  function buildHTML(message){
    let content = message.content ? `${message.content}` : ""
    let image = message.image ? `<img src= ${message.image}>` : ""
      let html = `<div class="chat-main__messages__message" data-id = ${message.id}>
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
                    </div>
                  </div>`
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

  
  let reloadMessages = function() {
    let last_message_id = $('.chat-main__messages__message:last').data("id")
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) { 
      let insertHTML ='';
        messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.chat-main__messages').append(insertHTML);
      });
     $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight});

    })
    .fail(function() {
    });
  };

  setInterval(reloadMessages, 5000);
});

