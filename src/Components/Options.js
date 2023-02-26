
import './options.css';

const Options = ({option,setOption,setChoice}) => {
    return (
        <div className="options flex-justify" data-motion={option}>
            <h1 data-motion={option}>
                <span className="icon">
                    #
                </span>
                Please choose an algorithm
            </h1>
            <div className="option-buttons flex-justify">
                <button data-motion={option} onClick={() => {
                    setChoice(1);
                    setOption("animate-rsa");
                    }}>
                    <span className="button-heading">
                        R.S.A. Algorithm
                    </span>
                    <span className="button-text">
                        KEY GENERATION
                    </span>
                </button>
                <button data-motion={option} onClick={() => {
                    setChoice(2);
                    setOption("animate-dh");
                }}>
                    <span className="button-heading">
                        Diffie-Hellman
                    </span>
                    <span className="button-text">
                        KEY EXCHANGE
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Options;

