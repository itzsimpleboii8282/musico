const { Listener } = require('discord-akairo');
const { stripIndents } = require('common-tags');
const Logger = require('../../util/logger');

class CommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			event: 'commandStarted',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	async exec(message, command) {
		const tag = message.guild ? `${message.guild.name}/${message.author.tag}` : `${message.author.tag}`;
		Logger.log(`${command.id}`, { tag });

		const embed = this.client.util.embed()
			.setColor('GREEN')
			.setTitle(`Command used - ${command.id}`)
			.setDescription(stripIndents`
			\`\`\`js
			COMMAND: ${command.id}

			USER: ${message.author.tag} (${message.author.id})

			CHANNEL: ${message.channel.name} (${message.channel.id})
			
			GUILD: ${message.guild.name} (${message.guild.id})
			\`\`\``)
			.setTimestamp();
		return this.client.channels.cache.get('736088895128600598').send({ embed });
	}
}

module.exports = CommandStartedListener;
