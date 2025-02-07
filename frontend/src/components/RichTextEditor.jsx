import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


//this ia s rich text editor from recat-quill
const RichTextEditor = ({input, setInput}) => {

    const changeEventHandler = (value) => {
        setInput({...input, description: value});
    }
  return <ReactQuill theme="snow" value={input.description} onChange={changeEventHandler} />;
}

export default RichTextEditor

