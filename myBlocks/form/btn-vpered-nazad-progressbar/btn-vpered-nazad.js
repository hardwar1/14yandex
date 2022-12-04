const
  formFieldset = qAll('.form__fieldset'),
  progressbarItem = qAll('.progressbar__item'),
  next = qAll('.next'),
  previous = qAll('.previous'),
  progressbar = qOne('.progressbar');

//клик по кнопке вперед
for (let i = 0; i < next.length; i++) {
  next[i].addEventListener('click', () => {
    formFieldset[i].classList.remove('form__fieldset--active');
    progressbar.style.setProperty('--progressbar-width', persent(i + 1, formFieldset));
    formFieldset[i + 1].classList.add('form__fieldset--active');
    progressbarItem[i + 1].classList.add('progressbar__item--active');

    progressbarItem[i + 1].classList.add('progressbar__item--text');
    progressbarItem[i].classList.remove('progressbar__item--text');
  });
}

//клик по кнопке назад
for (let i = 0; i < previous.length; i++) {
  previous[i].addEventListener('click', () => {
    formFieldset[i].classList.add('form__fieldset--active');
    progressbar.style.setProperty('--progressbar-width', persent(i, formFieldset));
    formFieldset[i + 1].classList.remove('form__fieldset--active');
    progressbarItem[i + 1].classList.remove('progressbar__item--active');
    progressbarItem[i + 1].classList.remove('progressbar__item--text');
    progressbarItem[i].classList.add('progressbar__item--text');
  });
}

// линия прогресса и функция вычисления %
const progress = () => {
  progressbar.style.setProperty('--progressbar-width', persent(i, formFieldset));
}

const persent = (item, arr) => {
  return `${(item / (arr.length - 1)) * 100}%`;
};

// расположение элементов в прогрессбаре
for (let i = 0; i < progressbarItem.length; i++) {
  progressbarItem[i].style
    .setProperty('left', persent(i, progressbarItem));
}
