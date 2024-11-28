import './style.css';

export default function DeleteConfirmationDialog({close,deleteNote}) {
         
    

    return (
       <div className="dialogOverlay">
            <div className="deleteConfirmation">
                <h3>Note Deletion</h3>
                <h4>Are you sure you want to delete this note</h4>
                <div className="buttons">
                   <button className='closeBtn' onClick={(e)=>close(e)}>close</button>
                   <button className='confirmBtn' onClick={(e)=>deleteNote(e)}>delete</button>
                </div>      
          </div> 
      </div>
    )
}