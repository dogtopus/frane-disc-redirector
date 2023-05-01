# frane-disc-redirector

Autonomous Frida agent for the original physical release of the game Frane: Lost memory of Angel, that disables game disc check and redirects access of game disc assets to the same location where the game executable is installed into.

May or may not work on DigiCube version but from what I heard it has a different executable so probably won't.

Likely doesn't work on (either free or paid) official digital releases, and doing that won't make sense anyway.

Project structure is based on [frida-agent-example](https://github.com/oleavr/frida-agent-example).

### How to compile & load

```sh
$ git clone https://github.com/dogtopus/frane-disc-redirector.git
$ cd frane-disc-redirector/
$ npm install
$ frida -R -f 'C:\Program Files (x86)\exec\frane\frane.exe' -l _agent.js
```

Alternatively `_agent.js` can be installed along with `frida-gadget.config`, [frida-gadget](https://frida.re/docs/gadget/) (32-bit Windows version, install as `frida-gadget.dll`), and a standalone DLL injector like Microsoft Detours `withdll` to achieve an autonomous, inject-only setup.

#### Copy over on-disc game assets

The general rule of thumb is to copy all the directories located at the root of the disc, except those that are installer (`FRANE_*`) or DirectX related, to the installed location of the game.

If you did a minimum install, you need to copy over all the `.mpg` and `.wav` files located at the root of the disc as well.

This can be done by the following on Steam Deck or any other Wine-based environments (assuming running under a 64-bit Wine prefix with WoW64):

```sh
cp -r "/run/media/${USER}/FRANE/"{bmp,chr,map,mapsel,ms_box,scr,status,tscr,voice} '/path/to/wine/prefix/drive_c/Program Files (x86)/exec/frane/'
```

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.
