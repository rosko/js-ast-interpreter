const { run } = require('../src/common/runner')

it('function declare and run', () => {
  const global = { console: { log: jest.fn() }}

  run(`
    function a() { console.log(1) }
    a();
  `, global)

  expect(global.console.log).toHaveBeenCalledTimes(1)
  expect(global.console.log).toBeCalledWith(1)
})

it('return value', () => {
  const global = { console: { log: jest.fn() }}

  run(`
    function a() { return 1 }
    console.log(a());
  `, global)

  expect(global.console.log).toHaveBeenCalledTimes(1)
  expect(global.console.log).toBeCalledWith(1)
})

it('return should break function', () => {
  const global = { console: { log: jest.fn() }}

  run(`
    function a() {
      return 1;
      console.log(2);
    }
    console.log(a());
  `, global)

  expect(global.console.log).toHaveBeenCalledTimes(1)
  expect(global.console.log).toBeCalledWith(1)
})

it('closure', () => {
  const global = { console: { log: jest.fn() }}

  run(`
    function a() {
      var name = 'Sam';
        return function() {
          return name;
        }
    }
    var b = a();
    console.log(b());
  `, global)

  expect(global.console.log).toHaveBeenCalledTimes(1)
  expect(global.console.log).toBeCalledWith('Sam')
})