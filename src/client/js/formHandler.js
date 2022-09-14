import { validateText } from "./validateText";
import axios from "axios";

const handleSubmit = async (event) => {
  event.preventDefault();

  let formText = document.getElementById("inputText").value;
  console.log("::: Form Submitted :::");
  if (!validateText(formText)) return;

  const { data } = await axios.post("http://localhost:8080/test", {
    text: formText,
  });
  document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
  document.getElementById(
    "subjectivity"
  ).innerHTML = `Subjectivity: ${data.subjectivity}`;
  document.getElementById("text").innerHTML = `Text: \n${formText}`;
};

export { handleSubmit };
