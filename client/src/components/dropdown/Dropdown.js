import { useState } from "react";
import './Dropdown.css';

const Dropdown = (props) =>{
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    
        props.setBanDay(event.target.value.substr(0, event.target.value.length - 1));
        /* console.log(event.target.value.substr(0, event.target.value.length - 1)); */
    }

    return (
        <div className='dropdown'>
            <label htmlFor='options'></label>
            <select className="dropdown-select" onChange={handleChange}>
                <option value="" disabled>{props.description}</option>
                {props.option.map((value) => <option value={value}>{value}</option>)}
            </select>
        </div>
    );
}
export default Dropdown;