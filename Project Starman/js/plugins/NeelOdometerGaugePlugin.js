//=============================================================================
// Neel's Odometer Gauge Plugin
// NeelOdometerGaugePlugin.js
// version 1.4.0
//=============================================================================
/*:
 * @target MZ
 * @author Neel (mythbuilder)
 * @plugindesc v1.4.0 - Changes HP, MP and TP Gauges in Party Status Window to Odometers
 * @url https://mythatelier.itch.io/odometer-gauge-mv
 *
 * @param Game Settings
 *
 * @param usingRolling
 * @parent Game Settings
 * @text Rolling HP for Actors?
 * @desc Set whether Rolling HP is used for Actors. Toggle with the Plugin Commands: EnableActorRoll, DisableActorRoll.
 * @type boolean
 * @default true
 *
 * @command setRollingActor
 * @text Rolling HP for Actors?
 * @desc Set whether RollingHP is used for Actors. Toggle with the Plugin Commands: EnableActorRoll, DisableActorRoll.
 *
 *   @arg enabled
 *   @type boolean
 *   @default true
 *   @desc If ON, will enable Rolling HP. If OFF, will revert to RPG Maker Default.
 *
 * @param usingEnemy
 * @parent Game Settings
 * @text Rolling HP for Enemies?
 * @desc Set whether Rolling HP is used for Enemies. Toggle with the Plugin Commands: EnableEnemyRoll, DisableEnemyRoll.
 * @type boolean
 * @default false
 *
 * @command setRollingEnemy
 * @text Rolling HP for Enemies?
 * @desc Set whether RollingHP is used for Enemies. Toggle with the Plugin Commands: EnableEnemyRoll, DisableEnemyRoll.
 *
 *   @arg enabled
 *   @type boolean
 *   @default false
 *   @desc If ON, will enable Rolling HP. If OFF, will revert to RPG Maker Default.
 *
 * @param usingActorOdoBattle
 * @parent Game Settings
 * @text Actor Gauges in Battle?
 * @desc Set if Odometer Gauges are shown in battle menus. Toggle with Plugin Commands: ShowOdoBattle, HideOdoBattle
 * @type boolean
 * @default true
 *
 * @command setActorOdoBattle
 * @text Actor Gauges in Battle?
 * @desc Determines if Actor Odometer Gauges are shown in battle menus.
 *
 *   @arg enabled
 *   @type boolean
 *   @default true
 *   @desc If ON, battles will show Odometer Gauges for Actors. If OFF, battles will not show them.
 *
 * @param usingEnemyOdoBattle
 * @parent Game Settings
 * @text Enemy Gauges in Battle?
 * @desc Set if Odometer Gauges are shown in battle. Toggle with Plugin Commands: ShowEnemyOdo, HideEnemyOdo
 * @type boolean
 * @default true
 *
 * @command setEnemyOdoBattle
 * @text Enemy Gauges in Battle?
 * @desc Determines if Enemy Odometer Gauges are shown in battle.
 *
 *   @arg enabled
 *   @type boolean
 *   @default true
 *   @desc If ON, battles will show Odometer Gauges for Enemies. If OFF, battles will not show them.
 *
 * @param usingOdoMenu
 * @parent Game Settings
 * @text Actor Gauges in Menus?
 * @desc Set if Odometer Gauges are shown in menus out of battle. Toggle with Plugin Commands: ShowOdoMenu, HideOdoMenu
 * @type boolean
 * @default true
 *
 * @command setOdometerMenuActive
 * @text Actor Gauges in Menu?
 * @desc Determines if Odometer Gauges are shown in menus out of battle.
 *
 *   @arg enabled
 *   @type boolean
 *   @default true
 *   @desc If ON, menus out of battle will show Odometer Gauges. If OFF, menus will not show them.
 *
 * @param showTPGaugeInMenu
 * @parent Game Settings
 * @text Actor TP Gauge in Menu?
 * @desc Set specifically if TP Gauge ON/OFF in Menu. If using YEP Core, will use its Menu TP Bar setting instead.
 * @type boolean
 * @default false
 *
 * @param Roll Settings
 *
 * @param baseRollSpeed
 * @parent Roll Settings
 * @text Base Roll Speed
 * @desc Base Speed that HP rolls at before Guts Factor is applied. Must be between 1 (slow) and 10 (fast). Default: 5
 * @type number
 * @min 1
 * @max 10
 * @default 5
 *
 * @param gutsFactor
 * @parent Roll Settings
 * @text Guts Factor Formula
 * @default Math.min(Math.max(10 - 3 * Math.log10(user.luk * 5),0.1),5)
 * @desc Guts Factor multiplied to Base Roll Speed when damaged. Higher this value is the slower damage is taken.
 *
 * @param healFactor
 * @parent Roll Settings
 * @text Heal Factor Formula
 * @default Math.min(Math.max(Math.pow(2,(0.008 * user.mdf)),1),5)
 * @desc Heal Factor multiplied to Base Roll Speed when healing. Higher this value is the faster healing is done.
 *
 * @param Gauge Visuals
 * 
 * @param defaultBitmap
 * @text Default
 * @parent Gauge Visuals
 * @desc Bitmap for Odometer when no other has been specified.
 * @type file
 * @dir img/system
 * @require 1
 * 
 * @param hpBitmap
 * @text HP Gauge
 * @parent Gauge Visuals
 * @desc Bitmap for HP Odometer.
 * @type file
 * @dir img/system
 * @require 1
 *
 * @param mpBitmap
 * @text MP Gauge
 * @parent Gauge Visuals
 * @desc Bitmap for MP Odometer.
 * @type file
 * @dir img/system
 * @require 1
 * 
 * @param tpBitmap
 * @text TP Gauge
 * @parent Gauge Visuals
 * @desc Bitmap for TP Odometer.
 * @type file
 * @dir img/system
 * @require 1
 *
 * @param UI Config
 *
 * @param battleXOffset
 * @text Battle X Offset
 * @parent UI Config
 * @desc X Offset to Odometers in Battle Menus (positive shifts right, negative shifts left)
 * @type text
 * @default 0
 *
 * @param battleYOffset
 * @text Battle Y Offset
 * @parent UI Config
 * @desc Y Offset to Odometers in Battle Menus (positive shifts down, negative shifts up)
 * @type text
 * @default 0
 *
 * @param battleXScale
 * @text Battle X Scale
 * @parent UI Config
 * @desc X Scale to Odometers in Battle Menus
 * @type number
 * @default 1.0
 * @decimals 2
 *
 * @param battleYScale
 * @text Battle Y Scale
 * @parent UI Config
 * @desc Y Offset to Odometers in Battle Menus
 * @type number
 * @default 1.0
 * @decimals 2
 *
 * @param menuXOffset
 * @text Menu X Offset
 * @parent UI Config
 * @desc X Offset to Odometers in Menus (positive shifts right, negative shifts left)
 * @type text
 * @default 0
 *
 * @param menuYOffset
 * @text Menu Y Offset
 * @parent UI Config
 * @desc Y Offset to Odometers in Menus (positive shifts down, negative shifts up)
 * @type text
 * @default 0
 *
 * @param menuXScale
 * @text Menu X Scale
 * @parent UI Config
 * @desc X Scale to Odometer Digits in Menus
 * @type number
 * @default 0.8
 * @decimals 2
 *
 * @param menuYScale
 * @text Menu Y Scale
 * @parent UI Config
 * @desc Y Scale to Odometer Digits in Menus
 * @type number
 * @default 0.8
 * @decimals 2
 *
 * @param enemyXOffset
 * @text Enemy X Offset
 * @parent UI Config
 * @desc X Offset to Enemy Odometers in Battle (positive shifts right, negative shifts left)
 * @type text
 * @default 0
 *
 * @param enemyYOffset
 * @text Enemy Y Offset
 * @parent UI Config
 * @desc Y Offset to Enemy Odometers in Battle (positive shifts down, negative shifts up)
 * @type text
 * @default 0
 *
 * @param enemyXScale
 * @text Enemy X Scale
 * @parent UI Config
 * @desc X Scale to Enemy Odometer Digits in Battle
 * @type number
 * @default 1.0
 * @decimals 2
 *
 * @param enemyYScale
 * @text Enemy Y Scale
 * @parent UI Config
 * @desc Y Scale to Enemy Odometer Digits in Battle
 * @type number
 * @default 1.0
 * @decimals 2
 *
 * @param Mortal Alert
 * 
 * @param usingMortal
 * @text Enable Mortal Alert 
 * @desc Enables use of the Mortal Alerts which gives a warning when an Actor has taken mortal DMG.
 * @parent Mortal Alert
 * @type boolean
 * @default false
 *
 * @param mortWarnSE
 * @text Mortal Warn SE
 * @desc Name of SE that plays as warning when a character has taken mortal DMG.
 * @parent Mortal Alert
 * @type text
 * @default Bell1
 * 
 * @param mortWarnMsg
 * @text Mortal Warn MSG
 * @desc Battle Log message when a character has taken has taken mortal DMG (%1 - Target, %2 - Subject/Caster)
 * @parent Mortal Alert
 * @type text
 * @default %2 deals a mortal blow to %1!
 *
 * @param mortSafeMsg
 * @text Mortal Safe MSG
 * @desc Battle Log message when a character is no longer in threat of KO (%1 - Actor)
 * @parent Mortal Alert
 * @type text
 * @default %1 is no longer on the brink...
 * 
 *
 * @help
 * 
 * =============================================================================
 *                                   Overview
 * =============================================================================
 * Odometer Gauge is a plugin that helps achieve a Mother/Earthbound-like system
 * where your party member's HP is represented via an Odometer. If Rolling HP is
 * enabled, then Damage & Healing are applied to an Actor on a slight delay as 
 * the Reel rolls up or down allowing enemeis to interrupt healing or players
 * to intervene before a blow is lethal.
 *
 * Every Actor has their own internal Roll Timer which starts at 0. Every frame,
 * a Delta Value is added to that Timer. Once the Roll Timer hits 200, their HP
 * will go up or down by 1 and the Timer will reset to 0. This will repeat until
 * the Actor reaches their final target HP which can change while rolling.
 *
 * For every Actor, the Delta Value is calculated using the following:
 *
 *           Delta Value = [Base Rolling Speed] x [Guts/Heal Factor]
 *
 * [Base Rolling Speed] is the "global" amount that is added to every Actor's 
 * Roll Timer. It can range from 1 (very slow) - 10 (very fast). Think of this 
 * as a sort of "speed" setting for your Battle System. You can set the Base 
 * Rolling Speed via both plugin parameters and script calls.
 *
 * If the Actor has been damaged, then their [Guts Factor] is multiplied to the 
 * Base Rolling Speed. By default, if their Guts Factor is high, it will slow 
 * down an Actor's Roll Timer giving more time before they KO.
 *
 * If the Actor has been healed, then their Heal Factor is multiplied to the 
 * Base Rolling Speed. By default, if their Heal Factor is high, it will speed 
 * up an Actor's Roll Timer so they recover HP faster.
 *
 * By default, Guts Factor is tied to LUK and Heal Factor is tried to MDF. But
 * these can be easily changed to any other parameter or combination of 
 * parameters of the Actor by changing the Formula used to calculate these.
 *
 * HP, MP and TP all have their own Odometer Gauges. These can be customized by 
 * changing the images for them found in the img/system folder. MP & TP Gauges 
 * are only visually the same, they can't mecahnically be interrupted like HP.
 *
 * When an Actor is dealt enough Damage to where their final HP falls to 0, a
 * Mortal Alert warning will play to indicate which Actor is in threat. The
 * SFX and Battle Log Message for this can be set in the plugin parameters.
 *
 * ============================================================================
 *                                Plugin Commands
 * ============================================================================
 *
 * EnableActorRoll - Turns ON Rolling HP for Actors (HP damage/healing applied gradually)
 * DisableActorRoll - Turns OFF Rolling HP for Actors (HP damage/healing applied instantly)
 *
 * EnableEnemyRoll - Turns ON Rolling HP for Enemies (HP damage/healing applied gradually)
 * DisableEnemyRoll - Turns OFF Rolling HP for Enemies (HP damage/healing applied instantly)
 *
 * ShowOdoBattle - Shows Actor Odometer Gauge for Menus in Battle
 * HideOdoBattle - Hides Actor Odometer Gauge for Menus in Battle
 *
 * ShowOdoMenu - Shows Actor Odometer Gauge for Menus outside Battles
 * HideOdoMenu - Hides Actor Odometer Gauge for Menus outside Battle
 *
 * ShowAllEnemyOdo - Shows all Enemy Odometer Gauges (while in Battle)
 * HideAllEnemyOdo - Hide all Enemy Odometer Gauges (while in Battle)
 *
 * =============================================================================
 *                                 Script Calls
 * =============================================================================
 *
 *    Neel.ODO.setRollSpeed(X)
 * Set the speed of HP Odometer Reels. X must be between 1 and 10.
 *
 *    Neel.ODO.showEnemyOdo(true/false, index)
 * Hides/Shows the Odometer Gauge of a Enemy at a specific index in the Troop.
 *
 * =============================================================================
 *                                Version History
 * =============================================================================
 *
 * v1.4.0 - Improved compatibility for YEP Core Engine
 *        - Added compatibility for YEP Battle Engine Core
 *        - Added compatibility for YEP Battle Status Window
 *        - Added compatibility for SRD Battle Status Customizer
 *        - Fixed Healing Roll Stutter and Healing Damage Formula Bug
 *        - Restored Enemy Rolling HP Plugin Params and Script Calls
 *        - Added Enemy Visual Odometer Gauge Feature + Plugin Commands
 *        - Fixed one of the issues causing Mortal Damage Menu Crash Bug
 *        - Improved dying in menus interaction (automatic actor shift)
 *        - Added Mortal Damage Safe Message plugin parameter
 *
 * v1.3.0 - Temporarily sealed off Enemy Rolling HP until v1.4.0 update
 *        - Odometers will now resize up to 4 Digits for HP and MP values
 *        - Added parameters and implementation for Heal Factor Formula
 *        - Added parameters and implementation for Guts Factor Formula
 *        - Changed range for Base Roll Speed to between 1 - 10
 *        - Menus in MV now have Odometer Gauges drawn in Actor Status Boxes
 *        - Added Parameters & Commands to show/hide Gauges in Battles/Menus
 *
 * v1.2.0 - Added Mortal Alert feature and corresponding plugin parameters
 *        - Added UI Config parameters which allow shifting anchor and reel scale
 *        - Fixed Odometer placement in UI so it doesn't block other elements.
 *        - Improved multi-resolution support for Odometers so they align better
 *        - Improved Reel Sprite support for different dimensions
 *
 * v1.1.0 - Now supporting MZ! Added new functions to be able to run in MZ.
 *        - Odometer appears in Menus for MZ using relative anchor points
 *        - Fixed crash bug that prevented saving using the plugin.
 *        - Made changes to extend compatibility with YEP_SaveCore.
 *        - Fixed bug where Healing Skills were Rolling HP when used in Menu
 *
 * v1.0.1 - Fixed glitch where HP/MP/TP Text was not appearing until after Action
 *
 * v1.0.0 - Finished plugin! Yeah! Woohoo! Now for the bug reports to roll in...
 *
 * =============================================================================
 *                              Contact Information
 * =============================================================================
 *
 * This tool was developed by folks at MythAtelier LLC. We make Games that Care.
 *
 * Need more tools for your project? Be sure to check out our other plugins here:
 * https://itch.io/c/1695699/tools-plugins
 *
 * Have any questions? Run into any bugs? Want to chat? Best place to reach us: 
 * https://discord.gg/wRk4XHF5tZ
 *
 * If you like this plugin and want to support us, please give our Patreon a look:
 * https://www.patreon.com/mythatelier
 */

 var Neel = Neel || {};
 var Imported = Imported || {};

 Neel.ODO = Neel.ODO || {};

 Neel.Util = Neel.Util || {};
 Neel.Util.usingMZ = (Utils.RPGMAKER_NAME == "MZ");
 Neel.Util.spritePrototype = Neel.Util.usingMZ ? Sprite_Clickable : Sprite_Base;

 Neel.parameters = PluginManager.parameters('NeelOdometerGaugePlugin');

 Neel.ODO.uiconfig = {
	  battleXOff: Number(Neel.parameters.battleXOffset),
	  battleYOff: Number(Neel.parameters.battleYOffset),
	  battleXSca: Number(Neel.parameters.battleXScale),
	  battleYSca: Number(Neel.parameters.battleYScale),
	  menuXOff: Number(Neel.parameters.menuXOffset),
	  menuYOff: Number(Neel.parameters.menuYOffset),
	  menuXSca: Number(Neel.parameters.menuXScale),
	  menuYSca: Number(Neel.parameters.menuYScale),
	  enemyXOff: Number(Neel.parameters.enemyXOffset),
	  enemyYOff: Number(Neel.parameters.enemyYOffset),
	  enemyXSca: Number(Neel.parameters.enemyXScale),
	  enemyYSca: Number(Neel.parameters.enemyYScale),
 }

 Neel.ODO.bitmaps = {
	  default: Neel.parameters.defaultBitmap,
	  hp: Neel.parameters.hpBitmap,
	  mp: Neel.parameters.mpBitmap,
	  tp: Neel.parameters.tpBitmap
 }

 Neel.ODO.baseRollSpeed = Number(Neel.parameters.baseRollSpeed);
 Neel.ODO.gutsFactor = String(Neel.parameters.gutsFactor);
 Neel.ODO.healFactor = String(Neel.parameters.healFactor);

 Neel.ODO.usingRolling = JSON.parse(Neel.parameters.usingRolling);
 Neel.ODO.usingEnemy = JSON.parse(Neel.parameters.usingEnemy);

 Neel.ODO.usingOdoBattle = JSON.parse(Neel.parameters.usingActorOdoBattle);
 Neel.ODO.usingEnemyBattle = JSON.parse(Neel.parameters.usingEnemyOdoBattle);

 Neel.ODO.usingOdoMenu = JSON.parse(Neel.parameters.usingOdoMenu);
 Neel.ODO.usingOdoTpMenu =  JSON.parse(Neel.parameters.showTPGaugeInMenu);

 if(!Neel.Util.usingMZ)
 {
	if(Imported.YEP_CoreEngine)  Neel.ODO.usingOdoTpMenu = Yanfly.Param.MenuTpGauge;
 }

