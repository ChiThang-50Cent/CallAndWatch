import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Row} from 'react-bootstrap'
import CallScreen from './CallScreen'
import FilmScreen from './FilmScreen'
import MusicScreen from './MusicScreen'
export default function MainScreen() {
    const {room} = useParams()

    const clickFilmbtn = () => {
        let callNode = document.getElementById('callScreen').classList
        let filmNode = document.getElementById('filmScreen').classList

        callNode.toggle('h-100')
        callNode.toggle('h-15')
        filmNode.toggle('h-85')
        filmNode.toggle('d-none')
    }

    return (
        <div className="d-flex h-100 w-100 container-fluid" >
            <div className='d-flex w-100 flex-column h-100 container-fluid'>
                <Row className='d-flex p-2 h-90 justify-content-center align-items-center' id ="callMain">
                    <div id="callScreen" className='h-100 w-100'><CallScreen /></div>
                    <div id="filmScreen" className="d-none"><FilmScreen /></div>
                    <div id="musicScreen" className='d-none'><MusicScreen /></div>
                </Row>
                <Row className='d-flex p-2 h-10 '>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className='btn btn-light mx-2'><i className="bi bi-mic"></i></button>
                        <button className='btn btn-light mx-2'><i className="bi bi-camera-video"></i></button>
                        <button className='btn btn-light mx-2' onClick={clickFilmbtn}><i className="bi bi-film"></i></button>
                        <button className='btn btn-light mx-2'><i className="bi bi-music-note-beamed"></i></button>
                        <button className='btn btn-danger mx-2'><i className="bi bi-telephone-x-fill"></i></button>
                    </div>
                </Row>
            </div>
        </div>
    )
}
