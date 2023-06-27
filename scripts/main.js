import {
	MoveCommand,
	RepeatCommand,
	RunnerCommand,
	ExpressionsContainer,
	NumberBlock,
	OperatorBlock,
	VariableBlock,
	ShootCommand,
	WhileCommand,
	IfCommand,
	ElseCommand,
	ElseIfCommand,
	ReadBlock,
	RotateCommand,
	TakeGemCommand,
} from "./code-blocks/index.js";
import { initTranslations } from "./translations/translations.js";

runOnStartup(async (runtime) => {
	await loadScripts([
// 		"./lib/test.js",
		"./lib/mathjs@11.8.1.js",
		"./lib/i18next@23.1.0.js",
	]);

	await initTranslations();

	runtime.objects.StartCommand.setInstanceClass(RunnerCommand);
	runtime.objects.MoveCommand.setInstanceClass(MoveCommand);
	runtime.objects.RepeatCommand.setInstanceClass(RepeatCommand);
	runtime.objects.ExpressionsContainer.setInstanceClass(ExpressionsContainer);
	runtime.objects.NumberBlock.setInstanceClass(NumberBlock);
	runtime.objects.OperatorBlock.setInstanceClass(OperatorBlock);
	runtime.objects.VariableBlock.setInstanceClass(VariableBlock);
	runtime.objects.ShootCommand.setInstanceClass(ShootCommand);
	runtime.objects.WhileCommand.setInstanceClass(WhileCommand);
	runtime.objects.IfCommand.setInstanceClass(IfCommand);
	runtime.objects.ElseCommand.setInstanceClass(ElseCommand);
	runtime.objects.ElseIfCommand.setInstanceClass(ElseIfCommand);
	runtime.objects.ReadBlock.setInstanceClass(ReadBlock);
	runtime.objects.RotateCommand.setInstanceClass(RotateCommand);
	runtime.objects.TakeGemCommand.setInstanceClass(TakeGemCommand);
});

function loadScripts(scriptUrls) {
	const promises = [];

	scriptUrls.forEach((url) => {
		const script = document.createElement('script');
		script.src = url;
		script.async = true;

		const promise = new Promise((resolve, reject) => {
			script.onload = resolve;
			script.onerror = reject;
		});

		promises.push(promise);
		document.head.appendChild(script);
	});

	return Promise.all(promises);
}