Neel.ODO.usingMortal = JSON.parse(Neel.parameters.usingMortal);

 Neel.ODO.Game_Interpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
 Game_Interpreter.prototype.pluginCommand = function (command, args) 
 {
	  Neel.ODO.Game_Interpreter_PluginCommand.call(this, command, args);	  
	  if(command.toLowerCase() == "disableactorroll")	Neel.ODO.disableActorRoll();
	  if(command.toLowerCase() == "enableactorroll")	Neel.ODO.enableActorRoll();
	  if(command.toLowerCase() == "hideodomenu")		Neel.ODO.hideOdometerMenu();
	  if(command.toLowerCase() == "showodomenu")		Neel.ODO.showOdometerMenu();
	  if(command.toLowerCase() == "hideodobattle")		Neel.ODO.hideOdometerBattle();
	  if(command.toLowerCase() == "showodobattle")		Neel.ODO.showOdometerBattle();
	  if(command.toLowerCase() == "disableenemyroll")	Neel.ODO.disableEnemyRoll();
	  if(command.toLowerCase() == "enableenemyroll")	Neel.ODO.enableEnemyRoll();	  
	  if(command.toLowerCase() == "showallenemyodo")	Neel.ODO.showAllEnemyOdo(true);
	  if(command.toLowerCase() == "hideallenemyodo")	Neel.ODO.showAllEnemyOdo(false);
 }

 if(Neel.Util.usingMZ)
 {
	  PluginManager.registerCommand("NeelOdometerGaugePlugin", "setOdometerEnable", args =>
	  {
			const arg0 = JSON.parse(args.enabled);
			if(arg0){
				Neel.ODO.enableOdometer();
			}else{
				Neel.ODO.disableOdometer();
			}
	  });

	  PluginManager.registerCommand("NeelOdometerGaugePlugin", "setOdometerBattleActive", args =>
	  {
			const arg0 = JSON.parse(args.enabled);
			if(arg0){
				Neel.ODO.showOdometerBattle();
			}else{
				Neel.ODO.hideOdometerBattle();
			}
	  });

	  PluginManager.registerCommand("NeelOdometerGaugePlugin", "setOdometerMenuActive", args =>
	  {
			const arg0 = JSON.parse(args.enabled);
			if(arg0){
				Neel.ODO.showOdometerMenu();
			}else{
				Neel.ODO.hideOdometerMenu();
			}		
	  });

	  PluginManager.registerCommand("NeelOdometerGaugePlugin", "enableEnemyOdometer", args =>
	  {
			const arg0 = JSON.parse(args.enabled);
			if(arg0){
				Neel.ODO.enableEnemyRoll();
			}else{
				Neel.ODO.disableEnemyRoll();
			}
	  });

	  PluginManager.registerCommand("NeelOdometerGaugePlugin", "showAllEnemyOdo", args =>
	  {
			const arg0 = JSON.parse(args.enabled);
			if(arg0){
				Neel.ODO.showAllEnemyOdo(true);
			} else {
				Neel.ODO.showAllEnemyOdo(false);
			}
	  });
 }

 Neel.ODO.disableActorRoll = function(){
	Neel.ODO.usingRolling = false;
}

