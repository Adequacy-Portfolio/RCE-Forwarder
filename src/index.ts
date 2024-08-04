import { RCEManager, LogLevel, RCEEvent } from "rce.js";

(async () => {
  const rce = new RCEManager({
    authMethod: "file",
    file: "token.txt",
    logLevel: LogLevel.INFO,
    servers: [
      {
        identifier: "rce-aim-training",
        region: "US",
        serverId: 1473161,
        refreshPlayers: 1,
      },
    ],
  });

  await rce.init();

  rce.on(RCEEvent.MESSAGE, (payload) => {
    console.log(
      `Received from ${payload.server.identifier}: ${payload.message}`
    );
  });

  rce.on(RCEEvent.PLAYER_KILL, async (payload) => {
    await rce.sendCommand(
      payload.server.identifier,
      `say <color=red>${payload.killer.name}</color> killed <color=red>${payload.victim.name}</color>`
    );
  });

  rce.on(RCEEvent.PLAYER_SUICIDE, (payload) => {
    console.log(`${payload.ign} comitted suicide.`);
  });

  rce.on(RCEEvent.PLAYER_JOINED, (payload) => {
    console.log(
      `${payload.ign} [${payload.platform}] joined ${payload.server.identifier}`
    );
  });

  rce.on(RCEEvent.NOTE_EDIT, async (payload) => {
    await rce.sendCommand(
      payload.server.identifier,
      `say [<color=green>${payload.ign}</color>]: ${payload.newContent}`
    );
  });
})();
