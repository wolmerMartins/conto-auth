const resolve = require('@rollup/plugin-node-resolve')
const svelte = require('rollup-plugin-svelte')

function serve() {
  let server

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return

      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        }
      )

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    }
  }
}

module.exports = {
  input: 'src/main.js',
  output: {
    file: 'public/build/bundle.js',
    format: 'iife',
    name: 'app'
  },
  plugins: [
    svelte({
      include: 'src/**/*.svelte'
    }),
    resolve({ browser: true }),
    serve()
  ]
}