Neel.ODO.enableActorRoll = function(){
	Neel.ODO.usingRolling = true;
}

Neel.ODO.hideOdometerMenu = function(){
	Neel.ODO.usingOdoMenu = false;
}

Neel.ODO.showOdometerMenu = function(){
	Neel.ODO.usingOdoMenu = true;
}

 Neel.ODO.hideOdometerBattle = function(){
	Neel.ODO.usingOdoBattle = false;
}

Neel.ODO.showOdometerBattle = function(){
	Neel.ODO.usingOdoBattle = true;
}

Neel.ODO.disableEnemyRoll = function(){
	Neel.ODO.usingEnemy = false;
}

Neel.ODO.enableEnemyRoll = function(){
	Neel.ODO.usingEnemy = true;
}

Neel.ODO.setRollSpeed = function(speed){
	 Neel.ODO.baseRollSpeed = Number(speed);
}

Neel.ODO.showAllEnemyOdo = function(toggle){
	if(SceneManager._scene instanceof Scene_Battle)
	{
		for(var i = 0; i < $gameTroop.members().length; ++i)
		{
			if($gameTroop.members()[i]._odoWindow)
			{
				$gameTroop.members()[i]._odoWindow._displayMode = toggle;
			}
		}
	}
}

Neel.ODO.showEnemyOdo = function(toggle, idx){
	if(SceneManager._scene instanceof Scene_Battle)
	{
		for(var i = 0; i < $gameTroop.members().length; ++i)
		{
			if($gameTroop.members()[i]._odoWindow && $gameTroop.members()[i].index() == idx)
			{
				$gameTroop.members()[i]._odoWindow._displayMode = toggle;
			}
		}
	}
}

//Game Actor Overrides

Neel.GameActor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId){
	Neel.GameActor_setup.call(this, actorId);
	var user = this;
	var a = this;
	var code = Neel.ODO.gutsFactor;
	try{
		var value = eval(code);
	}catch(e){
		var value = 3.0;
		console.error("Your Guts Formula caused an error! A fallback value has been substituted.");
	}
	this._gutsFactor = value;
	var heal = Neel.ODO.healFactor;
	try{
		var value2 = eval(heal);
	}catch(e){
		var value2 = 1.0;
		console.error("Your Heal Formula caused an error! A fallback value has been substituted.");
	}
	this._healFactor = value2;
}

Neel.GameEnemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y){
	Neel.GameEnemy_setup.call(this, enemyId, x, y);
	var user = this;
	var a = this;
	var guts = Neel.ODO.gutsFactor;
	try{
		var value = eval(guts);
	}catch(e){
		var value = 3.0;
		console.error("Your Guts Formula caused an error! A fallback value has been substituted.");
	}
	this._gutsFactor = value;
	var heal = Neel.ODO.healFactor;
	try{
		var value2 = eval(heal);
	}catch(e){
		var value2 = 1.0;
		console.error("Your Heal Formula caused an error! A fallback value has been substituted.");
	}
	this._healFactor = value2;
}

//Game Battler Overrides

Neel.Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function(){

	Game_BattlerBase.prototype.refresh.call(this);
	
	if(Neel.ODO.usingRolling)
	{
		if(!Neel.ODO.usingEnemy)
		{
			if(this.isEnemy())
			{
				if (this.hp === 0) {
					this.addState(this.deathStateId());
				} else {
					this.removeState(this.deathStateId());
				}
			}
		}
	}
	else
	{
		if (this.hp === 0) {
			this.addState(this.deathStateId());
		} else {
			this.removeState(this.deathStateId());
		}
	}
}

