import React from 'react'

export default function WithModal(Component) {
    return function(){
        return (
               <div>
                {/* Button to Open the Modal */}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                Nhan Vien
                </button>
                {/* The Modal */}
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                        <h4 className="modal-title">Modal Body</h4>
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                        {/* Goi lai component tuong ung tham so truyen vao */}
                        <Component />
                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        )
    }
}
