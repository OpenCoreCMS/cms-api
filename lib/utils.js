function makeStringUrlFriendly(input) {
  const cleanUrlString = input.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return cleanUrlString;
}

module.exports = {
  makeStringUrlFriendly,
};