//Battle Manager

 Neel.BattleManager_initMembers = BattleManager.initMembers;
 BattleManager.initMembers = function() {
	Neel.BattleManager_initMembers.call(this);
 }

 Neel.SceneBattle_update = Scene_Battle.prototype.update;
 Scene_Battle.prototype.update = function() {
	if(Neel.ODO.usingRolling || Neel.ODO.usingEnemy)
	{
		BattleManager.rollHp();
	}

	Neel.SceneBattle_update.call(this);
 }

 //Actor - Odometers is an array of Sprite Odometers
 //0 - HP Odometer (Battle Status), 1 - MP Odometer (Battle Status), 2 - TP Odometer (Battle Status)
 //3 - HP Odometer (Actor Status), 4 - MP Odometer (Actor Status), 5 - TP Odometer (Actor Status)

Neel.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function(result){

	var allBattlers = BattleManager.allBattleMembers();
	for(var k = 0; k < allBattlers.length; k++)
	{
		allBattlers[k]._rollTimer = 0;
	}

	var actors = $gameParty.battleMembers();
	for(var i = 0; i < actors.length; i++)
	{
		if(actors[i].odometers != undefined)
		{
			actors[i].odometers = undefined;
		}
		else
		{
			actors[i].odometers = new Array(6);
		}

		actors[i]._isRolling = false;
		actors[i]._isDying = false;
		actors[i]._rollValue = undefined;
	}

	var enemies = $gameTroop.members();
	for(var i = 0; i < enemies.length; i++)
	{
		if(enemies[i].odometers != undefined)
		{
			enemies[i].odometers = undefined;
		}
		else
		{
			enemies[i].odometers = new Array(6);
		}

		enemies[i]._isRolling = Neel.ODO.usingEnemy;
		enemies[i]._isDying = false;
		enemies[i]._rollValue = undefined;
	}

	Neel.BattleManager_startBattle.call(this);
}

 BattleManager.rollHp = function() {
	var allBattlers = Neel.ODO.usingEnemy ? BattleManager.allBattleMembers() : $gameParty.battleMembers();

	for(var k = 0; k < allBattlers.length; k++)
	{
		if(allBattlers[k].isDead()) continue;
		if(allBattlers[k]._isRolling)
		{
			var delta = Neel.ODO.baseRollSpeed * ((allBattlers[k]._rollValue > allBattlers[k].hp) ? allBattlers[k]._healFactor : allBattlers[k]._gutsFactor);
			if(allBattlers[k].isActor() && Neel.ODO.usingOdoBattle && allBattlers[k].odometers)	allBattlers[k].odometers[0].setDigitRoll(delta / 200);
			//if(allBattlers[k].isActor() && Neel.ODO.usingEnemy && allBattlers[k].odometers)	allBattlers[k].odometers[0].setDigitRoll(delta / 200);

			allBattlers[k]._rollTimer += delta;
			while(allBattlers[k]._rollTimer >= 200)
			{
				if(allBattlers[k].hp != allBattlers[k]._rollValue && allBattlers[k]._rollValue != undefined)
				{
					var change = allBattlers[k]._rollValue > allBattlers[k].hp ? 1 : -1;
					allBattlers[k].setHp(allBattlers[k].hp + change);

					if(allBattlers[k].hp === 0)
					{
						allBattlers[k].addState(allBattlers[k].deathStateId());
						allBattlers[k].performCollapse();
						allBattlers[k].performActionEnd();

						if(BattleManager.actor() == allBattlers[k])
						{
							//Closing any windows if the previous target died while using them

							BattleManager.selectNextCommand();

							if(SceneManager._scene._skillWindow.isOpenAndActive()){
								SceneManager._scene._skillWindow.hide();
								SceneManager._scene.changeInputWindow();
							}

							if(SceneManager._scene._itemWindow.isOpenAndActive()){
								SceneManager._scene._itemWindow.hide();
								SceneManager._scene.changeInputWindow();
							}

							if(SceneManager._scene._actorWindow.isOpenAndActive()){
								SceneManager._scene._actorWindow.hide();
								SceneManager._scene.changeInputWindow();
							}

							if(SceneManager._scene._enemyWindow.isOpenAndActive()){
								SceneManager._scene._enemyWindow.hide();
								SceneManager._scene.changeInputWindow();
							}
						}

						allBattlers[k].clearActions();

						if($gameParty.isAllDead() != true) SceneManager._scene._statusWindow.select(BattleManager._actorIndex);
					}
					else
					{
						allBattlers[k].removeState(allBattlers[k].deathStateId());
					}

					SceneManager._scene._statusWindow.refresh();

					if($gameParty.isAllDead())	BattleManager.processDefeat();
				}
				else
				{
					allBattlers[k]._isRolling = false;
					allBattlers[k]._rollValue = undefined;
				}

				allBattlers[k]._rollTimer = 0;
			}
		}
	}
 };

 //Game Action

 Neel.GameAction_executeDamage = Game_Action.prototype.executeDamage;
 Game_Action.prototype.executeDamage = function(target, value) {

 	var result = target.result();
	if (value === 0) {
		result.critical = false;
	}
	if (this.isHpEffect())
	{
		if(target.isActor() && Neel.ODO.usingRolling)
		{
			if(this.isHpRecover())
			{
				target.gainHp(-value);
				this.makeSuccess(target);
			}
			else
			{
				this.rollingHpDamage(target, value);
			}
		}
		else if(!target.isActor() && Neel.ODO.usingEnemy)
		{
			this.rollingHpDamage(target, value);
		}
		else
		{
			this.executeHpDamage(target, value);
		}
	}
	if (this.isMpEffect()) {
		this.executeMpDamage(target, value);
	}
 };

 Neel.ODO.playMortalSE = function(){
	  let se = {
		name: Neel.parameters.mortWarnSE,
		volume: 100,
		pitch: 100,
		pan: 100
	  }
	  AudioManager.playSe(se);
 }

 Neel.Game_Battler_revive = Game_Battler.prototype.revive;
 Game_Battler.prototype.revive = function(){
	Neel.Game_Battler_revive.call(this);
	this._isDying = false;
 }

 Game_Action.prototype.rollingHpDamage = function(target, value) {
	 if(Neel.ODO.usingEnemy)
	 {
		target._isRolling = true;

		if(target._rollValue)
		{
			if(this.isRecover()) {
				if(target._rollValue < target.hp) target._rollValue = target.hp;
				target._rollValue = target.hp + (-value);
			}
			else if(this.isDamage()) {
				if(target._rollValue > target.hp) target._rollValue = target.hp;
				target._rollValue += (-value);
			}
		}
		else
		{
			target._rollValue = target.hp + (-value);
		}

		this.makeSuccess(target);
		target._result.hpDamage = value;
		target._result.hpAffected = true;
	 }
	 else
	 {
		if(target.isEnemy())
		{
			if (this.isHpEffect()) {
				this.executeHpDamage(target, value);
			}
		}
		else
		{
			target._isRolling = true;

			if(target._rollValue)
			{
				if(this.isRecover()) {
					if(target._rollValue < target.hp) target._rollValue = target.hp;
					target._rollValue = target.hp + (value);
				}
				else if(this.isDamage()) {
					if(target._rollValue > target.hp) target._rollValue = target.hp;
					target._rollValue += (-value);
				}
			}
			else
			{
				target._rollValue = target.hp + (-value);
			}

			if(Neel.ODO.usingMortal)
			{
				if(!target._isDying && (target._rollValue <= 0 || value >= target.hp))
				{
					var mortalText = Neel.parameters.mortWarnMsg;
					if(mortalText.includes("%1")) mortalText = mortalText.replace("%1", target._name);
					if(mortalText.includes("%2")) mortalText = mortalText.replace("%2", this.subject().battlerName());
					SceneManager._scene._logWindow.addText(mortalText);
					Neel.ODO.playMortalSE();
					target._isDying = true;
				}
				else if(target._isDying && (target._rollValue > 0))
				{
					var mortalText = Neel.parameters.mortSafeMsg;
					if(mortalText.includes("%1")) mortalText = mortalText.replace("%1", target._name);
					SceneManager._scene._logWindow.addText(mortalText);
					target._isDying = false;
				}
			}

			this.makeSuccess(target);
			target._result.hpDamage = value;
			target._result.hpAffected = true;
		}
	 }
};

 // OdoNumber UI Sprite

 function Sprite_OdoNumber() {
   this.initialize.apply(this, arguments);
 }

 Sprite_OdoNumber.prototype = Object.create(Neel.Util.spritePrototype.prototype);
 Sprite_OdoNumber.prototype.constructor = Sprite_OdoNumber;

 Sprite_OdoNumber.prototype.initialize = function() {
 	  Neel.Util.spritePrototype.prototype.initialize.call(this);
	  this.bitmap = ImageManager.loadSystem(Neel.ODO.bitmaps.default);
	  this._rollSpeed =  0.05;
	  this._digitIndex = 0;
	  this._reelSizeX = 0;
	  this._reelSizeY = 0;
 };

 Sprite_OdoNumber.prototype.update = function() {
	Neel.Util.spritePrototype.prototype.update.call(this);

	if(this.bitmap.isReady())
	{
	  this._reelSizeX = this.bitmap.width;
	  this._reelSizeY = this.bitmap.height / 11;
	  var yOffset = Math.floor(this._digitIndex * this._reelSizeY);
	  this.setFrame(0, yOffset, this._reelSizeX, this._reelSizeY);
	}
 }

  // Odometer UI Sprite Container

