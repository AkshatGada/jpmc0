const { groth16 } = require('snarkjs');
const { readFileSync } = require('fs');

const vkey = JSON.parse(readFileSync('verification_key.json', 'utf-8'));
const proof = JSON.parse(readFileSync('proof.json', 'utf-8'));

const public1 = require('./public.json'); // Using require to import JSON

const res = groth16.verify(vkey, public1, proof);

if (res) {
  console.log('Proof is valid!');
} else {
  console.log('Proof is NOT valid.');
}
