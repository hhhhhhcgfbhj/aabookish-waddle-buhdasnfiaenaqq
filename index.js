const { exec } = require('child_process');

module.exports = {
  slashCommands: [
    {
      name: "cmd",
      params: [
        {
          name: "command",
          type: "string",
          required: true
        }
      ],
      async handler({ params, sendMessage }) {
        const command = params.command?.trim();
        if (!command) return sendMessage("Empty command");
        sendMessage(`Running: ${command}`);
        try {
          const { stdout, stderr } = await exec(command, { timeout: 60000 });
          const output = (stdout + stderr).slice(0, 4000);
          sendMessage(`Output:\n\`\`\`\n${output || "(empty)"}\n\`\`\``);
        } catch (e) {
          sendMessage(`Error: ${e.message}`);
        }
      }
    }
  ]
};