function Sprite_Odometer(){
	this.initialize.apply(this, arguments);
}

Sprite_Odometer.prototype = Object.create(Neel.Util.spritePrototype.prototype);
Sprite_Odometer.prototype.constructor = Sprite_Odometer;

Sprite_Odometer.prototype.initialize = function(){
	Neel.Util.spritePrototype.prototype.initialize.call(this);

	this._odoDigits = [new Sprite_OdoNumber()];
	this._currentNumber = 0;
	this._targetNumber = 0;
}

Sprite_Odometer.prototype.update = function(){
	Neel.Util.spritePrototype.prototype.update.call(this);

	if(Math.abs(this._currentNumber - this._targetNumber) < this._odoDigits[0]._rollSpeed)
	{
		this._currentNumber = this._targetNumber;
	}

	if(this._currentNumber < this._targetNumber)
	{
		this._currentNumber += this._odoDigits[0]._rollSpeed;
	}
	else if(this._currentNumber > this._targetNumber)
	{
		this._currentNumber -= this._odoDigits[0]._rollSpeed;
	}

	if(Neel.ODO.usingRolling)
	{
		this.rollDigitNumber();
	}
	else
	{
		this.snapDigitNumber();
	}
}

Sprite_Odometer.prototype.rollDigitNumber = function(){
	for(var i = 0; i < this._odoDigits.length; i++)
	{
		if(this._currentNumber >= Math.pow(10, i))
		{
			if(this._targetNumber > this._currentNumber)
			{
				if(this.getDigit(i) - this._odoDigits[i]._digitIndex >= this._odoDigits[i]._rollSpeed)
				{
					this._odoDigits[i]._digitIndex += this._odoDigits[i]._rollSpeed;
				}
				else
				{
					this._odoDigits[i]._digitIndex = this.getDigit(i);
				}
			}
			else
			{
				if(this._odoDigits[i]._digitIndex - this.getDigit(i) >= this._odoDigits[i]._rollSpeed)
				{
					this._odoDigits[i]._digitIndex -= this._odoDigits[i]._rollSpeed;
				}
				else
				{
					this._odoDigits[i]._digitIndex = this.getDigit(i);
				}
			}
		}
		else
		{
			this._odoDigits[i]._digitIndex = 0;
		}
	}
}

Sprite_Odometer.prototype.snapDigitNumber = function(){
	this._currentNumber = this._targetNumber;

	for(var i = 0; i < this._odoDigits.length; i++)
	{
		if(this._currentNumber >= Math.pow(10, i))
			this._odoDigits[i]._digitIndex = this.getDigit(i);
	}
}

Sprite_Odometer.prototype.getDigit = function(index){
	var stringNum = Math.round(this._currentNumber).toString();
	return Number(stringNum[stringNum.length - (index + 1)]);
}

Sprite_Odometer.prototype.setTarget = function(number){
	this._targetNumber = Number(number);
}

Sprite_Odometer.prototype.setDigitRoll = function(speed){
	this._odoDigits.forEach(digit => digit._rollSpeed = speed);
}

//Changing Odometer Draw Functions so there is one Function per Scene and then inside the function is the MV/MZ split

Neel.ODO.drawOdometerSceneMenu = function(actor, type, window, offset){
	var statVal = eval("actor."+ type);	var anchorX = 0;	var anchorY = 0;
	var nudge = (type == "tp" ? 2 : type == "mp" ? 1 : 0);

	if(Neel.Util.usingMZ)
	{
		var tempRect = 	window.itemRectWithPadding(actor.index());
		anchorX = Graphics.boxWidth - SceneManager._scene.mainCommandWidth() - 20 * window.padding;
		anchorY = Math.min(SceneManager._scene.mainAreaTop(), SceneManager._scene.helpAreaTop()) + (tempRect.height * (actor.index() + 1)) - tempRect.height * 0.9;
	}
	else
	{
		var rect = window.itemRect(actor.index());
		anchorX = rect.x + rect.width * 0.75;
		anchorY = rect.y + rect.height * (Neel.ODO.usingOdoTpMenu ? 0.52 : 0.55);
	}

	Neel.ODO.drawOdometerPaired(actor, type, window, offset, nudge, statVal, anchorX, anchorY);
}

Neel.ODO.drawOdometerSceneItem = function(actor, type, window, offset){
	var statVal = eval("actor."+ type);	var anchorX = 0;	var anchorY = 0;
	var nudge = (type == "tp" ? 2 : type == "mp" ? 1 : 0);

	if(Neel.Util.usingMZ)
	{
		var tempRect = 	window.itemRectWithPadding(actor.index());
		anchorX = Graphics.boxWidth - SceneManager._scene.mainCommandWidth() - 16 * window.padding;
		anchorY = Math.min(SceneManager._scene.mainAreaTop(), SceneManager._scene.helpAreaTop()) + (tempRect.height * (actor.index() + 1)) - tempRect.height * 0.9;
	}
	else
	{
		var rect = window.itemRect(actor.index());
		anchorX = rect.x + rect.width * 0.75;
		anchorY = rect.y + rect.height * (Neel.ODO.usingOdoTpMenu ? 0.52 : 0.55);
	}

	Neel.ODO.drawOdometerPaired(actor, type, window, offset, nudge, statVal, anchorX, anchorY);
}

Neel.ODO.drawOdometerSceneSkill = function(actor, type, window, offset){
	var statVal = eval("actor."+ type);	var anchorX = 0;	var anchorY = 0;
	var nudge = (type == "tp" ? 2 : type == "mp" ? 1 : 0);

	if(Neel.Util.usingMZ)
	{
		var tempRect = 	window.itemRectWithPadding(actor.index());
		anchorX = Graphics.boxWidth - SceneManager._scene.mainCommandWidth() - 16 * window.padding;
		anchorY = (window instanceof Window_MenuActor == false) ? 
		Math.min(SceneManager._scene.mainAreaTop(), SceneManager._scene.helpAreaTop()) + tempRect.height * 0.1:
		Math.min(SceneManager._scene.mainAreaTop(), SceneManager._scene.helpAreaTop()) + (tempRect.height * (actor.index() + 1)) - tempRect.height * 0.9;
	}
	else
	{
		if(window instanceof Window_SkillStatus)
		{
			anchorX = (window.width - window.padding * 2) - 128;
			anchorY = (window.height - window.padding * 2) / 2 + window.lineHeight() * 0.12;
		}
		else if(window instanceof Window_MenuActor)
		{
			var rect = window.itemRect(actor.index());
			anchorX = rect.x + rect.width * 0.75;
			anchorY = rect.y + rect.height * (Neel.ODO.usingOdoTpMenu ? 0.52 : 0.55);
		}
	}

	Neel.ODO.drawOdometerPaired(actor, type, window, offset, nudge, statVal, anchorX, anchorY);
}

Neel.ODO.drawOdometerSceneStatus = function(actor, type, window, offset){
	var statVal = eval("actor."+ type);	var anchorX = 0;	var anchorY = 0;
	var nudge = (type == "tp" ? 2 : type == "mp" ? 1 : 0);

	if(Neel.Util.usingMZ)
	{
		var tempRect = 	window.itemRectWithPadding(actor.index());
		anchorX = SceneManager._scene.mainCommandWidth() + window.padding * 3.6;
		anchorY = Math.min(SceneManager._scene.mainAreaTop(), SceneManager._scene.helpAreaTop()) + tempRect.height + window.padding * 3.7;
	}
	else
	{
		anchorX = window.width * 0.38;
		anchorY = window.height * 0.25;
	}

	Neel.ODO.drawOdometerPaired(actor, type, window, offset, nudge, statVal, anchorX, anchorY);
}

