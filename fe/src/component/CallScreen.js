import React, { useEffect, useState } from 'react'
import CallElement from './CallElement'

export default function CallScreen() {
    const userCall = [1, 2, 3, 4]
    const [isFilmSrcOn, setIsFilmSrcOn] = useState(false)

    useEffect(() => {
        const gutter = document.getElementById('callScreen').classList.contains('h-15')
        setIsFilmSrcOn(gutter)
    }, [])

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
                <div className={`col-6 h-50 w-50`}>
                    <CallElement />
                </div>)
        }

        return (
            <div className='h-100 w-100 justify-content-center align-items-center'>
                <div className={`row g-2 h-100 w-100`}>
                    {suc}
                </div>
            </div>
        )
    }
}
