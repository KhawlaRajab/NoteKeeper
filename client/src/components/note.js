import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteConfirmationDialog from "./deleteConfirmationDialog";
import UpdateDialog from "./updateDialog";


export default function Note({note,deleteNote,update}) {
     
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = function (e) {
        e.stopPropagation();
        setIsFormOpen(true);
    }

    const closeForm = function (e) {
        e.stopPropagation();
        setIsFormOpen(false);
    }

    const openConfirmation = function (e) {
        e.stopPropagation();
        setIsDeleteConfirmationOpen(true);
    }

    const closeConfirmation = function (e) {
        e.stopPropagation();
        setIsDeleteConfirmationOpen(false);
    }

    const delNote = function (e) {
        const id = note._id;
        console.log(id);
        deleteNote(id);
        closeConfirmation(e);
    }

    
    return (
        <>
            <div className='note' onClick={(e)=>openForm(e)}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                {/* <span>{note.date}</span> */}
                <FaRegTrashAlt className="deleteBtn" onClick={(e) => openConfirmation(e) } />
                {isDeleteConfirmationOpen && <DeleteConfirmationDialog close={closeConfirmation} deleteNote={delNote}  />}
                {isFormOpen &&<UpdateDialog close={closeForm} note={note} update={update} />}

            </div>
        </>
    )
}