Neel.ODO.drawOdometerSceneBattle = function(actor, type, window, offset){
	var statVal = eval("actor."+ type);	var anchorX = 0;	var anchorY = 0;
	var nudge = (type == "tp" ? 2 : type == "mp" ? 1 : 0);

	offset += nudge;	window.changeTextColor(window.systemColor());

	if(Neel.Util.usingMZ)
	{
		var tempRect = 	window.itemRectWithPadding(actor.index());
		anchorX = (Graphics.boxWidth - (SceneManager._scene.mainCommandWidth() + 2 * window.padding)) - (tempRect.width + 3 * window.padding) * (3 - actor.index());
		anchorY = tempRect.height * 0.62 + (2 * nudge);
	}
	else
	{
		if(Imported.YEP_BattleStatusWindow)
		{
			var rect = window.itemRect(actor.index());
			anchorX = rect.x + rect.width * 0.96;
			anchorY = rect.y + ($dataSystem.optDisplayTp ? rect.height * 0.42 : rect.height * 0.595);
		}
		else if(Imported["SumRndmDde Battle Status Customizer"])
		{
			var rect = window;
			anchorX = rect.contentsWidth() * 0.94;
			anchorY = rect.contentsHeight() * ($dataSystem.optDisplayTp ? 0.45 : 0.60);
		}
		else
		{
			switch(type)
			{
				case "hp":	anchorX = window.width - ($dataSystem.optDisplayTp ? 292: 178);	break;
				case "mp":	anchorX = window.width - ($dataSystem.optDisplayTp ? 152: 38);	break;
				case "tp":	anchorX = window.width - 38;	break;
			}
		}
	}

	Neel.ODO.drawOdometerSingle(actor, type, window, offset, nudge, statVal, anchorX, anchorY);
}

//Draws just one Odometer (usually used for Battle UI)

Neel.ODO.drawOdometerSingle = function(actor, type, window, offset, nudge, statVal, anchorX, anchorY){	
	var drawOdo = drawOdo || undefined;
	var fileToLoad = eval("Neel.ODO.bitmaps."+ type);
	if(fileToLoad == "") fileToLoad = Neel.ODO.bitmaps.default;

	if(actor.odometers)
	{
		if(actor.odometers[offset] == undefined)
		{
			drawOdo = new Sprite_Odometer();
			if(eval("actor.m" + type.toString()) >= 10)		drawOdo._odoDigits.push(new Sprite_OdoNumber());
			if(eval("actor.m" + type.toString()) >= 100)	drawOdo._odoDigits.push(new Sprite_OdoNumber());
			if(eval("actor.m" + type.toString()) >= 1000)	drawOdo._odoDigits.push(new Sprite_OdoNumber());
			if(eval("actor.m" + type.toString()) >= 10000)	drawOdo._odoDigits.push(new Sprite_OdoNumber());
			if(eval("actor.m" + type.toString()) >= 100000)	drawOdo._odoDigits.push(new Sprite_OdoNumber());
			if(type == "tp"){
				drawOdo._odoDigits.push(new Sprite_OdoNumber());
				drawOdo._odoDigits.push(new Sprite_OdoNumber());
			}

			for(var i = 0; i < drawOdo._odoDigits.length; i++)
			{
				drawOdo._odoDigits[i].bitmap = ImageManager.loadSystem(fileToLoad);
				drawOdo._odoDigits[i].bitmap.addLoadListener(Neel.ODO.layoutOdoNum.bind(this, drawOdo._odoDigits[i], anchorX, anchorY, i, actor, nudge));
				drawOdo._odoDigits[i].bitmap.addLoadListener(Neel.ODO.textlabelOdoNum.bind(this, drawOdo._odoDigits[i], anchorX, anchorY, actor.index(), nudge, window, type));
				
				drawOdo.addChild(drawOdo._odoDigits[i]);
			}

			drawOdo._targetNumber = statVal;
			drawOdo._currentNumber = drawOdo._targetNumber;
			drawOdo.snapDigitNumber();	window.addChild(drawOdo);

			actor.odometers[offset] = drawOdo;
		}
		else
		{
			actor.odometers[offset].setTarget(statVal);
			if(offset > 2) actor.odometers[offset].snapDigitNumber();
			Neel.ODO.textlabelOdoNum(actor.odometers[offset]._odoDigits[0], anchorX, anchorY, actor.index(), nudge, window, type);
			//having to do this because these plugins have a redraw step, but this is a stopgap solution
			if(Imported.YEP_BattleStatusWindow || Imported["SumRndmDde Battle Status Customizer"]) Neel.ODO.textlabelOdoNum(actor.odometers[offset]._odoDigits[0], anchorX, anchorY, actor.index(), nudge, window, type);
		}
	}

	return drawOdo;
}

//Draws two Odometers with one at the Current Value and the other at the Max Value (usually used for Menu uI)

Neel.ODO.drawOdometerPaired = function(actor, type, window, offset, nudge, statVal, anchorX, anchorY)
{
	var drawOdo = drawOdo || undefined; var drawOdo2 = drawOdo2 || undefined;
	var fileToLoad = eval("Neel.ODO.bitmaps."+ type);
	if(fileToLoad == "") fileToLoad = Neel.ODO.bitmaps.default;

	drawOdo = new Sprite_Odometer();
	if(eval("actor.m" + type.toString()) >= 10)		drawOdo._odoDigits.push(new Sprite_OdoNumber());
	if(eval("actor.m" + type.toString()) >= 100)	drawOdo._odoDigits.push(new Sprite_OdoNumber());
	if(eval("actor.m" + type.toString()) >= 1000)	drawOdo._odoDigits.push(new Sprite_OdoNumber());
	if(type == "tp")
	{
		drawOdo._odoDigits.push(new Sprite_OdoNumber());
		drawOdo._odoDigits.push(new Sprite_OdoNumber());
	}

	for(var i = 0; i < drawOdo._odoDigits.length; i++)
	{
		drawOdo._odoDigits[i].bitmap = ImageManager.loadSystem(fileToLoad);
		drawOdo._odoDigits[i].bitmap.addLoadListener(Neel.ODO.layoutOdoNum.bind(this, drawOdo._odoDigits[i], anchorX, anchorY + (5 * nudge), i, actor, nudge));
		drawOdo._odoDigits[i].bitmap.addLoadListener(Neel.ODO.textlabelOdoNum.bind(this, drawOdo._odoDigits[i], anchorX, anchorY, i, nudge, window, type));
		drawOdo.addChild(drawOdo._odoDigits[i]);
	}

	drawOdo._targetNumber = statVal;
	drawOdo._currentNumber = drawOdo._targetNumber;
	drawOdo.snapDigitNumber();	window.addChild(drawOdo);

	drawOdo2 = new Sprite_Odometer();
	if(eval("actor.m" + type.toString()) >= 10)		drawOdo2._odoDigits.push(new Sprite_OdoNumber());
	if(eval("actor.m" + type.toString()) >= 100)	drawOdo2._odoDigits.push(new Sprite_OdoNumber());
	if(eval("actor.m" + type.toString()) >= 1000)	drawOdo2._odoDigits.push(new Sprite_OdoNumber());
	if(type == "tp")
	{
		drawOdo2._odoDigits.push(new Sprite_OdoNumber());
		drawOdo2._odoDigits.push(new Sprite_OdoNumber());
	}

	for(var i = 0; i < drawOdo2._odoDigits.length; i++)
	{
		drawOdo2._odoDigits[i].bitmap = ImageManager.loadSystem(fileToLoad);
		drawOdo2._odoDigits[i].bitmap.addLoadListener(Neel.ODO.layoutOdoNum.bind(this, drawOdo2._odoDigits[i], 10 + anchorX + Math.max(drawOdo2._odoDigits[i].bitmap.width * 4, 106), anchorY + (5 * nudge), i, actor, nudge));
		drawOdo2._odoDigits[i].bitmap.addLoadListener(Neel.ODO.textlabelDivisor.bind(this, drawOdo2._odoDigits[i], anchorX - 8, anchorY - 8, nudge, window));
		drawOdo2.addChild(drawOdo2._odoDigits[i]);
	}

	drawOdo2._targetNumber = (type == "hp" ? actor.mhp : type == "mp" ? actor.mmp : 100);
	drawOdo2._currentNumber = drawOdo2._targetNumber;
	drawOdo2.snapDigitNumber();	window.addChild(drawOdo2);
}

