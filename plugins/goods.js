module.exports = {
  register: require('good'),
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      typeConsole: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  }
};