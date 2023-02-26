import './App.css';
import {useState} from 'react';
import Options from './Components/Options';
import RSA from './Components/RSA';
import DH from './Components/DH';

const App = () => {
    const [option, setOption] = useState("animate-in");
    const [choice, setChoice] = useState(0);

    return (
        <div className="app flex-justify">
            <Options option={option} setOption={setOption} setChoice={setChoice}/>
            {choice === 1 ?
                <RSA setOption={setOption} setChoice={setChoice}/> : ""
            }
            {choice === 2 ?
                <DH setOption={setOption} setChoice={setChoice}/> : ""
            }
            <div className="credits">
                © Made by Nitai, Ashwin & Bharat for IS IA-1
            </div>
        </div>
    );
}

export default App;
