import './App.css';
import {useState} from 'react';
import Options from './Components/Options';
import RSA from './Components/RSA';

const App = () => {
    const [option, setOption] = useState("animate-in");
    const [choice, setChoice] = useState(0);
    const [step, setStep] = useState("zero");
    const [page, setPage] = useState(0);

    return (
        <div className="app flex-justify">
            <Options option={option} setOption={setOption} setStep={setStep} setPage={setPage} setChoice={setChoice}/>
            {choice === 1 ?
                <RSA step={step} setStep={setStep} page={page} setPage={setPage}/> : ""
            }
            <div className="credits">
                © Made by Nitai, Ashwin & Bharat for IS IA-1
            </div>
        </div>
    );
}

export default App;
