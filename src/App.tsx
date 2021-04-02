import React, { useState } from 'react';
import { Form, Button, Container, FormControl } from 'react-bootstrap'
import './App.css';
import HDKey from 'hdkey'
import crypto from 'crypto'

function generateNewHdKey() {
  const randomSeed = crypto.randomBytes(64);
  const hdk = HDKey.fromMasterSeed(randomSeed);
  const complexKey = hdk.derive("m/3000'/0'");
  return complexKey.privateExtendedKey;
}

function App() {
  const [seed, setSeed] = useState(crypto.randomBytes(64));
  const [derive, setDerive] = useState('m');

  const hdKey = HDKey.fromMasterSeed(seed);

  let deriveError = false;
  const hdKeyDerived = (() => {
    try {
      return hdKey.derive(derive);
    } catch {
      deriveError = true;
      return hdKey;
    }
  })();

  console.log('ERROR', deriveError)
  return (
    <div className="App">
      <Container>
        <Form>
          <Button variant="primary" size="lg" block
            onClick={() => setSeed(crypto.randomBytes(64))}
            onChange={(e: any) => {
              setDerive(e.target.value);
            }}
          >
            Generate new seed
          </Button>

          <Container className="keys">
            <div>Seed</div>
            <FormControl value={seed.toString('hex')} onChange={(e: any) => setSeed(e.target.value)} />
            <div>Derivation (<a href="#" onClick={() => setDerive("m")}>Do not use derivation</a> | <a href="#" onClick={() => setDerive("m/3000'/0'")}>Use complex derivation</a>)</div>
            <FormControl value={derive} onChange={(e: any) => setDerive(e.target.value)} style={deriveError ? { border: 'solid 1px red'} : {}} />
            <div>Private Key</div>
            <p>{hdKeyDerived.privateExtendedKey}</p>
            <div>Public Key</div>
            <p>{hdKeyDerived.publicExtendedKey}</p>
          </Container>
        </Form>
      </Container>
    </div>
  );
}

export default App;
