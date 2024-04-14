import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import childProcess from 'child_process'
import css from 'rollup-plugin-css-only'
import svelte from 'rollup-plugin-svelte'
import autoPreprocess from 'svelte-preprocess'

function serve() {
  let server: childProcess.ChildProcessByStdio<null, null, null>

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return

      server = childProcess.spawn(
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

export default {
  input: 'src/main.ts',
  output: {
    file: 'public/build/bundle.js',
    format: 'iife',
    name: 'app'
  },
  plugins: [
    svelte({
      include: 'src/**/*.svelte',
      preprocess: autoPreprocess(),
      emitCss: true
    }),
    css({ output: 'bundle.css' }),
    typescript(),
    resolve({ browser: true }),
    serve()
  ]
}
