import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MarkdownEditor from '@uiw/react-markdown-editor';

import Template, {
    TemplateTitle, TemplateLineAction, TemplateData,
    TemplateSearch, TemplateModal, TemplateModalTitle,
    TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import onImagePasted from '../../utils/onImagePasted'
import dataURItoBlob from '../../utils/dataURItoBlob';
import { useEffect } from 'react';

const ClassDetail = props => {
    const [value, setValue] = useState("")
    const [url, setUrl] = useState("")
    const onChange = (e) => {
        setValue(e)
    }

    const Drop = (e) => {
        e.preventDefault();

        var imageUrl = e.dataTransfer.getData('text/html');

        if (imageUrl) {
            let src = new DOMParser().parseFromString(imageUrl, "text/html")
                .querySelector('img').src;
            if (src)
                onImagePasted(src, setValue)
        }
        else {
            var file = e.dataTransfer.files

            if (FileReader && file) {
                var fr = new FileReader();
                fr.onload = function () {
                    onImagePasted(fr.result, setValue)
                }
                fr.readAsDataURL(file[0]);
            }
        }
    }
    const DragOver = (e) => {
        e.preventDefault();
    }
    const DragLeave = (e) => {
        e.preventDefault();
    }
    const DragEnter = (e) => {
        e.preventDefault();
    }
    const Paste = (e) => {
        e.preventDefault();
        console.log(e.clipboardData.files);
        var file = e.clipboardData.files

        if (FileReader && file) {
            var fr = new FileReader();
            fr.onload = function () {
                onImagePasted(fr.result, setValue)
            }
            fr.readAsDataURL(file[0]);
        }
    }
    return (
        <Template>
            <div className="classdetail-title">
                {
                    props.title ? props.title : "Introduction to OOADD"
                }
            </div>
            <TemplateData>
                <div className=" classdetail-md">
                    <MarkdownEditor
                        draggable={true}
                        id="textareamd"
                        value={value}
                        visible
                        height='480px'
                        onChange={onChange}

                        // onPaste={async (event) => {
                        //     await onImagePasted(event.clipboardData, setValue);
                        // }}
                        // onDrag={async (event) => {
                        //     await onImagePasted(event.dataTransfer, setValue);
                        // }}
                        onPaste={Paste}
                        onDrop={Drop}
                        onDragEnter={DragEnter}
                        onDragOver={DragOver}
                        onDragLeave={DragLeave}
                    />
                </div>

            </TemplateData>
        </Template>

    )
}

ClassDetail.propTypes = {
    title: PropTypes.string
}

export default ClassDetail