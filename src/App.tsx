import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap'
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
  const [currentHdkey, setHdkey] = useState<any>(generateNewHdKey());

  const currentPublicKey = HDKey.fromExtendedKey(currentHdkey).publicExtendedKey;

  return (
    <div className="App">
      <Container>
        <Form>
          <Button variant="primary" size="lg" block onClick={() => {
            setHdkey(generateNewHdKey())
          }}>
            Generate new pair
          </Button>

          <Container className="keys">
            <div>Private Key</div>
            <p>{currentHdkey}</p>
            <div>Public Key</div>
            <p>{currentPublicKey}</p>
          </Container>
        </Form>
      </Container>
    </div>
  );
}

export default App;
