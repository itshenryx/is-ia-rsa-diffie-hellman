import './rsa.css';
import Info from './Info';
import Typewriter from 'typewriter-effect';
import {useState, useEffect, useRef} from 'react';

const RSA = () => {
    const [showButton, setShowButton] = useState("false");
    const [animateOut, setAnimateOut] = useState("wait");
    const [textRegen, setTextRegen] = useState("off");
    const [page, setPage] = useState(0);

    // RSA related data
    const [a, b] = generatePrimes(100, 1000),
        n = a * b,
        phi = (a - 1) * (b - 1);

    let e = 2;
    while (e < phi) {
        if (gcd(e, phi) === 1) break;
        e++;
    }

    // Display related data
    const subTitles = ["Generation of Base Numbers","Generation the Encryption Key"],
        specialInfo = [(<p>
            <p>Usually, these prime numbers are really large,starting anywhere at <b>1024</b> bits to around <b>4096</b> bits,
                also it
                is made sure that they are distant, otherwise the decryption key is crackable.</p> <br/> <p><b>φ(n)</b> represents
            the
            count of numbers which are smaller than n, and coprime with n. </p></p>),
        ],
        body = [`<div class="wrapper"><span class="normal">We begin by generating two random <b>prime</b> numbers, </span> <span class="math">p = ${a}  &emsp; &emsp; q = ${b}</span> <span class="normal">Now we use these two numbers to calculate <b>n</b> and <b>φ(n)</b>, </span> <span class="math">n = p×q = ${a}×${b} <br/> &emsp; = ${n} <br/> φ = (p-1)×(q-1) = (${a}-1)×(${b}-1) <br/> &emsp; = ${phi} </span></div>`,
            `
            <div class="wrapper">
              <span class="normal">The encryption key <b>e</b> must follow the following conditions, </span>
              <span class="math">1 < <b>e</b> < φ(n) <br/>gcd{e,n} = 1 <br/>gcd{e,φ(n)} = 1 </span> 
              <span class="normal">Following the aforementioned conditions, we calculate a value for <b>e</b>, </span> 
              <span class="math">e = ${e} ; Public Key(e,n) = (${e},${n})</span>
              <span class="normal">The newly calculated <b>e</b> & <b>n</b> will be used as a part of our public key and <b>e</b> will also be used to generate the private key.</span> 
            </div>`]


    useEffect(() => {
        setTimeout(() => {setAnimateOut("false"); setTextRegen("on")}, 1500);
    }, []);

    return (
        <div className="rsa">
            <div className="step-container flex-justify" data-motion={animateOut}>
                <div className="heading">
                    <h1>
                        Step<span className="icon">#</span>{page + 1}
                    </h1>
                    <p className="sub-text">
                        {subTitles[page]}
                    </p>
                </div>
                <p className="body">
                    <Info content={specialInfo[page]}/>
                    {
                        textRegen === "on" ? <Typewriter
                            options={{
                                delay: 50,
                            }}
                            onInit={(typewriter) => {
                                typewriter.typeString(body[page]).start().callFunction(() => setShowButton("true"));
                            }}
                        /> : ""
                    }
                </p>
            </div>
            <button data-motion={showButton}
                    className="next-button flex-justify"
                    onClick={() => {
                        setAnimateOut("true");
                        setTimeout(() => {
                            setPage(page+1);
                            setTextRegen("off");
                            setAnimateOut("false")
                            setTimeout(() => setTextRegen("on"),20);
                        }, 1000);
                    }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                     className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"/>
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

    return [primes[r1], primes[r2]];
}

const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
}


export default RSA;