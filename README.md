# frane-disc-redirector

Autonomous Frida agent for the game Frane: Lost memory of Angel, that disables game disc check and redirects access of game disc assets to the same location where the game executable is installed into.

Project structure is based on [frida-agent-example](https://github.com/oleavr/frida-agent-example).

### How to compile & load

```sh
$ git clone https://github.com/dogtopus/frane-disc-redirector.git
$ cd frane-disc-redirector/
$ npm install
$ frida -R -f 'C:\Program Files (x86)\exec\frane\frane.exe' -l _agent.js
```

Alternatively `_agent.js` can be installed along with `frida-gadget.config`, [frida-gadget](https://frida.re/docs/gadget/) (32-bit Windows version, install as `frida-gadget.dll`), and a standalone DLL injector like Microsoft Detours `withdll` to achieve an autonomous, inject-only setup.

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.
