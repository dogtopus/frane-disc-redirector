const GAME_DISC_PREFIX = ptr('0x6c9cfc');
const GAME_DISC_PREFIX_MAX_LEN = 100;

const FIND_GAME_DISC_SNIPPET_START = ptr('0x438e4b');
const FIND_GAME_DISC_SNIPPET_END = ptr('0x438e71');
const FIND_GAME_DISC_SNIPPET_SIZE = FIND_GAME_DISC_SNIPPET_END.sub(FIND_GAME_DISC_SNIPPET_START).toUInt32();

const EXE_NAME = 'frane.exe';

const exemodule = Process.enumerateModules()[0];

let new_game_disc_prefix = null;
if (exemodule.path.endsWith(`\\${EXE_NAME}`)) {
    new_game_disc_prefix = exemodule.path.slice(0, exemodule.path.length - EXE_NAME.length);
}

if (new_game_disc_prefix !== null && new_game_disc_prefix.length < GAME_DISC_PREFIX_MAX_LEN - 1) {
    console.log(`Setting game disc prefix to ${new_game_disc_prefix}`);
    Memory.patchCode(FIND_GAME_DISC_SNIPPET_START, FIND_GAME_DISC_SNIPPET_SIZE, code => {
        const writer = new X86Writer(code, {pc: FIND_GAME_DISC_SNIPPET_START});
        writer.putJmpAddress(FIND_GAME_DISC_SNIPPET_END);
        writer.flush();
    })
    GAME_DISC_PREFIX.writeAnsiString(new_game_disc_prefix);
} else {
    if (new_game_disc_prefix === null) {
        console.log('Game exe name mismatch. Refusing to patch.');
    } else {
        console.log('Game installation location does not fit within game disc prefix. Refusing to patch.');
    }
}
