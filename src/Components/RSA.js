import './styles.css';
import Info from './Info';
import Typewriter from 'typewriter-effect';
import {useState, useEffect} from 'react';

const RSA = ({setOption,setChoice}) => {
    const [showButton, setShowButton] = useState("false");
    const [animateOut, setAnimateOut] = useState("wait");
    const [textRegen, setTextRegen] = useState("off");
    const [page, setPage] = useState(0);

    // RSA related data
    const [[a, b],_] = useState(generatePrimes(100, 1000)),
        n = a * b,
        phi = ((a - 1) * (b - 1)),
        s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        m = Array(5).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');

    let e = 2;
    while (e < phi) {
        if (gcd(e, phi) === 1) break;
        e++;
    }

    const d = multiplicativeInverse(e,phi),
          result = encrypt(e,n,m),
          c = result[0].join(''),
          mNum = result[1].join('');

    // Display related data
    const subTitles = ["Generation of Base Numbers","Generating the Encryption Key","Generating the Decryption Key","Testing" +
        " the keys"],
        specialInfo = [
            (<p>
            Usually, these prime numbers are really large,starting anywhere at <b>1024</b> bits to around <b>4096</b> bits, also it is made sure that they are distant, otherwise the decryption key is crackable. <br/> <br/> <b>φ(n)</b> represents the count of numbers which are smaller than n, and coprime with n.
            </p>),
            (<p>
                The previously generated values are, <br/>
                <span className="math"> p = {a}, &emsp; q = {b} </span><br/>
                The values of <b>p</b> and <b>q</b> are disposed of as soon as <b>n</b> & <b>φ(n)</b>, the only other way that remains to break the RSA algorithm is prime-factorization. If the numbers , p & q are too close, then they can be found in a few iterations and the keys can be generated. <br/>
                <span className="math"> n = {n}, &emsp; φ(n) = {phi} </span>
            </p>),
            (<p>
                The extended Euclidean algorithm is an extension to the Euclidean algorithm, and computes, in addition to the greatest common divisor (gcd) of integers a and b, also the coefficients of Bézout's identity, which are integers <b>x</b> and <b>y</b> such that <br/>
                 <span className="math"> ax + by = gcd(a,b) </span> <br/>
                This is a certifying algorithm, because the gcd is the only number that can simultaneously satisfy this equation and divide the inputs. It allows one to compute also, with almost no extra cost, the quotients of a and b by their greatest common divisor.
            </p>),
            (<p>
                As one of the first widely used public-key encryption schemes, RSA laid the foundations for much of our secure communications. It was traditionally used in TLS and was also the original algorithm used in PGP encryption. RSA is still seen in a range of web browsers, email, VPNs, chat and other communication channels.
            </p>)
        ],
        body = [
            `<div class="wrapper">
                <span class="normal">We begin by generating two random <b>prime</b> numbers, </span>
                <span class="math">p = ${a}  &emsp; &emsp; q = ${b}</span> 
                <span class="normal">Now we use these two numbers to calculate <b>n</b> and <b>φ(n)</b>, </span>
                <span class="math">n = p×q = ${a}×${b} <br/> &emsp; = ${n} <br/> φ = (p-1)×(q-1) = (${a}-1)×(${b}-1) <br/> &emsp; = ${phi} </span>
            </div>`,
            `<div class="wrapper">
              <span class="normal">The encryption key <b>e</b> must follow the following conditions, </span>
              <span class="math">1 < <b>e</b> < φ(n) <br/>gcd{e,n} = 1 <br/>gcd{e,φ(n)} = 1 </span> 
              <span class="normal">Following the aforementioned conditions, we calculate a value for <b>e</b>, </span> 
              <span class="math">e = ${e} ; Public Key(e,n) = (${e},${n})</span>
              <span class="normal">The newly calculated <b>e</b> & <b>n</b> will be used as a part of our public key and <b>e</b> will also be used to generate the private key.</span> 
            </div>`,
            `<div class="wrapper">
              <span class="normal">The decryption key <b>d</b> follows the condition, </span>
              <span class="math">(e × d)mod|φ(n)| = 1</span> 
              <span class="normal">We will use this condition to calculate <b>d</b>. Using the Extended Euclidean Algorithm, the value of <b>d</b> comes out to be </span> 
              <span class="math">d = ${d} ; Private Key(d,n) = (${d},${n})</span>
              <span class="normal">We can now use the encryption key <b>e</b> to encrypt our ciphertext and the decryption key <b>d</b> to decrypt it.</span> 
            </div>`,
            `<div class="wrapper">
                <span class="normal">For testing purposes, lets generate some generate some random message <b>m</b>, and convert it to numbers</span>
                <span class="math">m = ${m} <br/> &emsp; = ${mNum} </span> 
                <span class="normal">Encrypting <b>m</b> with the encryption key <b>e</b>, we get <b>c</b>, the cipher</span> 
                <span class="math">c = (m<sup><b>e</b></sup>)mod|n| <br/>&emsp; = (${mNum}<sup>${e}</sup>)mod|${n}| <br/>&emsp; = ${c}</span>
                <span class="normal">Now to decrypt the encrypted message using the decryption key <b>d</b>,</span> 
                <span class="math">c = (c<sup><b>d</b></sup>)mod|n| <br/>&emsp; = (${c}<sup>${d}</sup>)mod|${n}| <br/>&emsp; = ${mNum} <br/> &emsp; = ${m}</span>
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

const multiplicativeInverse = (e, phi) => {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi === 1) return 0;
    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
}

const encrypt = (key, n, plaintext) => {
    let ciphertext = [], numText = [];
    for (let i = 0; i < plaintext.length; i++) {
        let charCode = plaintext.charCodeAt(i);
        let encryptedCharCode = modPow(charCode, key, n);
        numText.push(charCode);
        ciphertext.push(encryptedCharCode);
    }
    return [ciphertext,numText];
}

const modPow = (base, exponent, modulus) => {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) result = (result * base) % modulus;
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

export default RSA;