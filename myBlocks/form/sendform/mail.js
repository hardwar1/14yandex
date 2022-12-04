if (qOne('.form')) {
  new window.JustValidate('.form', {
    rules: {
      tel: {
        required: true,
      }
    },
    messages: {
      name: {
        required: 'Введите имя',
        minLength: 'Минимуму 3 символа',
        maxLenght: 'Максимум 15 символов'
      },
      email: {
        required: 'Введите email',
        email: 'Введите корректный email'
      },
      tel: {
        required: 'Введите телефон',
      }
    },
    //отправка
    submitHandler: function (thisForm) {
      let formData = new FormData(thisForm);

      //отправка формы через xhr 
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      };

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
  
      thisForm.reset();
    }

  });
}