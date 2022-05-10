import React, {useState, useEffect} from 'react'
import axios from 'axios'

const NewEvents = (props) => {
    const[state, setState] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3003/events')
        .then(res => setState(res.data))
    })
  return (
    <div> {state.map((ele, i) => {
      return(
            <div key={i}>
                <p>{ele.title}</p>
                <p>{ele.date}</p>
            </div>
        )
    })}</div>
  )
}

export default NewEvents