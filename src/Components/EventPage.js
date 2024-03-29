import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { getUser } from "../user";
import axios from "axios";
import { verifier } from "../UserPool";

export default function EventPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const idToken = localStorage.getItem("idToken");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    verifier
      .verify(accessToken)
      .then((res) => {})
      .catch((err) => {
        navigate("/");
        console.log(err);
      });
    axios
      .get(
        "https://3ctxbvozlb.execute-api.eu-north-1.amazonaws.com/dev/api/listEvents",
        {
          headers: {
            Authorization: idToken,
          },
        }
      )
      .then((data) => {
        setEvents(data.data.body);
        console.log(data.data.body);
      })
      .catch((data) => {
        console.log(data);
      });
    // get();
  }, []);

  const user = getUser();

  const get = () => {
    const events = JSON.parse(localStorage.getItem("events"));
    setEvents(events?.filter((o) => o.userId === user?.id) || []);
  };

  const deleteEvent = (id) => {
    const data = [];
    const events = JSON.parse(localStorage.getItem("events"));
    data.push(...events.filter((e) => e.id !== id));
    localStorage.setItem("events", JSON.stringify(data));
    get();
  };

  return (
    <div>
      <Profile
      // children={
      //   <button
      //     style={{ width: "80px" }}
      //     onClick={() => navigate("/events/new")}
      //   >
      //     Add Event
      //   </button>
      // }
      />
      <div className="eventPage">
        <table className="table">
          <thead>
            <tr>
              <th width="6%">Sr no.</th>
              <th>Event Name</th>
              <th>Event Description</th>
              {/* <th>Event Date</th>
              <th>Event Price</th>
              <th>Event Type</th> */}
              {/* <th width="10%" colSpan="2">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {events?.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.eventName}</td>
                <td>{item.eventDescription}</td>
                {/* <td>{item.date}</td>
                <td>{item.price}</td>
                <td>{item.type}</td> */}
                {/* <td>
                  <button onClick={() => navigate(`/events/${item.id}`)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteEvent(item.id)}>Delete</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {!events.length && (
          <p style={{ textAlign: "center", marginTop: "15px" }}>No results</p>
        )}
      </div>
    </div>
  );
}
