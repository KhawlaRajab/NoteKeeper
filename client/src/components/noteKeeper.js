import { useEffect, useState } from 'react';
import './style.css';
import Note from './note'
import NoteForm from './NoteForm';
import UpdateDialog from './updateDialog';



export default function Ui() {
    const [notes, setNotes] = useState([]);
    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch('http://localhost:5000/notes');
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const fetchedNotes = await res.json();
                setNotes(fetchedNotes);
            } catch (e) {
                console.error(e);
            }
        };
    
        fetchNotes();
    }, []);
    

    const openAddNote = function () {
        setIsOpenAddNote(true);
    }

    
    const cancelAddNote = function () {
        setIsOpenAddNote(false);
    }


    const addNote = async (note) => {
        try {
          const res = await fetch('http://localhost:5000/notes', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(note),
          });
    
          if (!res.ok) throw new Error('Failed to add note');
          
          const addedNote = await res.json();
          setNotes((notes) => [...notes, addedNote]);
          setIsOpenAddNote(false);
        } catch (e) {
          console.error(e);
        }
    };
    
    const deleteNote = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/notes/${id}`,
                {
                    method: 'DELETE'
            });
            if (!res.ok) throw new Error('note is not found');
            setNotes(notes.filter(note => note._id !== id));
        }
        catch (e) {
            console.error(e);
        }
    }

    const UpdateNote = async (updatedNote) => {
        try {
            console.log(updatedNote);
            const res = await fetch(`http://localhost:5000/notes/${updatedNote._id}`,
                {
                    method: 'PUT', headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(updatedNote),
            });
            if (!res.ok) throw new Error('note is not found');
            setNotes(notes.map((note) =>
            note._id === updatedNote._id ? updatedNote : note));
        }
        catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            <div className='header'>
                <h2>MyNoteKeeper</h2>
                <input placeholder='Search' className='Search' />
                <hr />
            </div>
            <div className='takeNote'>
                {!isOpenAddNote ? <input placeholder='take a note' className='takeNoteInput' onClick={openAddNote} />
                    : <NoteForm cancel={cancelAddNote} add={addNote}  /> } 
                
            </div>
            <div className='container'>
            {notes.map(note => (
                <Note key={note._id} note={note} deleteNote={deleteNote} update={UpdateNote} />
            ))}
            </div>
        </> 
    );
}