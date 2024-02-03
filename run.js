
const input = {
  data: [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" }
  ]
};

const output = {
  data: []
};

output.data.push(input.data.shift());

console.log(output);


