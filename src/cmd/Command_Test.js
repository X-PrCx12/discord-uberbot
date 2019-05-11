const Command = require("./Command.js");

class TestCommand extends Command {
  constructor(chatService, queueService, discord, dbService) {
    super("test");
    super.help = "for testing - duh!";
    super.usage = "<prefix>test";
    super.alias = ["test"];
    this.chatService = chatService;
    this.queueService = queueService;
    this.discord = discord;
    this.dbService = dbService;
  }

  run(payload, msg) {
    if (typeof payload === "undefined" || payload.length === 0) {
      this.chatService.simpleNote(msg.channel, "falscher Syntax!", this.chatService.msgType.FAIL);
      this.chatService.simpleNote(msg.channel, `Usage: ${this.usage}`, this.chatService.msgType.INFO);
    }
    console.log("adding queue:");
    // Get queue
    const {queue} = this.queueService;
    let count = 0;
    queue.forEach((entry) => {
      count++;
      this.dbService.addSong(entry, payload).then(() => {
        console.log(`added ${entry.title} to Playlist ${payload}`);
      });
    });
    this.chatService.simpleNote(msg.channel, `added ${count} Songs to ${payload}`, this.chatService.msgType.INFO);
  }
}
module.exports = TestCommand;
