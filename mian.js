document.addEventListener('DOMContentLoaded', () => {
  const addn = document.querySelector('#add');

  const updateLSD = () => {
    const textareadata = document.querySelectorAll('textarea');
    const notes = [];
    textareadata.forEach((note) => {
      return notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
  };

  const createNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmldata = `
      <div class="main ${text ? '' : 'hidden'}">${text}</div>
      <textarea class="${text ? 'hidden' : ''}" placeholder="Note Content" style="border: none;">${text}</textarea>
      <div class="footer">
        <span>Created on <span class="Dat" style="margin: 0 3px;"></span></span>
        <span class="delete">Delete</span>
        <span class="Edit">Edit</span>
      </div>
    `;

    note.insertAdjacentHTML('afterbegin', htmldata);

    // adding the date setter
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    note.querySelector('.Dat').innerHTML = dateString;

    // geting the ReferenceE
    const Deletebtn = note.querySelector('.delete');
    const Editbtn = note.querySelector('.Edit');
    const maindiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    // deleting the node
    Deletebtn.addEventListener('click', () => {
      note.remove();
      updateLSD();
    });

    // Editing the node
    Editbtn.addEventListener('click', () => {
      maindiv.classList.toggle('hidden');
      textarea.classList.toggle('hidden');
    });

    textarea.addEventListener('input', () => {
      const value = textarea.value;
      maindiv.innerHTML = value;
      updateLSD();
    });

    document.body.appendChild(note);
  };

  // Call createNote without recursion here
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((note) => createNote(note));

  addn.addEventListener('click', () => createNote());
});
