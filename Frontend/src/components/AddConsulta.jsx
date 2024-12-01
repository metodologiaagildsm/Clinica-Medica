import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';

export default function ({isOpen, onClose, onEventAdded}){
    const[title, setTitle] = useState();
    const[start, setStart] = useState(new Date());


    const onSubmit = (event) =>{
        event.preventDefault();

        onEventAdded({
            title,
            start,
        })
        onClose();
    }

    return(
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <input placeholder="Nome do Paciente" value={title} onChange={e => setTitle(e.target.value)}/>

                <div>
                    <label>Data e Hora da Consulta</label>
                    <Datetime value={start} onChange={date => setStart(date)}/>
                </div>

                <button>Adicionar Consulta</button>
                
            </form>
        </Modal>
    )
}
