// import type { SetStateAction } from 'react';
// import { fileUpload } from 'firebase/storage';
import { insertToTextArea } from './insertToTextArea';

const onImagePasted = (url, setMarkdown) => {


  const insertedMarkdown = insertToTextArea(`![](${url})`);

  setMarkdown(insertedMarkdown)

}
export default onImagePasted