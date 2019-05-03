const Command = require("./Command.js");

class DeletePLCommand extends Command {
  constructor(chatService, dBService) {
    super("pldelete");
    super.help = "delets a playlist permanently.";
    super.usage = "<prefix>pldelete <pl name>";
    super.alias = ["pldelete"];
    this.chatService = chatService;
    this.dBService = dBService;
  }

  run(payload, msg) {
    if (typeof payload === "undefined" || payload.length === 0) {
      this.chatService.simpleNote(msg.channel, "No playlist name found!", this.chatService.msgType.FAIL);
      this.chatService.simpleNote(msg.channel, `Usage: ${this.usage}`, this.chatService.msgType.INFO);
      return;
    }
    const plName = payload.trim();
    const note = `playlist deleted: ${plName}`;
    this.dBService.deletePlaylist(plName).
      then(() => this.chatService.simpleNote(msg.channel, note, this.chatService.msgType.MUSIC)).
      catch((error) => this.chatService.simpleNote(msg.channel, error, this.chatService.msgType.FAIL));
  }
}

module.exports = DeletePLCommand;
