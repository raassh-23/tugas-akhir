import {
	MoveCommand,
	RepeatCommand,
	RunnerCommand,
	RepeatCommandCondition,
	NumberBlock,
	OperatorBlock,
	VariableBlock
} from "./code-blocks/index.js";

[
	"./lib/js/math.min.js",
	"./lib/js/bootstrap.bundle.min.js",
	"./lib/js/leaderboard.js",
].forEach((src) => {
	const script = document.createElement("script");
	script.src = src;
	document.head.appendChild(script);
});

// temporary workaround for 
// https://github.com/Scirra/Construct-bugs/issues/7022
[
	"./lib/css/bootstrap.min.css",
].forEach((href) => {
	const link = document.createElement("link");
	link.href = href;
	link.rel = "stylesheet";
	document.head.appendChild(link);
});

(() => {
	const root = document.documentElement;
	root.style.setProperty("--bs-body-bg", "#000000");
	root.style.setProperty("--bs-body-rgb", "0, 0, 0");
})();

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	// runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	
	runtime.objects.StartCommand.setInstanceClass(RunnerCommand);
	runtime.objects.MoveCommand.setInstanceClass(MoveCommand);
	runtime.objects.RepeatCommand.setInstanceClass(RepeatCommand);
	runtime.objects.RepeatCommandCondition.setInstanceClass(RepeatCommandCondition);
	runtime.objects.NumberBlock.setInstanceClass(NumberBlock);
	runtime.objects.OperatorBlock.setInstanceClass(OperatorBlock);
	runtime.objects.VariableBlock.setInstanceClass(VariableBlock);
});

// async function OnBeforeProjectStart(runtime)
// {
// 	// Code to run just before 'On start of layout' on
// 	// the first layout. Loading has finished and initial
// 	// instances are created and available to use here.
	
// 	runtime.addEventListener("tick", () => Tick(runtime));
	
// 	const layout = runtime.getLayout("LayoutName");
// 	layout.addEventListener("beforelayoutstart", () => {});
// 	layout.addEventListener("beforelayoutend", () => {});
	
// }

// function Tick(runtime)
// {
// // 	Code to run every tick
// }
