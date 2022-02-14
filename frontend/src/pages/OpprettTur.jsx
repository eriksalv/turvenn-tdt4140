import React, {useState} from 'react';

function OpprettTur() {

    const [formData, setFormData] = useState({
        destination: '',
        startpoint: '',
        date: '',
        difficulty: '',
        duration: '',
        description: ''
    });

    const {destination, startpoint, date, difficulty, duration, description} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      };

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(`Destination: ${destination}, Startpoint: ${startpoint}, Date: ${date}`);
    }

return <div>
      <h1>Opprett en tur</h1>
      <label htmlFor="destination">Turmål</label>
      <input type="text" value={destination} id="destination" name='destination' onChange={onChange}/>
      <label htmlFor="startpoint">Startpunkt</label>
      <input type="text" value={startpoint} id="startpoint" name='startpoint' onChange={onChange}/>
      <label htmlFor="date">Dato</label>
      <input type="datetime-local" value={date} id="date" name='date' onChange={onChange}/> 
      <label htmlFor="difficulty">Vanskelighetsgrad</label>
      <input type="text" value={difficulty} id="difficulty" name='difficulty' onChange={onChange}/>
      <label htmlFor="duration">Varighet</label>
      <input type="text" value={duration} id="duration" name='duration' onChange={onChange}/>
      <label htmlFor="description">Beskrivelse</label>
      <input type="text" value={description} id="description" name='descrition' onChange={onChange}/>
      <button className="btn btn-success">Opprett tur</button>
  </div>;
}

export default OpprettTur;