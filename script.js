/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */

const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'keyboard-textarea');
textarea.setAttribute('class', 'use-keyboard-input');
document.body.appendChild(textarea);

const info = document.createElement('h3');
info.setAttribute('class', 'information');
document.body.appendChild(info);

info.innerHTML = 'Изменение раскладки Shift + Alt';


const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  isRussian: {
    keyLayoutEng:
      {
        Backquote: '`',
        Digit1: '1',
        Digit2: '2',
        Digit3: '3',
        Digit4: '4',
        Digit5: '5',
        Digit6: '6',
        Digit7: '7',
        Digit8: '8',
        Digit9: '9',
        Digit0: '0',
        Minus: '-',
        Equal: '=',
        Backspace: 'backspace',
        Tab: 'tab',
        KeyQ: 'q',
        KeyW: 'w',
        KeyE: 'e',
        KeyR: 'r',
        KeyT: 't',
        KeyY: 'y',
        KeyU: 'u',
        KeyI: 'i',
        KeyO: 'o',
        KeyP: 'p',
        BracketLeft: '[',
        BracketRight: ']',
        Backslash: '\\',
        Delete: 'del',
        CapsLock: 'capslock',
        KeyA: 'a',
        KeyS: 's',
        KeyD: 'd',
        KeyF: 'f',
        KeyG: 'g',
        KeyH: 'h',
        KeyJ: 'j',
        KeyK: 'k',
        KeyL: 'l',
        Semicolon: ';',
        Quote: "'",
        Enter: 'enter',
        ShiftLeft: 'Shift',
        KeyZ: 'z',
        KeyX: 'x',
        KeyC: 'c',
        KeyV: 'v',
        KeyB: 'b',
        KeyN: 'n',
        KeyM: 'm',
        Comma: ',',
        Period: '.',
        Slash: '/',
        ArrowUp: '🠉',
        ShiftRight: 'shift',
        ControlLeft: 'Ctrl',
        MetaLeft: 'win',
        AltLeft: 'Alt',
        Space: 'space',
        AltRight: 'alt',
        ControlRight: 'ctrl',
        ArrowLeft: '🠈',
        ArrowDown: '🠋',
        ArrowRight: '🠊',
      },


    keyLayoutRu:
      {
        Backquote: 'ё',
        Digit1: '1',
        Digit2: '2',
        Digit3: '3',
        Digit4: '4',
        Digit5: '5',
        Digit6: '6',
        Digit7: '7',
        Digit8: '8',
        Digit9: '9',
        Digit0: '0',
        Minus: '-',
        Equal: '=',
        Backspace: 'backspace',
        Tab: 'tab',
        KeyQ: 'й',
        KeyW: 'ц',
        KeyE: 'у',
        KeyR: 'к',
        KeyT: 'е',
        KeyY: 'н',
        KeyU: 'г',
        KeyI: 'ш',
        KeyO: 'щ',
        KeyP: 'з',
        BracketLeft: 'х',
        BracketRight: 'ъ',
        Backslash: '\\',
        Delete: 'del',
        CapsLock: 'capslock',
        KeyA: 'ф',
        KeyS: 'ы',
        KeyD: 'в',
        KeyF: 'а',
        KeyG: 'п',
        KeyH: 'р',
        KeyJ: 'о',
        KeyK: 'л',
        KeyL: 'д',
        Semicolon: 'ж',
        Quote: 'э',
        Enter: 'enter',
        ShiftLeft: 'Shift',
        KeyZ: 'я',
        KeyX: 'ч',
        KeyC: 'с',
        KeyV: 'м',
        KeyB: 'и',
        KeyN: 'т',
        KeyM: 'ь',
        Comma: 'б',
        Period: 'ю',
        Slash: '.',
        ArrowUp: '🠉',
        ShiftRight: 'shift',
        ControlLeft: 'Ctrl',
        MetaLeft: 'win',
        AltLeft: 'Alt',
        Space: 'space',
        AltRight: 'alt',
        ControlRight: 'ctrl',
        ArrowLeft: '🠈',
        ArrowDown: '🠋',
        ArrowRight: '🠊',
      },

    keyLayout: {},

    flag: true,
    shiftFlag: null,
  },

  reprint() {
    this.elements.keys.forEach((element) => {
      element.remove();
    });
    const div = document.getElementById('k-key');
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
  },


  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.setAttribute('id', 'k-key');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    if (this.isRussian.flag === true) this.isRussian.keyLayout = this.isRussian.keyLayoutEng;
    else this.isRussian.keyLayout = this.isRussian.keyLayoutRu;

    const fragment = document.createDocumentFragment();

    // eslint-disable-next-line camelcase
    const createIconHTML = (icon_name) => `<i class="material-icons">${icon_name}</i>`;

    // eslint-disable-next-line guard-for-in
    for (const key in this.isRussian.keyLayout) {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'Delete', 'Enter', 'ShiftRight'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');


      switch (this.isRussian.keyLayout[key]) {
        case 'backspace':
          keyElement.id = 'Backspace';
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          // eslint-disable-next-line no-loop-func
          keyElement.addEventListener('click', () => {
            document.getElementById('keyboard-textarea').value = document.getElementById('keyboard-textarea').value.substring(0, document.getElementById('keyboard-textarea').value.length - 1);
          });
          break;

        case 'capslock':
          keyElement.id = 'CapsLock';
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.id = 'Enter';
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          // eslint-disable-next-line no-loop-func
          keyElement.addEventListener('click', () => {
            document.getElementById('keyboard-textarea').value += '\n';
          });
          break;

        case 'space':
          keyElement.id = 'Space';
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');
          // eslint-disable-next-line no-loop-func
          keyElement.addEventListener('click', () => {
            document.getElementById('keyboard-textarea').value += ' ';
          });
          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click', () => {
            this.close();
            this.triggerEvent('onclose');
          });
          break;

        case 'Shift':
          keyElement.id = 'ShiftLeft';
          keyElement.classList.add('keyboard__key--shift');
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += '';
          });
          break;

        case 'shift':
          keyElement.id = 'ShiftRight';
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'Ctrl':
          keyElement.id = 'ControlLeft';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;
        case 'ctrl':
          keyElement.id = 'ControlRight';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'Alt':
          keyElement.id = 'AltLeft';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'alt':
          keyElement.id = 'AltRight';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'win':
          keyElement.id = 'Meta';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });
          break;

        case 'tab':
          keyElement.id = 'Tab';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          // eslint-disable-next-line no-loop-func
          keyElement.addEventListener('click', () => {
            document.getElementById('keyboard-textarea').value += '  ';
          });
          break;

        case '🠉':
          keyElement.id = 'ArrowUp';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          // eslint-disable-next-line no-loop-func
          keyElement.addEventListener('click', () => {
            document.getElementById('keyboard-textarea').value += '🠉';
          });
          break;

        case '🠈':
          keyElement.id = 'ArrowLeft';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          // eslint-disable-next-line no-loop-func
          keyElement.addEventListener('click', () => {
            document.getElementById('keyboard-textarea').value += '🠈';
          });
          break;

        case '🠋':
          keyElement.id = 'ArrowDown';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          // eslint-disable-next-line no-loop-func
          keyElement.addEventListener('click', () => {
            document.getElementById('keyboard-textarea').value += '🠋';
          });
          break;

        case '🠊':
          keyElement.id = 'ArrowRight';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          // eslint-disable-next-line no-loop-func
          keyElement.addEventListener('click', () => {
            document.getElementById('keyboard-textarea').value += '🠊';
          });
          break;

        case 'del':
          keyElement.id = 'Delete';
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          keyElement.addEventListener('click', () => {
            // eslint-disable-next-line max-len
            this.properties.value = this.properties.value.substring(this.properties.value.length - 1, 0);
            this.triggerEvent('oninput');
          });
          break;


        default:
          keyElement.id = key;
          keyElement.textContent = this.isRussian.keyLayout[key].toLowerCase();
          // eslint-disable-next-line no-loop-func
          keyElement.addEventListener('click', () => {
            document.getElementById('keyboard-textarea').value += this.properties.capsLock ? this.isRussian.keyLayout[key].toUpperCase() : this.isRussian.keyLayout[key].toLowerCase();
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    }


    return fragment;
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        // eslint-disable-next-line max-len
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});

