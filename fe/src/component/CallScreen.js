import React from 'react'
import CallElement from './CallElement'

export default function CallScreen() {
    const userCall = [1]

    if (userCall.length === 1) {
        return (
            <div className="d-flex flex-row h-100 w-100 justify-content-center align-items-center" >
                <CallElement />
            </div>
        )
    }
    if (userCall.length >= 4) {

        let suc = []

        for (let i = 0; i < 4; i++) {
            suc.push(
                <div className={`h-25`}>
                    <CallElement />
                </div>)
        }

        return (
            <div className='d-flex h-100 w-100 justify-content-center align-items-center'>
                <div className={`h-100 w-100`}>
                    {suc}
                </div>
            </div>
        )
    }
}
