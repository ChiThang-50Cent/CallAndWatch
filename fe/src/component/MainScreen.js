import React from 'react'
import CallScreen from './CallScreen'
import FilmScreen from './FilmScreen'
import MusicScreen from './MusicScreen'
export default function MainScreen() {

    const clickFilmbtn = () => {
        let callNode = document.getElementById('callScreen').classList
        let filmNode = document.getElementById('filmScreen').classList

        callNode.toggle('w-100')
        callNode.toggle('w-15')
        filmNode.toggle('w-85')
        filmNode.toggle('d-none')
    }

    return (
        <div className="d-flex h-100 w-100 container-fluid" >
            <div className='d-flex w-100 flex-column h-100 container-fluid'>
                <div className='d-flex flex-row p-2 h-100 w-100 justify-content-center align-items-center' id="callMain">
                    <div id="callScreen" className="h-100 w-100">
                        <div  className='h-100 w-100'><CallScreen /></div>
                    </div>
                    <div id="filmScreen" className="d-none h-100">
                        <div className='h-100'><FilmScreen /></div>
                    </div>
                    <div id="musicScreen" className='d-none' >
                        <div ><MusicScreen /></div>
                    </div>
                </div>
                <div className='d-flex h-10 justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className='btn btn-light mx-2'><i className="bi bi-mic"></i></button>
                        <button className='btn btn-light mx-2'><i className="bi bi-camera-video"></i></button>
                        <button className='btn btn-light mx-2' onClick={clickFilmbtn}><i className="bi bi-film"></i></button>
                        <button className='btn btn-light mx-2'><i className="bi bi-music-note-beamed"></i></button>
                        <button className='btn btn-danger mx-2'><i className="bi bi-telephone-x-fill"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