document.addEventListener('keydown', (event) => {
  document.getElementById(event.code).classList.add('active');
  if (event.key === 'Alt' || event.key === 'alt'
   || event.key === 'Shift' || event.key === 'shift'
   || event.key === 'Control' || event.key === 'ctrl') {
    event.preventDefault();
    document.getElementById('keyboard-textarea').value += '';
  } else
  if (event.key === 'Tab') {
    event.key = '';
    document.getElementById('keyboard-textarea').value += '  ';
  } else
  if (event.key === 'Backspace') {
    document.getElementById('keyboard-textarea').value = document.getElementById('keyboard-textarea').value.substring(0, document.getElementById('keyboard-textarea').value.length - 1);
  } else
  if (event.key === 'Enter') {
    event.key = '';
    document.getElementById('keyboard-textarea').value += '\n';
  } else
  if (event.code === 'Space') {
    event.key = '';
    document.getElementById('keyboard-textarea').value += ' ';
  } else
  if (event.code === 'Delete') {
    event.key = '';
    document.getElementById('keyboard-textarea').value += '';
  } else
  if (event.code === 'CapsLock') {
    event.key = '';
    this.toggleCapsLock();
    event.classList.toggle('keyboard__key--active', Keyboard.properties.capsLock);
  } else document.getElementById('keyboard-textarea').value += Keyboard.isRussian.keyLayout[event.code];
});

document.addEventListener('keyup', (event) => {
  document.getElementById(event.code).classList.remove('active');
});


document.addEventListener('keydown', (event) => {
  if (event.altKey && event.shiftKey) {
    if (Keyboard.isRussian.flag === true) {
      Keyboard.isRussian.flag = false;
      Keyboard.reprint();
    } else {
      Keyboard.isRussian.flag = true;
      Keyboard.reprint();
    }
  }
});
