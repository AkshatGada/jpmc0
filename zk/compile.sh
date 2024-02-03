circom logistic.circom --r1cs --wasm --sym --c
node logistic_js/generate_witness.js logistic_js/logistic.wasm input.json logistic_js/witness.wtns
snarkjs groth16 setup logistic.r1cs ptau/powersOfTau28_hez_final_14.ptau logistic_0000.zkey
snarkjs zkey contribute logistic_0000.zkey logistic_final.zkey --name="1st Contributor Name" -v -e="some random text"
snarkjs zkey export verificationkey logistic_final.zkey verification_key.json
snarkjs groth16 prove logistic_final.zkey logistic_js/witness.wtns proof.json public.json
snarkjs groth16 verify verification_key.json public.json proof.json


//groth16 prove 
node logistic_js/generate_witness.js logistic_js/logistic.wasm input.json logistic_js/witness.wtns
snarkjs groth16 prove logistic_final.zkey logistic_js/witness.wtns proof.json public.json
