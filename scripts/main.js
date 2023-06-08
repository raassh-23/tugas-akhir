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
} from "./code-blocks/index.js";

[
	"./lib/math.min.js",
].forEach((src) => {
	const script = document.createElement("script");
	script.src = src;
	document.head.appendChild(script);
});

runOnStartup(async (runtime) =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	// runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	
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
