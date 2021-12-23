import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {Row} from 'react-bootstrap'
import CallScreen from './CallScreen'
import FilmScreen from './FilmScreen'
import MusicScreen from './MusicScreen'
export default function MainScreen() {
    const {room} = useParams()

    // size equal zero is mean size defalut
    // equal 1 is for film
    // equal 2 is for music

    const [sizes, setSize] = useState({
        filmSize : 0,
        callSize : 0,
        musicSize : 0
    })

    const clickFilmbtn = () => {
        document.getElementById('callScreen').classList.add('lg')
    }

    return (
        <div className="d-flex h-100 w-100 container-fluid" >
            <div className='d-flex w-100 flex-column h-100 container-fluid'>
                <Row className='d-flex p-2 h-90 justify-content-center align-items-center' id ="callMain">
                    <div id="callSreen" className='h-100 w-100'><CallScreen /></div>
                    <div id="filmScreen" className="d-none"><FilmScreen /></div>
                    <div id="musicScreen" className='d-none'><MusicScreen /></div>
                </Row>
                <Row className='d-flex p-2 h-10 '>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className='btn btn-light mx-2'><i class="bi bi-mic"></i></button>
                        <button className='btn btn-light mx-2'><i class="bi bi-camera-video"></i></button>
                        <button className='btn btn-light mx-2' onClick={clickFilmbtn}><i class="bi bi-film"></i></button>
                        <button className='btn btn-light mx-2'><i class="bi bi-music-note-beamed"></i></button>
                        <button className='btn btn-danger mx-2'><i class="bi bi-telephone-x-fill"></i></button>
                    </div>
                </Row>
            </div>
        </div>
    )
}
