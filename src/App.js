
import './App.css';
import {useState} from 'react';
import Options from './Components/Options';
import RSA from './Components/RSA';

const App = () => {
    const [option, setOption] = useState("animate-in");
    const [step, setStep] = useState("zero");

    return (
        <div className="app flex-justify">
            <Options option={option} setOption={setOption} setStep={setStep}/>
            <RSA step={step} setStep={setOption}/>
            <div className="credits">
                © Made by Nitai, Ashwin & Bharat for IS IA-1
            </div>
        </div>
    );
}

export default App;
