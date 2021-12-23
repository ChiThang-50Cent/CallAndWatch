import React from 'react'
import {useParams} from 'react-router-dom'
import {Container, Row} from 'react-bootstrap'
export default function CallScreen() {
    const {room} = useParams()
    return (
        <Container className="h-100 w-100 container-fluid" >
            <Container className='d-flex w-100 flex-column h-100'>
                <Row className='d-flex p-2 h-90 justify-content-center align-items-center'>
                    Call
                </Row>
                <Row className='d-flex p-2 h-10 '>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className='btn btn-light mx-2'><i class="bi bi-mic"></i></button>
                        <button className='btn btn-light mx-2'><i class="bi bi-camera-video"></i></button>
                        <button className='btn btn-light mx-2'><i class="bi bi-film"></i></button>
                        <button className='btn btn-light mx-2'><i class="bi bi-music-note-beamed"></i></button>
                        <button className='btn btn-danger mx-2'><i class="bi bi-telephone-x-fill"></i></button>
                    </div>
                </Row>
            </Container>
        </Container>
    )
}
