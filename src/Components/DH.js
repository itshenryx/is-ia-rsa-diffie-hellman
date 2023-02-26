import './styles.css';
import Info from './Info';
import Typewriter from 'typewriter-effect';
import {useState, useEffect} from 'react';

const DH = ({setOption,setChoice}) => {
    const [showButton, setShowButton] = useState("false");
    const [animateOut, setAnimateOut] = useState("wait");
    const [textRegen, setTextRegen] = useState("off");
    const [page, setPage] = useState(0);

    // DH related data
    const [n] = useState(generateRandomPrime(100, 1000)),
        [g] = useState(findPrimitive(n));

    const a = Math.floor(Math.random() * (n - 2) + 1);
    const b = Math.floor(Math.random() * (n - 2) + 1);
    const A = modExp(g, a, n);
    const B = modExp(g, b, n);
    const sA = modExp(B, a, n);
    const sB = modExp(A, b, n);


    // Display related data
    const subTitles = ["Generation of Private and Public variables","Calculation of Intermediate Keys","Exchange of" +
        " Intermediate Keys" ,"Generation of the secret key"],
        specialInfo = [
            (<p>
                In the Diffie-Hellman key exchange algorithm, G is supposed to be a <b>primitive root</b> of N. A primitive root of a prime number N is a number that generates all the numbers in the range <b> [1, N-1] </b> when raised to appropriate powers modulo N.
                <br/><br/>
                The reason why a primitive root is used in Diffie-Hellman is to ensure that the shared secret that is generated between the two parties is a uniformly distributed random number in the range [1, N-1]. If G is not a primitive root of N, then the shared secret may have a limited number of possible values, which could make it vulnerable to attacks.
            </p>),
            (<p>
                The values of N, a and b we have generated, <br/>
                <span className="math"> N = {n}, &emsp; a = {a}, &emsp; b = {b} </span><br/>
                Are very small. This code is for illustrative purposes only and is not secure for real-world use. In practice, a much larger prime number <b>(2048 bits)</b> and a more secure algorithm (for the generation of primes, the concept remains the same) would be used to generate the shared secret. We are using smaller numbers to explain the concept more properly.
            </p>),
            (<p>
                However, it is worth noting that there are some practical attacks on the Diffie-Hellman key exchange algorithm, such as the Logjam attack, which takes advantage of the fact that many implementations of Diffie-Hellman use a fixed group of parameters that can be precomputed and reused. To mitigate these attacks, it is important to use appropriate key sizes and to periodically update the group parameters.
            </p>),
            (<p>
                Even though Alice and Bob start with different secret exponents <b>a</b> and <b>b</b>, they end up with the same shared secret key <span className="math-inline-two"> (g<sup>ab</sup>)mod|P|</span> because modular exponentiation is a one-way function that preserves the properties of modular arithmetic.
            </p>)
        ],
        body = [
            `<div class="wrapper">
                <span class="normal">We begin by generating two public variables <b>G</b> and <b>N</b>. <b>N</b> is a large prime number and <b>G</b> is a primitive root of <b>N</b>,</span>
                <span class="math">N = ${n}  &emsp; &emsp; G = ${g}</span> 
                <span class="normal">These values will be shared by the two clients performing this handshake. <br/><br/> Say these two clients are people named <b>Alice</b> and <b>Bob</b>. Alice generates a random secret value <b>a</b> & and Bob generates a random secret value <b>b</b>, given that, </span>
                <span class="math"> 1 < a,b < N <br/> a = ${a} <br/> b = ${b} </span>
            </div>`,
            `<div class="wrapper">
              <span class="normal">Now Alice and Bob calculate intermediate keys that they will exchange publicly. Alice's intermediate key <b>A</b> would be,  </span>
              <span class="math">A = (g<sup>a</sup>)mod|N| <br/> &emsp; = (${g}<sup>${a}</sup>)mod|${n}| <br/> &emsp; = ${A}</span>
              <span class="normal">This key is now sent to Bob over a public (unsecured) channel. <br/> Similarly, Bob also generates his intermediate key <b>B</b> and sends it to Alice over the same channel, </span>
              <span class="math">B = (g<sup>b</sup>)mod|N| <br/> &emsp; = (${g}<sup>${b}</sup>)mod|${n}| <br/> &emsp; = ${B}</span>
            </div>`,
            `<div class="wrapper">
              <span class="normal">The security of the Diffie-Hellman key exchange algorithm relies on the difficulty of computing the <b>discrete logarithm problem</b>, which is the problem of finding a and b given <span class="math-inline">(g<sup>a</sup>)mod|N| </span>and <span class="math-inline">(g<sup>b</sup>)mod|n|</span> respectively. <br/><br/>

                While it may seem like sharing <span class="math-inline">(g<sup>a</sup>)mod|N|</span> and <span class="math-inline">(g<sup>b</sup>)mod|N|</span> could be a vulnerability, it is not because computing the discrete logarithm problem is believed to be a hard problem. Specifically, there is no known efficient algorithm for solving the discrete logarithm problem on a classical computer, and even on a quantum computer, the best known algorithm (Shor's algorithm) only provides an exponential speedup compared to classical algorithms. <br/><br/>

                Thus, even though the values <span class="math-inline">(g<sup>a</sup>)mod|N|</span> and <span class="math-inline">(g<sup>b</sup>)mod|N|</span> are shared over an unsecured channel, an attacker cannot use this information to compute the secret exponents a and b without solving the discrete logarithm problem, which is believed to be computationally infeasible for sufficiently large prime numbers.</span>
            </div>`,
            `<div class="wrapper">
                <span class="normal">Finally, Alice and Bob generate the secret key on their end.<br/>On Alice's end, </span>
                <span class="math">s = (g<sup>b)<sup>a</sup></sup>mod|N|<br/> &emsp; = ${B}<sup>${a}</sup>mod|${n}| <br/> &emsp; = ${sA}</span>
                <span class="normal">On Bob's end,</span>
                <span class="math">s = (g<sup>a)<sup>b</sup></sup>mod|N|<br/> &emsp; = ${A}<sup>${b}</sup>mod|${n}| <br/> &emsp; = ${sB}</span>
                <span class="normal">As we can see, both Alice and Bob have generated the same key that they can now use to commuincate securely. Furthermore, <b>a</b> & <b>b</b> are discarded of as soon as the key is generated.</span>
            </div>`
        ]

    useEffect(() => {
        setTimeout(() => {setAnimateOut("false"); setTextRegen("on")}, 1500);
    }, []);

    return (
        <div className="rsa" data-motion={page}>
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
                                delay: 40,
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
                        if (page === 3) {
                            setPage(page+1);
                            setAnimateOut("true");
                            setShowButton("false");
                            setTimeout(()=>{
                                setOption("animate-in");
                                setChoice(0);
                            },1500);
                            return;
                        }
                        setAnimateOut("true");
                        setShowButton("false");
                        setTimeout(() => {
                            setPage(page+1);
                            setTextRegen("off");
                            setAnimateOut("false");
                            setTimeout(() => setTextRegen("on"),20);
                        }, 900);
                    }}>
                {page === 3 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                         className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"/>
                    </svg>
                )}
            </button>
        </div>
    );
}

const generateRandomPrime = (min, max) => {
    let prime;
    while (!prime || !isPrime(prime)) {
        prime = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return prime;
}

const isPrime = (n) => {
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }

    return true;
}

const modExp = (base, exponent, modulus) => {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 == 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

function power(x, y, p) {
    let res = 1;
    x = x % p;

    while (y > 0) {
        if (y & 1)
            res = (res * x) % p;

        y = y >> 1;
        x = (x * x) % p;
    }
    return res;
}

const findPrimefactors = (s, n) => {
    while (n % 2 === 0) {
        s.add(2);
        n = n / 2;
    }

    for (let i = 3; i <= Math.sqrt(n); i = i + 2) {
        while (n % i === 0) {
            s.add(i);
            n = n / i;
        }
    }

    if (n > 2)
        s.add(n);
}

const findPrimitive = (n) => {
    let s = new Set();
    let phi = n - 1;

    findPrimefactors(s, phi);

    for (let r = 2; r <= phi; r++) {
        let flag = false;
        for (let it of s) {
            if (power(r, phi / it, n) === 1) {
                flag = true;
                break;
            }
        }
        if (flag === false)
            return r;
    }
    return -1;
}

export default DH;
