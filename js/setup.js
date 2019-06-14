'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var mantles = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyes = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandom = function (length) {
  var element = Math.round(Math.random() * 10);

  element = element >= length ? getRandom(length) : element;

  return element;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = [
  {
    name: names[getRandom(names.length)] + ' ' + surnames[getRandom(surnames.length)],
    coatColor: mantles[getRandom(mantles.length)],
    eyesColor: eyes[getRandom(eyes.length)]
  },
  {
    name: names[getRandom(names.length)] + ' ' + surnames[getRandom(surnames.length)],
    coatColor: mantles[getRandom(mantles.length)],
    eyesColor: eyes[getRandom(eyes.length)]
  },
  {
    name: names[getRandom(names.length)] + ' ' + surnames[getRandom(surnames.length)],
    coatColor: mantles[getRandom(mantles.length)],
    eyesColor: eyes[getRandom(eyes.length)]
  },
  {
    name: names[getRandom(names.length)] + ' ' + surnames[getRandom(surnames.length)],
    coatColor: mantles[getRandom(mantles.length)],
    eyesColor: eyes[getRandom(eyes.length)]
  }
];

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
