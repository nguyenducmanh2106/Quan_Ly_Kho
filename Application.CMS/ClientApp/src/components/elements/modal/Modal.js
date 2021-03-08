import React from 'react';
import ReactDOM from 'react-dom';
 //<div className="modal-overlay" />
 //       <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
 //           <div className="modal">
 //               <div className="modal-header">
 //                   <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
 //                       <span aria-hidden="true">&times;</span>
 //                   </button>
 //               </div>
 //               <p>
 //               Hello, I'm a modal.
 //               </p>
 //           </div>
 //       </div>
const Modal = ({ isShowing, hide}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal fade show" id="modal-lg" style={{ display: isShowing ? "block" : "none" }} >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Tạo Mới</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hide}>
                            <span aria-hidden="true">X</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Nội dung</p>
                    </div>
                    <div className="modal-footer justify-content-between">
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        </  React.Fragment>, document.body
) : null;
export default Modal;