Neel.ODO.layoutOdoNum = function(odoDigit, anchorX, anchorY, i, actor, nudge){

	if(odoDigit._reelSizeX == 0) odoDigit._reelSizeX = odoDigit.bitmap.width;
	if(odoDigit._reelSizeY == 0) odoDigit._reelSizeY = odoDigit.bitmap.height/11;

	if(SceneManager._scene instanceof Scene_Battle)	{
		odoDigit.scale.x = Neel.ODO.uiconfig.battleXSca;
		odoDigit.scale.y = Neel.ODO.uiconfig.battleYSca;

		if(Imported.YEP_BattleStatusWindow || Imported["SumRndmDde Battle Status Customizer"])
		{
			odoDigit.scale.x = (actor.isEnemy() ? Neel.ODO.uiconfig.enemyXSca : odoDigit.scale.x = 0.75);
			odoDigit.scale.y = (actor.isEnemy() ? Neel.ODO.uiconfig.enemyYSca : odoDigit.scale.y = 0.75);
			
			odoDigit.x = anchorX - (odoDigit._reelSizeX * odoDigit.scale.x * i);
			odoDigit.y = anchorY + (odoDigit._reelSizeY * odoDigit.scale.y) + (odoDigit._reelSizeY * odoDigit.scale.y * nudge) + nudge;
			
			odoDigit.x += (actor.isEnemy() ? Neel.ODO.uiconfig.enemyXOff : Neel.ODO.uiconfig.battleXOff);
			odoDigit.y += (actor.isEnemy() ? Neel.ODO.uiconfig.enemyYOff : Neel.ODO.uiconfig.battleYOff);
		}
		else
		{
			if(actor.isEnemy())
			{
				odoDigit.scale.x = Neel.ODO.uiconfig.enemyXSca;	odoDigit.scale.y = Neel.ODO.uiconfig.enemyYSca;
				odoDigit.x = anchorX - (odoDigit._reelSizeX * Neel.ODO.uiconfig.enemyXSca * i);
				odoDigit.y = anchorY;
				odoDigit.x += Neel.ODO.uiconfig.enemyXOff;	odoDigit.y += Neel.ODO.uiconfig.enemyYOff;
			}
			else
			{
				odoDigit.x = (Neel.Util.usingMZ) ? anchorX - (odoDigit._reelSizeX * Neel.ODO.uiconfig.battleXSca * i) : anchorX - (odoDigit._reelSizeX * Neel.ODO.uiconfig.battleXSca * i);
				odoDigit.y = (Neel.Util.usingMZ) ? anchorY + (odoDigit._reelSizeY * Neel.ODO.uiconfig.battleYSca * nudge) : anchorY + (odoDigit._reelSizeY * Neel.ODO.uiconfig.battleYSca * actor.index()) + 20 + (5 * (actor.index()));
				odoDigit.x += Neel.ODO.uiconfig.battleXOff;	odoDigit.y += Neel.ODO.uiconfig.battleYOff;
			}
		}
	} 
	else
	{
		odoDigit.scale.x = Neel.ODO.uiconfig.menuXSca;
		odoDigit.scale.y = Neel.ODO.uiconfig.menuYSca;
		odoDigit.x = anchorX - (odoDigit._reelSizeX * Neel.ODO.uiconfig.menuXSca * i);
		odoDigit.y = anchorY + (odoDigit._reelSizeY * Neel.ODO.uiconfig.menuYSca * nudge);
		odoDigit.x += Neel.ODO.uiconfig.menuXOff;
		odoDigit.y += Neel.ODO.uiconfig.menuYOff;
	}
}

Neel.ODO.textlabelOdoNum = function(odoDigit, anchorX, anchorY, i, nudge, window, type){

	var xOff = (SceneManager._scene instanceof Scene_Battle) ? Neel.ODO.uiconfig.battleXOff : Neel.ODO.uiconfig.menuXOff;
	var yOff = (SceneManager._scene instanceof Scene_Battle) ? Neel.ODO.uiconfig.battleYOff : Neel.ODO.uiconfig.menuYOff;
	var xSca = (SceneManager._scene instanceof Scene_Battle) ? Neel.ODO.uiconfig.battleXSca : Neel.ODO.uiconfig.menuXSca;
	var ySca = (SceneManager._scene instanceof Scene_Battle) ? Neel.ODO.uiconfig.battleYSca: Neel.ODO.uiconfig.menuYSca;

	if(Neel.Util.usingMZ)
	{
		window.drawText(eval("TextManager." + type + "A"),
		anchorX - (5 * odoDigit._reelSizeX * xSca)  + xOff,
		anchorY + (odoDigit._reelSizeY * ySca * nudge) + yOff - (odoDigit._reelSizeY * ySca * 0.7 - nudge),
		22);
	} 
	else
	{
		if(SceneManager._scene instanceof Scene_Battle)
		{
			if(Imported.YEP_BattleStatusWindow)
			{
				if(odoDigit._reelSizeX > 0 && odoDigit._reelSizeY > 0)
				{
					xSca = 0.75;	ySca = 0.75;
					window.drawText(eval("TextManager." + type + "A"),
					anchorX - (odoDigit._reelSizeX * xSca * 5.5) + xOff,
					anchorY + (odoDigit._reelSizeY * ySca * nudge) + yOff,
					22);
				}
			}
			else if(Imported["SumRndmDde Battle Status Customizer"])
			{
				if(odoDigit._reelSizeX > 0 && odoDigit._reelSizeY > 0)
				{
					xSca = 0.75;	ySca = 0.75;
					window.drawText(eval("TextManager." + type + "A"),
					anchorX - (odoDigit._reelSizeX * xSca * 5) + xOff,
					anchorY + (odoDigit._reelSizeY * ySca * 0.5) + (odoDigit._reelSizeY * ySca * nudge) + nudge + yOff,
					22);
				}
			}
			else
			{
				window.drawText(eval("TextManager." + type + "A"),
				anchorX - (type == "tp" ? 102: 126) + xOff,
				anchorY + ((odoDigit._reelSizeY * ySca) * i) + (5 * i) + yOff,
				22);
			}
		}
		else
		{
			window.drawText(eval("TextManager." + type + "A"),
			anchorX - (5.5 * odoDigit._reelSizeX * xSca) + xOff,
			anchorY + (odoDigit._reelSizeY * ySca * nudge) + (5 * nudge) - 24 + yOff,
			22);
		}
	}
}

Neel.ODO.textlabelDivisor = function(odoDigit, anchorX, anchorY, nudge, window){
	window.drawText("/", 
	anchorX + odoDigit._reelSizeX * Neel.ODO.uiconfig.menuXSca + Neel.ODO.uiconfig.menuXOff, 
	anchorY + (odoDigit._reelSizeY * Neel.ODO.uiconfig.menuYSca * nudge) + (2 * Neel.ODO.uiconfig.menuYSca * nudge) - 11 + nudge + Neel.ODO.uiconfig.menuYOff, 
	22);
}

// Window Battle Status Upgraded New Functions

if(Imported["SumRndmDde Battle Status Customizer"])
{
	Neel.Window_BattleStatusUpgrade_initialize = Window_BattleStatusUpgrade.prototype.initialize;
	Window_BattleStatusUpgrade.prototype.initialize = function(actor, index, previousWindow, statusWindow, master){
		Neel.Window_BattleStatusUpgrade_initialize.call(this, actor, index, previousWindow, statusWindow, master);
	}

	Neel.Window_BattleStatusUpgrade_drawAllGauges = Window_BattleStatusUpgrade.prototype.drawAllGauges;
	Window_BattleStatusUpgrade.prototype.drawAllGauges = function(){
		const actor = this._actor;
		Neel.ODO.drawOdometerSceneBattle(actor, "hp", this, 0);
		Neel.ODO.drawOdometerSceneBattle(actor, "mp", this, 0);
		if($dataSystem.optDisplayTp) Neel.ODO.drawOdometerSceneBattle(actor, "tp", this, 0);
	}
}

// Window Battle Status New Functions

Window_BattleStatus.prototype.drawOdometer = function(actor, type, x, y){
	
	Neel.ODO.drawOdometerSceneBattle(actor, type, this, 0);
}

 Neel.Window_BattleStatus_drawGaugeArea = Window_BattleStatus.prototype.drawGaugeArea;
 Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor){
  	if(Neel.ODO.usingOdoBattle){
		this.drawOdometer(actor, "hp", rect.x, rect.y);
		this.drawOdometer(actor, "mp", rect.x, rect.y);
		if($dataSystem.optDisplayTp) this.drawOdometer(actor, "tp", rect.x, rect.y);
	 } else {
		Neel.Window_BattleStatus_drawGaugeArea.call(this, rect, actor);
	 }
 };

