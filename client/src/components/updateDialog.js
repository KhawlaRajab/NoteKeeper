import { useState,useEffect } from 'react';
import './style.css';

export default function UpdateDialog({ close, note,update}) {
    const [updateTitle, setUpdateTitle] = useState(note.title);
    const [updateContent, setUpdateContent] = useState(note.content)


    
    const Update = function (e) {
        const title = updateTitle;
        const content = updateContent;
        const uNote = {...note, title, content };
        update(uNote);
        close(e);
    }

    return (
        <div className="dialogOverlay">
             <div className="form">
            <label htmlFor='title' >Title:</label>
                <input id='title' value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
            <br/>
                <input placeholder="take a note" className="noteFeild" value={updateContent} onChange={(e) => setUpdateContent(e.target.value)} />
            <br />
            <div className="buttons">
                <button className='closeBtn' onClick={(e)=>close(e)} >cancel</button>
                   <button className='edit' onClick={(e)=>Update(e)}>edit</button>
            </div>  
        </div>
        </div> 
    )
}