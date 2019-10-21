$(function(){

  function buildHTML(user){
   let html1 = `<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${user.name}</p>
               <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
               </div>`
               return html1;
  }

   let html2 = `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>`

  function add_user(add_user_id, add_user_name){
    var html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${add_user_id}'>  
                <p class='chat-group-user__name'>${add_user_name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
   $('.chat-group-form__field--right__add-users').append(html);
  }


  $("#user-search-field.chat-group-form__input").on("keyup", function(){
    let input = $("#user-search-field.chat-group-form__input").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users){
      $("#user-search-result").empty();
      if ( users.length !== 0){
        users.forEach(function(user){
          let html3 = buildHTML(user);
          $('#user-search-result').append(html3);
        });
      }
      else {
        $('#user-search-result').append(html2);
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).on("click", ".user-search-add",function(){
    let add_user_id   = $(this).attr('data-user-id');
    let add_user_name = $(this).attr('data-user-name');
    $(this).parent().remove();
    add_user(add_user_id, add_user_name);
  })

  $(document).on("click", ".user-search-remove",function(){
    $(this).parent().remove();
  })

})