if(Neel.Util.usingMZ)
{
	Window_StatusBase.prototype.drawOdometer = function(actor, type, x, y)
	{
		if(SceneManager._scene instanceof Scene_Menu)
		{
			Neel.ODO.drawOdometerSceneMenu(actor, type, this, 0);
		}
		else if(SceneManager._scene instanceof Scene_Skill)
		{
			Neel.ODO.drawOdometerSceneSkill(actor, type, this, 0);
		}
		else if(SceneManager._scene instanceof Scene_Item)
		{
			Neel.ODO.drawOdometerSceneItem(actor, type, this, 0);
		}
		else if(SceneManager._scene instanceof Scene_Status)
		{
			Neel.ODO.drawOdometerSceneStatus(actor, type, this, 0);
		}	
	}
	
	 Neel.Window_StatusBase_placeBasicGauges = Window_StatusBase.prototype.placeBasicGauges;
	 Window_StatusBase.prototype.placeBasicGauges = function(actor, x, y){
		if((SceneManager._scene instanceof Scene_Battle) && Neel.ODO.usingOdoBattle)
		{
			this.drawOdometer(actor, "hp", x, y);
			this.drawOdometer(actor, "mp", x, y);
			if($dataSystem.optDisplayTp) this.drawOdometer(actor, "tp", x, y);
		}
		else if(!(SceneManager._scene instanceof Scene_Battle) && Neel.ODO.usingOdoMenu)
		{
			this.drawOdometer(actor, "hp", x, y);
			this.drawOdometer(actor, "mp", x, y);
			if($dataSystem.optDisplayTp) this.drawOdometer(actor, "tp", x, y);
		}
		else
		{
			Neel.Window_StatusBase_placeBasicGauges.call(this, actor, x, y);
		}
	 }
}
else
{
	Neel.Window_Base_drawActorSimpleStatus = Window_Base.prototype.drawActorSimpleStatus;
	Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width){
		if(Neel.ODO.usingOdoMenu)
		{
			var lineHeight = this.lineHeight();
			var x2 = x + 180;
			var width2 = Math.min(200, width - 180 - this.textPadding());
			this.drawActorName(actor, x, y);
			this.drawActorLevel(actor, x, y + lineHeight * 1);
			this.drawActorIcons(actor, x, y + lineHeight * 2);
			this.drawActorClass(actor, x2, y);

			if(SceneManager._scene instanceof Scene_Menu)
			{
				Neel.ODO.drawOdometerSceneMenu(actor, "hp", this, 0);
				Neel.ODO.drawOdometerSceneMenu(actor, "mp", this, 0);
				if(Neel.ODO.usingOdoTpMenu) Neel.ODO.drawOdometerSceneMenu(actor, "tp", this, 0);
			}
			else if(SceneManager._scene instanceof Scene_Skill)
			{
				Neel.ODO.drawOdometerSceneSkill(actor, "hp", this, 0);
				Neel.ODO.drawOdometerSceneSkill(actor, "mp", this, 0);
				if(Neel.ODO.usingOdoTpMenu) Neel.ODO.drawOdometerSceneSkill(actor, "tp", this, 0);
			}
			else if(SceneManager._scene instanceof Scene_Item)
			{
				Neel.ODO.drawOdometerSceneItem(actor, "hp", this, 0);
				Neel.ODO.drawOdometerSceneItem(actor, "mp", this, 0);
				if(Neel.ODO.usingOdoTpMenu) Neel.ODO.drawOdometerSceneItem(actor, "tp", this, 0);
			}
			else if(SceneManager._scene instanceof Scene_Status)
			{
				Neel.ODO.drawOdometerSceneStatus(actor, "hp", this, 0);
				Neel.ODO.drawOdometerSceneStatus(actor, "mp", this, 0);
				if(Neel.ODO.usingOdoTpMenu) Neel.ODO.drawOdometerSceneStatus(actor, "tp", this, 0);
			}
		}
		else
		{
			Neel.Window_Base_drawActorSimpleStatus.call(this, actor, x, y, width);
		}
	}

	Neel.Window_Status_drawBasicInfo = Window_Status.prototype.drawBasicInfo;
	Window_Status.prototype.drawBasicInfo = function(x, y){
		if(Neel.ODO.usingOdoMenu)
		{
			var lineHeight = this.lineHeight();
			this.drawActorLevel(this._actor, x, y + lineHeight * 0);
			this.drawActorIcons(this._actor, x, y + lineHeight * 1);

			Neel.ODO.drawOdometerSceneStatus(this._actor, "hp", this, 0);
			Neel.ODO.drawOdometerSceneStatus(this._actor, "mp", this, 0);
			if(Neel.ODO.usingOdoTpMenu) Neel.ODO.drawOdometerSceneStatus(this._actor, "tp", this, 0);
		}
		else
		{
			Neel.Window_Status_drawBasicInfo.call(this, x, y);
		}
	}
}

// Window Battle Actor

Window_BattleActor.prototype.drawOdometer = function(actor, type){
	Neel.ODO.drawOdometerSceneBattle(actor, type, this, 3);
}

Window_BattleActor.prototype.drawGaugeArea = function(rect, actor){	 
	this.drawOdometer(actor, "hp");
	this.drawOdometer(actor, "mp");
	if($dataSystem.optDisplayTp) this.drawOdometer(actor, "tp");
}

Neel.Window_BattleActor_show = Window_BattleActor.prototype.show;
Window_BattleActor.prototype.show = function(){

	this.select(0);

	for(var i = 0; i < $gameParty.battleMembers().length; i++)
	{
		var actor = $gameParty.battleMembers()[i];
		if(!Neel.Util.usingMZ) this.drawGaugeArea(this.basicAreaRect(i), actor);
	}
	
	Window_BattleStatus.prototype.show.call(this);
}

//Battle Manager Overrides

Neel.BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
BattleManager.updateBattleEnd = function(){

	var members = $gameParty.battleMembers();

	for(var i = 0; i < members.length; i++)
	{
		members[i].odometers = undefined;
	}

	Neel.BattleManager_updateBattleEnd.call(this);
}

//Sprite Battler Overrides

Neel.ODO.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function(){
	Neel.ODO.Sprite_Battler_update.call(this);
	if(Neel.ODO.usingEnemyBattle) this.createEnemyOdoGauge();
}

Sprite_Battler.prototype.createEnemyOdoGauge = function(){
	if(this._createdOdoGauge) return;

	var index = $gameTroop.members().indexOf(this._battler);
	if(index != -1)
	{
		this._enemyOdoGauge = new Window_EnemyOdoGauge();
		this._enemyOdoGauge.setBattler(this._battler);

		this.parent.addChild(this._enemyOdoGauge);
		
		this._enemyOdoGauge.setDimensions(this._homeX - 64, this._homeY - 128, 128, 100);
		this._createdOdoGauge = true;
	}
}

//Enemy Odometer Gauge windows

function Window_EnemyOdoGauge(){
	this.initialize.apply(this, arguments);
}

Window_EnemyOdoGauge.prototype = Object.create(Window_Base.prototype);
Window_EnemyOdoGauge.prototype.constructor = Window_EnemyOdoGauge;

Window_EnemyOdoGauge.prototype.initialize = function(){
	Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
	this._battler = null;
	this._gauge = null;
	this.opacity = 0;
	this._displayMode = true;
}

Window_EnemyOdoGauge.prototype.setBattler = function(battler){
	if(this._battler === battler) return;
	this._battler = battler;
}

Window_EnemyOdoGauge.prototype.setDimensions = function(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Window_EnemyOdoGauge.prototype.update = function(){
	Window_Base.prototype.update.call(this);
	if(this._gauge == undefined)
	{
		var index = $gameTroop.members().indexOf(this._battler);
		if(index != -1)
		{
			if($gameTroop.members()[index].odometers)
			{
				this._gauge = Neel.ODO.drawOdometerSingle(this._battler, "hp", this, 0, 0, this._battler.hp, this.width * 0.8, this.height * 0.8);
				$gameTroop.members()[index]._odoWindow = this;

				for(var i = 0; i < this._gauge._odoDigits.length; ++i){ this._gauge._odoDigits[i]._rollSpeed = 4;}
			}
		}
	}
	else
	{
		this._gauge.setTarget(this._battler.hp);

		//this is ok for now, but we 1) want this to happen on collapse and 2) collapse to happen only when 0 is hit
		if(this._battler.isAlive() == false && this._gauge._currentNumber <= 0)	this._displayMode = false;

		if(this._displayMode){
			this.show();
		} else {
			this.hide();
		}
	}
}

Window_EnemyOdoGauge.prototype.refresh = function(){
	this.contents.clear();
}