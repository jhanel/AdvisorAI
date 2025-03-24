import React, {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';


function ClassInput(){
    const [selectedClassNum, setSelectedClassNum] = useState(null);
    const numClasses = [
        { name: '1', code: '1' },
        { name: '2', code: '2' },
        { name: '3', code: '3' },
        { name: '4', code: '4' },
        { name: '5', code: '5' }
    ];

    return (
        <div className="card flex justify-content-center">
            <text>How many classes are you taking? &nbsp;</text>
            <Dropdown value={selectedClassNum} onChange={(e) => setSelectedClassNum(e.value)} options={numClasses} optionLabel="name" placeholder="Select Number of Classes" className="w-full md:w-14rem" />
            
        </div>
    )

};

export default ClassInput;