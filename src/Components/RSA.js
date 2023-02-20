import './rsa.css';
import Info from './Info';
import {useState,useEffect} from 'react';

const RSA = ({step, setStep}) => {
    const [a,b] = generatePrimes(100,1000),
          n = a*b,
          phi = (a-1)*(b-1);

    const primesInfo = (<p>Usually, these prime numbers are really large,starting anywhere at <b>1024</b> bits to around <b>4096</b> bits, also it is made sure that they are distant, otherwise the decryption key is crackable.</p>);

    return (
        <div className="rsa" data-motion={step}>
            <div className="step-container flex-justify">
                <div className="heading">
                    <h1>
                        Step<span className="icon">#</span>1
                    </h1>
                    <p className="sub-text">
                        Generation of Base Numbers
                    </p>
                </div>
                <p className="body">
                    <span className="normal">We begin by generating two random <b>prime</b> numbers, <Info content={primesInfo} /> </span>
                    <span className="math">p = {a}  &emsp; &emsp; q = {b}</span>
                    <span className="normal">Now we use these two numbers to calculate <b>n</b> and <b>φ</b>,</span>
                    <span className="math">n = p×q = {a}×{b} <br/> &emsp; = {n} <br/> φ = (p-1)×(q-1) = ({a}-1)×({b}-1) <br/> &emsp; = {phi} </span>
                </p>
            </div>
            <button className="next-button flex-justify" onClick={() => setStep('two')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                </svg>
            </button>
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