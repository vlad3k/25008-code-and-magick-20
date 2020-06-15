'use strict';

var NUMBER_PLAYERS = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardNameInput = document.querySelector('.setup-user-name');
var wizardCoatInput = document.querySelector('input[name="coat-color"]');
var wizardEyesInput = document.querySelector('input[name="eyes-color"]');
var wizardFireballInput = document.querySelector('input[name="fireball-color"]');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

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

function paintCoat() {
  var color = getRandomValueFromArray(COATS_COLOR);
  wizardCoatInput.value = color;
  wizardCoat.style.fill = color;
}

function paintEyes() {
  var color = getRandomValueFromArray(EYES_COLOR);
  wizardEyesInput.value = color;
  wizardEyes.style.fill = color;
}

function paintFireball() {
  var color = getRandomValueFromArray(FIREBALLS_COLOR);
  wizardFireballInput.value = color;
  wizardFireball.style.background = color;
}

function onPopupEscPress(evt) {
  if (evt.key === 'Escape' && document.activeElement !== wizardNameInput) {
    evt.preventDefault();
    closePopup();
  }
}

function openPopup() {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardCoat.addEventListener('click', paintCoat);
  wizardEyes.addEventListener('click', paintEyes);
  wizardFireball.addEventListener('click', paintFireball);
}

function closePopup() {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', paintCoat);
  wizardEyes.removeEventListener('click', paintEyes);
  wizardFireball.removeEventListener('click', paintFireball);
}

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

renderWizards();
