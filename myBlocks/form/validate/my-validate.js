//проверка input type=EMAIL при смене фокуса
const validateEmail = () => {
  const emailJs = qAll('.email-js');
  for (const input of emailJs) {
    input.addEventListener('focusout', function () {
      let validate = String(input.value)
        .toLowerCase()
        .match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (validate) {
        formRemoveError(input);
      } else {
        formAddError(input);
      }
    });

  }
}

if (qAll('.email-js')) {
  validateEmail();
}

//проверка всей формы
if (qAll('.form-js')) {
  let forms = qAll('.form-js');
  for (let form of forms) {
    form.addEventListener('submit', formSend);

    // проверка и отправка
    async function formSend(e) {
      e.preventDefault();
      let error = fromValidate(form);
      let formData = new FormData(form);
      formData.append('image', img.files[0]);

      if (error == 0) {
        let response = await fetch('sendmail.php', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          form.classList.add('form--sending');
          let result = await response.json();
          alert(result.message);
          formPreview = '';
          form.reset();
          form.classList.remove('form--sending');
        } else {
          alert('ошибка');
          form.classList.remove('form--sending');
        }
      } else {
        alert('не все поля заолнены правильно');
      }
    }

    //проверка всей формы
    function fromValidate(form) {
      let error = 0;
      let formReq = qAll('[required]');
      let input1 = '';

      for (let input of formReq) {

        formRemoveError(input);

        if (input.getAttribute('type') == 'email') {
          let validate = String(input.value)
            .toLowerCase()
            .match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          if (validate) {
            formRemoveError(input);
          } else {
            formAddError(input);
            error++;
          }
        } else if (input.getAttribute('type') == 'checkbox' && input.checked == false) {
          formAddError(input);
          error;
        } else if (input.getAttribute('type') == 'password') {
          if (input1 == '') {
            input1 = input;
          } else if (input1.value !== input.value) {
            formAddError(input);
            formAddError(input1);
            error;
          }
        }
        else {
          if (input.value == '') {
            formAddError(input);
            error++;
          }
        }
      }
    }

  }

  //проферка файла картинки на размер и расширение:
  if (qAll('.file-js')) {
    let fileJs = qAll('.file-js');
    for (let img of fileJs) {
      img.addEventListener('change', () => {
        uploadFile(img.files[0]);
      });

      function uploadFile(file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
          alert('разрешены только изображения');
          file.value = '';
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          alert('файл не должен превышать 2Мб');
          return;
        }
        console.log(file);
        // превью картинки
        const formPreview = img.closest('.form__file-box').querySelector('.form__preview');
        let reader = new FileReader();
        reader.onload = function (e) {
          formPreview.innerHTML = `<img src="${e.target.result}" alt="превью фото">`
        }
        reader.onerror = function (e) {
          alert('ошибка');
        }
        reader.readAsDataURL(file);
      }

    }
  }
}

//проверка пароля на совпадение в двух полях
function CheckPassword(inputtxt) {
  var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (inputtxt.value.match(decimal)) {
    return true;
  }
  else {
    alert('Пароль должен содержать от 8 до 15 символов, которые содержат как минимум одну строчную букву, одну заглавную букву, одну цифровую цифру и один специальный символ');
    return false;
  }
}

function CheckPassword1(inputtxt) {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (inputtxt.value.match(passw)) {
    return true;
  }
  else {
    alert('пароль должен быть от 6 до 20 символов, которые содержат как минимум одну цифровую цифру , одну заглавную и одну строчную букву');
    return false;
  }
}

// добавление ошибки элементам формы
function formAddError(input) {
  input.parentElement.classList.add('--error');
  input.classList.add('--error');
}

function formRemoveError(input) {
  input.parentElement.classList.remove('--error');
  input.classList.remove('--error');
}