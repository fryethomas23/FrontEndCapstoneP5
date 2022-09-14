function validateText(text) {
  if (text.trim() === "") {
    console.warn("Not valid text");
    return false;
  }
  return true;
}

export { validateText };
