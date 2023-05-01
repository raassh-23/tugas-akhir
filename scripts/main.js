import {
	MoveCommand,
	RepeatCommand,
	RunnerCommand,
	RepeatCommandCondition,
	NumberBlock,
	OperatorBlock,
} from "./code-blocks/index.js";

const script = document.createElement("script");
script.src = "./lib/math.min.js";
document.head.appendChild(script);

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
// 	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	
	runtime.objects.StartCommand.setInstanceClass(RunnerCommand);
	runtime.objects.MoveCommand.setInstanceClass(MoveCommand);
	runtime.objects.RepeatCommand.setInstanceClass(RepeatCommand);
	runtime.objects.RepeatCommandCondition.setInstanceClass(RepeatCommandCondition);
	runtime.objects.NumberBlock.setInstanceClass(NumberBlock);
	runtime.objects.OperatorBlock.setInstanceClass(OperatorBlock);
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
