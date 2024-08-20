import { useState } from "react";
import './Dropdown.css';

const Dropdown = (props) =>{
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }

    return (
        <div className='dropdown'>
            <label htmlFor='options'></label>
            <select className="dropdown-select">
                <option value="" disabled>{props.description}</option>
                {props.option.map((value) => <option value={value}>{value}</option>)}
            </select>
        </div>
    );
}
export default Dropdown;