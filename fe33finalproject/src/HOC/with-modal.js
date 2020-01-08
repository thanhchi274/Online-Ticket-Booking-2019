import React from 'react'

export default function WithModal(Component) {
    return function(){
        return (
               <div>
                {/* Button to Open the Modal */}
                {/* The Modal */}
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                        {/* Goi lai component tuong ung tham so truyen vao */}
                        <Component />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        )
    }
}
