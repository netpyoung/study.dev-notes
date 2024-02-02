Best Practice

Realistic amounts of UI memory used for a game may fall in the following ranges:
o Simple game HUD overlay: 400K?1.5M
o Startup/Menu screen with animations and several screens: 800K?4M
o Simple game fully in ActionScript with assets (Pacman): 700K?1.5M
o Prolonged vector animation with constantly changing assets: 2M?10M+





Gradient fills can increase the number of DPs if several of them are used in a shape at the same time.
Strokes are more expensive than fills, unless all strokes are the same solid color.

If it is necessary to hide a movie clip then use _visible=false rather than _alpha=0.
Graphics render fastest when their _alpha is set to 100.

Use PNGs if bitmap transparency is required and try to reduce the total surface area drawn.


onEnterFrame : 매 프래임마다
setInterval : 상수시간마다


The most efficient animations are translation and rotation. It is best to avoid scaling animations



Turn off the border and background of a text field if possible, since this will save one draw primitive.


-- gfxexport ----------------------------------
Create a master gradient.swf file containing only gradient textures and import it into other SWF files as needed. Use the gfxexport tool to export the gradients.swf using the -d0 switch. This switch disables compression, and will apply to all textures in that SWF file. It will ensure that all textures in this file, which make use of gradients, are free of banding.

Use gfxexport’s option -qp or -qh to get highest quality DDS texture (Note that these options may take a long time to process the bitmap images).

Use gfxexport with options ?fc, -fcl, -fcm to compact fonts in order to save memory on glyph shapes (especially, if Asian fonts are embedded).



-- actionscript ----------------------------------

Avoid using on() or onClipEvent() event handlers. Use onEnterFrame, onPress, etc instead


Grouping multiple invokes into one call is usually several times faster than calling them for each individual object. -- GFxMovie::SetVariableArray


Remove trace() statements from the code when publishing the final SWF file.

To save memory, explicitly delete any custom classes in unloaded SWF files.


Do not use with statements inside functions. This operator turns off optimizations.


변수이름 앞에는 var를 꼭붙여라(최적화를 해줌)

setInterval // clearInterval
-------------------------------------------------------------
To address this limitation (and for supporting multiple mouse cursors) GFx extends these method calls by allowing them to take extra arguments when _global.gfxExtensions variable is set to true. The new function signatures are as follows:
onMouseDown = function(button : Number, [targetPath : String], 
	[mouseIdx : Number], [x : Number], [y : Number], [dblClick : Boolean]) { }
onMouseUp = function(button : Number, [targetPath : String],
	[mouseIdx : Number], [x : Number], [y : Number]) { }