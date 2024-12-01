import React, { useState, useRef } from "react";
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import AddConsulta from "./AddConsulta";
import axios from "axios";
import moment from "moment"

export default function(){
    const [modalOpen, setModalOpen] = useState(false);
    const[events, setEvents] = useState([])
    const calendarRef = useRef(null);
    
    const onEventAdded = event =>{
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            title: event.title
        })
        
    }
    
    async function handleEventAdd(data){
        await axios.post("/api/calendar/criar_evento", data.event)

    }

    async function handleDatesSet(data){
        const response = await axios.get("/api/calendar/get_events?start="+moment(data.start).toISOString())
        setEvents(response.data);
    }

    return(
        <section>
            <button onClick={() => setModalOpen(true)}>Adicionar consulta</button>

            <div style={{position: "relative", zIndex: 0}}>
                <FullCalendar
                ref={calendarRef}
                events={events}
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                eventAdd= {event=> handleEventAdd(event)}
                datesSet={(date) => handleDatesSet(date)}
            />
            </div>
        

        <AddConsulta 
        isOpen ={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onEventAdded={(event) => onEventAdded(event)}/>
        </section>
    )
}