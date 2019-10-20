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
      $('.form__message').val('');
      $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージか画像を入力してください');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  });

});