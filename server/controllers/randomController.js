// @flow
const axios = require('axios');

const formatColors = colors => {
  return colors.map(color => `#${color}`);
};

const fetchRandomPalette = () =>
  axios.get('/random').then(response => {
    const colors = response.data[0].colors;

    // Continue calling API until palette that's 5 colors long (which is most of
    // them) returns. This is because the API doesn't allow you to search by
    // palette length and doesn't standardize this on their platform.
    if (colors.length < 5) return fetchRandomPalette();

    return colors;
  });

exports.getRandom = (req, res, next) => {
  fetchRandomPalette()
    .then(formatColors)
    .then(colors => res.json(colors))
    .catch(() => {
      res.status(500)
      res.send('Error fetching random palette');
    });
};
