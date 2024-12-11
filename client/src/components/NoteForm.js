import { useState } from 'react';
import './style.css';

export default function NoteForm({ cancel,add}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handelAdd = function () {
        const note = {
            title,
            content
        }
        console.log(note);
        add(note);

    }

    return (
        <div className="form">
            <label htmlFor='title'>Title:</label>
            <input id='title' onChange={(e) => setTitle(e.target.value)} />
            <br/>
            <input placeholder="take a note" className="noteFeild" onChange={(e) => setContent(e.target.value)} />
            <br />
            <div className="buttons">
                <button className='closeBtn' onClick={cancel} >cancel</button>
                <button className='add' onClick={handelAdd}>add</button>
            </div>  
        </div>
    )
}