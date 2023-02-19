import './rsa.css';

const RSA = ({step, setStep}) => {
    const [a,b] = generatePrimes(100,1000),
          n = a*b,
          phi = (a-1)*(b-1);

    return (
        <div className="rsa" data-motion={step}>
            <div className="step-container flex-justify">
                <div className="heading">
                    <h1 data-motion={step}>
                        Step<span className="icon">#</span>1
                    </h1>
                    <p className="sub-text">
                        Generating of Base Numbers
                    </p>
                </div>
                <p className="body">
                    <span className="normal">We begin by generating two random <b>prime</b> numbers,</span>
                    {/*<span className="danger">Usually, these prime numbers are really large and very distant</span>*/}
                    <span className="math">p = {a}  &emsp; &emsp; q = {b}</span>
                    <span className="normal">Now we use these two numbers to calculate <b>n</b> and <b>φ</b>,</span>
                    <span className="math">n = p×q = {n} <br/> φ = (p-1)×(q-1) = {phi} </span>
                </p>
            </div>
        </div>
    );
}

const generatePrimes = (min, max) => {
    const result = Array(max + 1)
        .fill(0)
        .map((_, i) => i);
    for (let i = 2; i <= Math.sqrt(max + 1); i++) {
        for (let j = i ** 2; j < max + 1; j += i) delete result[j];
    }
    const primes = Object.values(result.slice(Math.max(min, 2)));
    const r1 = Math.floor(Math.random() * (primes.length - 1));
    const r2 = Math.floor(Math.random() * (primes.length - 1));

    return [primes[r1],primes[r2]];
}

export default RSA;