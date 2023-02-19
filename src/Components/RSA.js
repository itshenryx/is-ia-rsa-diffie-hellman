
import './rsa.css';

const RSA = ({step,setStep}) => {
    return (
        <div className="rsa" data-motion={step}>
            <div className="step-one">
                <h1 data-motion={step}>
                    Step<span className="icon">#</span>1
                </h1>
                <p className="sub-heading">
                    Generating Two Random Prime Numbers
                </p>
            </div>
        </div>
    );
}

export default RSA;