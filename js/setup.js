'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var mantles = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyes = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballs = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


var getRandom = function (length) {
  return Math.floor(Math.random() * length);
};

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Введите имя');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var userMantle = userDialog.querySelector('.setup-wizard .wizard-coat');
var userEye = userDialog.querySelector('.setup-wizard .wizard-eyes');
var colorFireball = userDialog.querySelector('.setup-fireball-wrap');
var userMantleInput = userDialog.querySelector('input[name="coat-color"]');
var userEyeInput = userDialog.querySelector('input[name="eyes-color"]');
var colorFireballInput = userDialog.querySelector('input[name="fireball-color"]');

userMantle.addEventListener('click', function () {
  var coat = mantles[getRandom(mantles.length)];
  userMantle.style.fill = coat;
  userMantleInput.value = coat;
});

userEye.addEventListener('click', function () {
  var eye = eyes[getRandom(eyes.length)];
  userEye.style.fill = eye;
  userEyeInput.value = eye;
});

colorFireball.addEventListener('click', function () {
  var fireball = fireballs[getRandom(fireballs.length)];
  colorFireball.style.background = fireball;
  colorFireballInput.value = fireball;
});

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getWizards = function (number) {
  for (var i = 0; i <= number; i++) {
    wizards[i] = {
      name: names[getRandom(names.length)] + ' ' + surnames[getRandom(surnames.length)],
      coatColor: mantles[getRandom(mantles.length)],
      eyesColor: eyes[getRandom(eyes.length)]
    };
  }
  return wizards;
};

getWizards(3);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
