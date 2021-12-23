import React from 'react'

export default function CallElement() {
    const name = "User name"
    return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100">

                <img src="user.png"
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                    alt="User Image" />
            
        </div>
    )
}
