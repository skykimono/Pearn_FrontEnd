export const insertToTextArea = (intsertString) => {
  const textarea = document.getElementsByClassName('cm-activeLine cm-line')[0];

  if (!textarea) {
    return null;
  }
  let sentence = textarea.innerHTML;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + intsertString + back;

  textarea.innerHTML = sentence;
  textarea.selectionEnd = end + intsertString.length;

  return sentence;
};

