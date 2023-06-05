'use strict';

let buttonEl = document.getElementById('logout');

function handleLogout(event) {
  window.location.replace(event.target.value);
}

buttonEl.addEventListener('click', handleLogout);

const state = {
  candidates: [],
  polls: []
}

class Profile{
  constructor() {}
}

