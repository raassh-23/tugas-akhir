import {
	MoveCommand,
	ForCommand,
	RunnerCommand,
	ShootCommand,
	WhileCommand,
	IfCommand,
	ElseCommand,
	ElseIfCommand,
	RotateCommand,
	TakeGemCommand,
	ExpressionsContainer,
	NumberExpression,
    OperatorExpression,
    VariableExpression,
    ReadExpression,
} from "./code-blocks/index.js";
import { initTranslations } from "./translations/translations.js";

runOnStartup(async (runtime) => {
	await loadScripts([
		"./lib/mathjs@11.8.1.js",
		"./lib/i18nextBrowserLanguageDetector@7.1.0.js",
		"./lib/i18next@23.1.0.js",
	]);

	await initTranslations();

	runtime.objects.StartCommand.setInstanceClass(RunnerCommand);
	runtime.objects.MoveCommand.setInstanceClass(MoveCommand);
	runtime.objects.ForCommand.setInstanceClass(ForCommand);
	runtime.objects.ShootCommand.setInstanceClass(ShootCommand);
	runtime.objects.WhileCommand.setInstanceClass(WhileCommand);
	runtime.objects.IfCommand.setInstanceClass(IfCommand);
	runtime.objects.ElseCommand.setInstanceClass(ElseCommand);
	runtime.objects.ElseIfCommand.setInstanceClass(ElseIfCommand);
	runtime.objects.RotateCommand.setInstanceClass(RotateCommand);
	runtime.objects.TakeGemCommand.setInstanceClass(TakeGemCommand);
	runtime.objects.ExpressionsContainer.setInstanceClass(ExpressionsContainer);
	runtime.objects.NumberExpression.setInstanceClass(NumberExpression);
	runtime.objects.OperatorExpression.setInstanceClass(OperatorExpression);
	runtime.objects.VariableExpression.setInstanceClass(VariableExpression);
	runtime.objects.ReadExpression.setInstanceClass(ReadExpression);
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
