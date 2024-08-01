const DIRECTIONS = [
  ["D", "U"],
  ["L", "R"],
  ["F", "B"],
];
const TIMES = ["", "'", "2"];

const random = (array, exclude) => {
  do {
    var n = Math.floor(Math.random() * array.length);
  } while (array[n] === exclude);
  return array[n];
};

export default function ScrambleGenerator() {
  const scramble = new Array(20);
  var direction;
  for (var i = 0; i < scramble.length; i++) {
    direction = random(DIRECTIONS, direction);
    scramble[i] = random(direction) + random(TIMES);
  }
  return scramble.join(" ");
}
