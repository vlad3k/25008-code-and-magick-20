'use strict';

var NUMBER_PLAYERS = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

userDialog.classList.remove('hidden');

function getRandomValueFromArray(arr) {
  var randomId = Math.floor(Math.random() * arr.length);
  return arr[randomId];
}

function generateArrayCharacters(names, secondNames, coatsColor, eyesColor) {
  var data = [];
  for (var i = 0; i < NUMBER_PLAYERS; i += 1) {
    var currentCharacter = {};
    currentCharacter.name = getRandomValueFromArray(names) + ' ' + getRandomValueFromArray(secondNames);
    currentCharacter.coatColor = getRandomValueFromArray(coatsColor);
    currentCharacter.eyesColor = getRandomValueFromArray(eyesColor);
    data.push(currentCharacter);
  }
  return data;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

function renderWizards() {
  var wizards = generateArrayCharacters(FIRST_NAMES, SECOND_NAMES, COATS_COLOR, EYES_COLOR);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
}
renderWizards();
