import { useNavigate } from "react-router";
import EventSection from "../components/EventSection";

function EventsPage({ events, onDeleteEvent, onEditEvent }) {
    const navigate = useNavigate();

    function handleEditEvent(eventId) {
        onEditEvent(eventId);
        navigate("/");
    }
   
    return (
        <>
            <section>
                <p className="section-label">
                    All Campus Activities
                </p>

                <h1>Events</h1>

                <p>
                    Explore all workshops, clubs, sports, and cultural activities
                </p>
            </section>

            <EventSection
                events={events}
                onDeleteEvent={onDeleteEvent}
                onEditEvent={handleEditEvent}
            />
        </>
    );
}

export default EventsPage;