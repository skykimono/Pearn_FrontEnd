// import type { SetStateAction } from 'react';
// import { fileUpload } from 'firebase/storage';
import { insertToTextArea } from './insertToTextArea';

const onImagePasted = (url, setMarkdown) => {

  // let url = ""
  // console.log(dataTransfer, "hello")
  // const file = dataTransfer

  // if (FileReader && file) {
  //   var fr = new FileReader();
  //   fr.onloadend = function () {
  //     url = fr.result;
  //   }

  //   fr.readAsDataURL(file)
  //   url = fr.result
  // }



  const insertedMarkdown = insertToTextArea(`![](${url})`);

  setMarkdown(insertedMarkdown)

}
export default onImagePasted