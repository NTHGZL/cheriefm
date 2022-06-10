export default function Modal  (isOpen: boolean, onClose: any) {
    return (
        
            isOpen ? 
                (<div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Modal Header</h2>
                        <button onClick={onClose}>Close</button>
                    </div>
                    <div className="modal-body">
                        <p>Some text in the modal.</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={()=>isOpen = false}>Close</button>
                    </div>
                </div>
            </div>) : ''
            
        
            
            
        
        
            
    )
}
