// Make ROM if it does not exist yet (to deal with load order issue here).
if(!ROM) var ROM = {};

// burn ROM
if(!ROM.d_sprite) ROM.d_sprite = {};

ROM.d_sprite.cabinet = {
	/**
	 * Instances
	 */
	/** features register */
	'flipHole_accepts_1': true,
	'flipHole_side_1': 0, // 0 is 15 points, -1 is 5 points
	'flipHole_accepts_2': true,
	'flipHole_side_2': 0,
	'flipHole_accepts_3': true,
	'flipHole_side_3': 0,
	/** rensho */
	'rensho_1': {body:null,accepts: true},
	'rensho_2': {body:null,accepts: true},
	/**
	* methods
	*/
	add: function () {
		//add ground
		/**
		* width , height, depth
		*/
		var _tilt = 17;
		// needles
		var _size_needles = [1.2,50,1.2];
		var _size_holes = [15,15,15];
		var _hideHoleBumper = true;
		var _hideHoleSensors = true;
		/**
		 * extension -
		 * left 20
		 * Right 25
		 */
		/**
		 * For naming conventions, see http://www.ipdb.org/glossary.php
		 *
		 * for z movement, find abs val, multiplied by 0.3033707865 to get abs val of y. (when the tilt is 17)
		 */
		// sides, left to right
		PCB.d_sprite.addBox('side_left',[20, 120, 650],[-200,15,26],[_tilt,0,0],'cabinet_frames');
		PCB.d_sprite.addBox('side_right',[18, 120, 650],[247,15,26],[_tilt,0,0],'cabinet_frames',false,false);
		// side cover on right
		PCB.d_sprite.addBox('side_cover',[60, 35, 560],[211,83,-50],[_tilt,0,0],'cabinet_frames',false,false);
		// glass
		PCB.d_sprite.addBox('glass_plate',[390, 25, 620],[-10,50,-10],[_tilt-1,0,0],'',false,true);
		// this is used to prevent balls to cram at the front so that they form a flat layer.
		PCB.d_sprite.addBox('front_ball_topguide_invisible',[360, 1, 390],[0,50,150],[_tilt,0,0],'',false,true);
		// bottom, z was -40, no 49 (abs dif 89), y was -70 to -97 (abs diff 27). 0.3033707865
		PCB.d_sprite.addBox('bottom_foundation',[465, 80, 600],[23,-70,-40],[_tilt,0,0],'layout_foundation');
		// front. z 240
		// PCB.d_sprite.addBox('front_cover',[416, 190, 30],[18,-63,330],[_tilt,0,0],'wireframe',false,false);
		PCB.d_sprite.addBox('front_cover',[440, 125, 20],[18,-79,325],[_tilt,0,0],'cabinet_frames',false,false);
		// PCB.d_sprite.addBox('front_invisible_wall',[400, 200, 30],[0,-36,228],[_tilt-5,0,0],'',false,false);
		// rear
		PCB.d_sprite.addBox('rear_cover',[400, 130, 30],[10,99,-265],[_tilt,0,0],'cabinet_frames',false,false);
		// guide cover in the end
		// ball lane guide cylinder
		PCB.d_sprite.addCylynder('front_ball_guide_cylynder',[15, 70, 15],[181,-34,263],[20,0,0],'metal');
		// invisible
		PCB.d_sprite.addBox('front_ball_guide_plate_invisible',[10, 60, 80],[182,0,225],[18,3,0],'',false,true);
		// lane corner edge guide invisible
		// PCB.d_sprite.addBox('front_ball_guide_corner_edge',[8,60,90],[247,-20,285],[17,-14,-12],'',false,false);
		// plunger lanch lane
		// side plunger lane guide
		PCB.d_sprite.addBox('side_plunger_lane_guide',[10, 130, 110],[191,-71,214],[_tilt,0,0],'');
		PCB.d_sprite.addBox('side_plunger_lane_guide_rear',[10, 30, 220],[188,-30,-10],[_tilt,0,0],'');
		PCB.d_sprite.addBox('side_plunger_lane_guide_right',[10, 25, 320],[236,-30,0],[_tilt,0,0],'',false,false);
		// lane curves Right
		PCB.d_sprite.addBox('side_plunger_lane_guide_curve_wall_r_1',[10, 50,50],[238,36,-171],[_tilt,30,0],'rail_guide');
		PCB.d_sprite.addBox('side_plunger_lane_guide_curve_wall_r_2',[30, 50,80],[208,51.5,-218],[_tilt,45,0],'rail_guide');
		PCB.d_sprite.addBox('side_plunger_lane_guide_curve_wall_r_3',[40, 50,120],[155,62.5,-261],[_tilt,69,0],'rail_guide');
		// PCB.d_sprite.addCylynder('needle',_size_needles,[178,36,-190],[_tilt,0,-2],'needle');
		// rear
		PCB.d_sprite.addBox('side_plunger_lane_guide_curve_wall_rear_right',[20, 50,80],[94,64.5,-261],[_tilt,84,0],'rail_guide');
		PCB.d_sprite.addBox('side_plunger_lane_guide_curve_wall_rear_center',[20, 50,120],[0,66.8,-264],[_tilt,90,0],'rail_guide');
		PCB.d_sprite.addBox('side_plunger_lane_guide_curve_wall_rear_left',[30, 50,80],[-97,66.3,-263],[_tilt,-81,0],'rail_guide');
		// lane curves Left
		PCB.d_sprite.addBox('side_plunger_lane_guide_curve_wall_l_1',[30, 50,50],[-143,62.3,-250],[_tilt,-65,0],'rail_guide');
		PCB.d_sprite.addBox('side_plunger_lane_guide_curve_wall_l_2',[30, 50,60],[-170,56.5,-230],[_tilt,-41,0],'rail_guide');
		PCB.d_sprite.addBox('side_plunger_lane_guide_curve_wall_l_3',[20, 50,50],[-192,45,-189],[_tilt,-20,0],'rail_guide');

		// edge cover up plate
		PCB.d_sprite.addPlane('side_plunger_lane_guide_curve_wall_edge',[44,30,1],[-170,85,-238],[-73,0,0],'rail_guide_top');

		// ball dipenser guide
		PCB.d_sprite.addBox('ball_dispenser_guide_floor',[100, 5, 170],[100,169,-255],[30,-9,0],'metal',false,false);
		PCB.d_sprite.addBox('ball_dispenser_guide_left',[10, 30, 170],[50,178,-253],[30,-9,0],'metal_bright',false,false);
		PCB.d_sprite.addBox('ball_dispenser_guide_right',[10, 30, 170],[150,167,-240],[30,-9,0],'metal_bright',false,false);

		// rear box
		PCB.d_sprite.addBox('backbox',[468, 300, 60],[23,238,-285],[0,0,0],'rear_box',true,false);
		PCB.d_sprite.addBox('dispenser_exit_frame_top',[110, 8, 20],[101,224,-255],[0,0,0],'metal_bright',true,false);
		PCB.d_sprite.addBox('dispenser_exit_frame_top',[8,40,20],[50,200,-255],[0,0,0],'metal_bright',true,false);
		PCB.d_sprite.addBox('dispenser_exit_frame_top',[8,40,20],[152,200,-255],[0,0,0],'metal_bright',true,false);
		PCB.d_sprite.addPlane('dispenser_exit',[108,79,1],[100,182,-249],[0,0,0],'black');
		// playfield objects

		// lane end spring
		PCB.d_sprite.addCylynder(['front_ball_lane_end_spring','sensor','laneEndSpring'],[3, 10, 3],[-186,6,-140],[113,0,14],'');
		PCB.d_sprite.addCylynder('front_ball_lane_end_spring_cover',[8, 10, 8],[-187,6,-140],[113,0,8],'');

		// top left
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[30,20,-191],[_tilt,0,-2],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[62,18,-187],[16,0,1],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[92,21,-189],[_tilt,0,-1],'needle');
		// top right
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-30,20,-191],[19,0,3],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-62,18,-187],[16,0,-3],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-92,21,-189],[_tilt,0,1],'needle');

		// upper holes
		// right
		PCB.d_sprite.addCircle('hole_upper_right',_size_holes,[61,11,-166],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['hole_sensor_top_right','sensor','hole','1'],[5,1,5],[61,14,-166],[14,0,0],'hole_debug',false,_hideHoleSensors);

		// left
		PCB.d_sprite.addCircle('hole_upper_right',_size_holes,[-61,11,-166],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['hole_sensor_top_left','sensor','hole','1'],[5,1,5],[-61,12,-166],[10,0,0],'hole_debug',false,_hideHoleSensors);

		// top above flip hole 1
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[0,4,-127],[_tilt,0,0],'needle');
		// upper wings Right
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[32,-4,-105],[16,0,4],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[62,-2,-107],[_tilt,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[90,-2,-108],[18,0,2],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[124,-4,-103],[18,0,0],'needle');
		// upper wings left
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-32,-4,-105],[16,0,-4],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-62,-2,-107],[_tilt,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-90,-2,-108],[19,0,-2],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-124,-4,-103],[26,0,3],'needle');

		// upper wings right safe hole
		PCB.d_sprite.addCircle('hole_upper_right',_size_holes,[125,-22,-60],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['hole_right_wing','sensor','hole','1'],[10,1,3],[125,-21,-60],[15,0,0],'hole_debug',false,_hideHoleSensors);
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[139,-14,-77],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[144,-17,-72],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[113,-14,-77],[17,0,2],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[108,-17,-72],[17,0,0],'needle');
		// hole bumpers
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[140,-10,-53],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[110,-10,-53],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 28, 2],[123,-13,-43],[107,0,90],'',false,_hideHoleBumper);
		// dummies
		PCB.d_sprite.addBumperMesh('hole_uppper_right_bumper','shortBumper',[3.9,3.6,3.6],[125,-2,-74],[107,0,0],'metal');
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[124,-34,-42],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[142,-27,-63],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[107,-27,-63],[_tilt,0,0],'metal',true);

		// upper wings left safe hole
		PCB.d_sprite.addCircle('hole_upper_left',_size_holes,[-125,-22,-60],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['hole_sensor_left_wing','sensor','hole','1'],[10,1,3],[-125,-22,-60],[21,0,0],'hole_debug',false,_hideHoleSensors);
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-139,-14,-80],[12,0,2],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-144,-17,-72],[18,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-112,-14,-80],[15,0,3],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-107,-17,-72],[14,0,-2],'needle');
		// hole bumpers
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[-140,-10,-53],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[-110,-10,-53],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 28, 2],[-123,-13,-43],[107,0,90],'',false,_hideHoleBumper);
		// dummies
		PCB.d_sprite.addBumperMesh('hole_upper_left_bumper','shortBumper',[3.9,3.6,3.6],[-125,-2,-74],[107,0,0],'metal');
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-124,-34,-42],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-142,-27,-63],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-107,-27,-63],[_tilt,0,0],'metal',true);

		// flip hole
		PCB.d_sprite.addBox(['flipHole_1','sensor','flipHole','1'],[25, 15, 45],[0,-32,-50],[_tilt,0,0],'flipHole');
		PCB.d_sprite.addPlane('flipHole_foundation',[25, 45, 1],[0,-26,-45],[-73,0,0],'flipHole_foundation');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[0,-10,-96],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[14,-14,-73],[14,0,2],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[19,-17,-66],[_tilt,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-14,-14,-73],[18,0,-2],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-19,-17,-66],[_tilt,0,0],'needle');
		// flip hole bumpers
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 43, 2],[18,-15,-40],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 43, 2],[-18,-15,-40],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 38.5, 2],[0,-21,-20],[107,0,90],'',false,_hideHoleBumper);
		PCB.d_sprite.addBumperMesh('flipHole_1_bumper','longBumper',[4,4,4],[0,-6,-55],[107,0,0],'metal');
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[0,-40,-19],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[18,-28,-59],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-18,-28,-59],[_tilt,0,0],'metal',true);

		// Center 15 points hole
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[0,-45,-5],[16,0,0],'needle');
		PCB.d_sprite.addCircle('hole_center',_size_holes,[0,-51.7,38],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['hole_sensor_center_middle','sensor','hole','3'],[10,1,3],[0,-51,35],[15,0,0],'hole_debug',false,_hideHoleSensors);

		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[14,-48,18],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[18,-48,30],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-14,-48,18],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-18,-48,30],[17,0,0],'needle');
		// // flip hole bumpers
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[15,-39,45],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[-15,-39,45],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 28, 2],[0,-42,54],[107,0,90],'',false,_hideHoleBumper);
		// // dummies
		PCB.d_sprite.addBumperMesh('hole_center_bumper','shortBumper',[3.9,3.6,3.6],[0,-32,26],[107,0,0],'metal');
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[18,-58,36],[17,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-18,-58,36],[17,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[0,-65,58],[_tilt,0,0],'metal',true);
		// for debug
		// PCB.d_sprite.addBox('side_plunger_lane_guide_rear',[10, 30, 220],[-90,-40,-10],[_tilt,45,0],'');
		/**
		 * Middle needles
		 */
		 // right
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[78,-53,38],[17,0,0],'needle');
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[46,-53,38],[17,0,0],'needle');
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[62,-56,59],[24,0,0],'needle');
		 // left
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-78,-53,38],[17,0,0],'needle');
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-46,-53,38],[17,0,0],'needle');
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-62,-56,59],[24,0,0],'needle');

		 /**
		 * Middle Flip Holes
		 */
		// right
		// flip hole
		PCB.d_sprite.addBox(['flipHole_2','sensor','flipHole','2'],[25, 15, 45],[125,-61,45],[_tilt,0,0],'flipHole');
		PCB.d_sprite.addPlane('flipHole_foundation',[25, 45, 1],[125,-55,50],[-73,0,0],'flipHole_foundation');
		// needles
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[125,-36,-2],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[140,-40,22],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[142,-43,30],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[112,-40,22],[_tilt,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[110,-43,30],[_tilt,0,0],'needle');
		// flip hole bumpers
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 43, 2],[143,-41,55],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 43, 2],[107,-41,55],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 38.5, 2],[125,-47,75],[107,0,90],'',false,_hideHoleBumper);
		PCB.d_sprite.addBumperMesh('flipHole_2_bumper','longBumper',[4,4,4],[126,-32,40],[114,0,0],'metal');
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[126,-66,76],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[143,-54,36],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[109,-54,36],[_tilt,0,0],'metal',true);
		// left
		// flip hole
		PCB.d_sprite.addBox(['flipHole_3','sensor','flipHole','3'],[25, 15, 45],[-125,-61,45],[_tilt,0,0],'flipHole');
		PCB.d_sprite.addPlane('flipHole_foundation',[25, 45, 1],[-125,-55,50],[-73,0,0],'flipHole_foundation');
		// needles
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-125,-36,-2],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-140,-40,22],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-142,-43,30],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-112,-40,22],[_tilt,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-110,-43,30],[_tilt,0,0],'needle');
		// flip hole bumpers
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 43, 2],[-143,-41,55],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 43, 2],[-107,-41,55],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 38.5, 2],[-125,-47,75],[107,0,90],'',false,_hideHoleBumper);
		PCB.d_sprite.addBumperMesh('flipHole_3_bumper','longBumper',[4,4,4],[-126,-32,40],[114,0,0],'metal');
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-126,-66,76],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-143,-54,36],[_tilt,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-109,-54,36],[_tilt,0,0],'metal',true);

		// rensho - get both for 20 pts
		// right
		PCB.d_sprite.addCircle('hole_upper_right',_size_holes,[63,-70,100],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['rensho_hole_sensor_right','sensor','rensho','1'],[8,1,8],[63,-69,100],[10,0,0],'hole_debug',false,_hideHoleSensors);
		// left
		PCB.d_sprite.addCircle('hole_upper_right',_size_holes,[-63,-70,100],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['rensho_hole_sensor_left','sensor','rensho','2'],[8,1,8],[-63,-69,100],[10,0,0],'hole_debug',false,_hideHoleSensors);
		// PCB.d_sprite.addBox('side_plunger_lane_guide_rear',[10, 30, 220],[0,-70,125],[_tilt,90,0],'');
		// bottom holes
		// bottom right 5 pts
		// PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[125,-87,139],[16,0,0],'needle');
		// 0,-50,38 - abs : 0,-42,+139
		PCB.d_sprite.addCircle('hole_bottom_right',_size_holes,[125,-94,177],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['hole_sensor_center_right','sensor','hole','1'],[13,1,3],[125,-94,180],[9,0,0],'hole_debug',false,_hideHoleSensors);

		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[139,-90,157],[19,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[144,-90,166],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[111,-90,157],[19,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[108,-90,166],[17,0,0],'needle');
		// hole bumpers
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[139,-81,184],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[109,-81,184],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 33, 2],[122,-84,194],[107,0,90],'',false,_hideHoleBumper);
		// dummies
		PCB.d_sprite.addBumperMesh('hole_bottom_right_bumper','shortBumper',[3.9,3.6,3.6],[125,-75,165],[107,0,0],'metal');
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[143,-100,173],[17,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[107,-100,173],[17,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[125,-108,196],[_tilt,0,0],'metal',true);
		// debug
		// PCB.d_sprite.addBox('side_plunger_lane_guide_rear',[10, 30, 220],[95,-94,180],[_tilt,45,0],'');

		// bottom Center 15 points hole
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[0,-87,130],[16,0,0],'needle');
		// 0,-50,38 - abs : 0,-42,+139
		PCB.d_sprite.addCircle('hole_bottom_center',_size_holes,[0,-94,177],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['hole_sensor_center_middle','sensor','hole','3'],[13,1,3],[0,-94,180],[9,0,0],'hole_debug',false,_hideHoleSensors);

		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[14,-90,156],[16,0,2],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[18,-90,167],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-13,-90,156],[19,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-17,-90,167],[17,0,0],'needle');
		// hole bumpers
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[14,-81,184],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[-14,-81,184],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 33, 2],[-1,-84,194],[107,0,90],'',false,_hideHoleBumper);
		// dummies
		PCB.d_sprite.addBumperMesh('hole_bottom_center_bumper','shortBumper',[3.9,3.6,3.6],[0,-75,165],[107,0,0],'metal');
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[18,-100,173],[17,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-18,-100,173],[17,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[0,-108,196],[_tilt,0,0],'metal',true);
		// debug
		// PCB.d_sprite.addBox('side_plunger_lane_guide_rear',[10, 30, 220],[-30,-94,180],[_tilt,45,0],'');

		// left 5 pts
		// PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-125,-87,139],[16,0,0],'needle');
		// 0,-50,38 - abs : 0,-42,+139
		PCB.d_sprite.addCircle('hole_bottom_left',_size_holes,[-125,-94,177],[-73,0,0],'hole',true);
		PCB.d_sprite.addBox(['h_sensor_center_left','sensor','hole','1'],[13,1,3],[-125,-94,177],[17,0,0],'hole_debug',false,_hideHoleSensors);

		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-139,-90,156],[19,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-144,-90,166],[17,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-110,-90,156],[19,0,0],'needle');
		PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-108,-90,166],[17,0,0],'needle');
		// hole bumpers
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[-139,-81,184],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 21, 2],[-109,-81,184],[107,0,0],'',false,_hideHoleBumper);
		PCB.d_sprite.addCylynder('hole_physical_bumper',[2, 33, 2],[-122,-84,194],[107,0,90],'',false,_hideHoleBumper);
		// dummies
		PCB.d_sprite.addBumperMesh('hole_bottom_left_bumper','shortBumper',[3.9,3.6,3.6],[-125,-75,165],[107,0,0],'metal');
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-143,-100,173],[17,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-107,-100,173],[17,0,0],'metal',true);
		PCB.d_sprite.addCylynder('dummyNeedle',_size_needles,[-125,-108,196],[_tilt,0,0],'metal',true);
		// debug
		// PCB.d_sprite.addBox('side_plunger_lane_guide_rear',[10, 30, 220],[-95,-94,180],[_tilt,-45,0],'');
		/**
		 * Bottom needles
		 */
		 // right
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[78,-90,177],[17,0,0],'needle');
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[46,-90,177],[17,0,0],'needle');
		 // left
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-78,-90,177],[17,0,0],'needle');
		 PCB.d_sprite.addCylynder(['needle','sensor','needle'],_size_needles,[-46,-90,177],[17,0,0],'needle');

// 33
		// front_ball_guide. was 215,
		PCB.d_sprite.addBox('front_ball_guide_rail',[435, 10, 45],[30,-42,310],[-4,0,-1],'metal');
		// right in front of the front panel. was 230, (abs 110)
		PCB.d_sprite.addBox('front_ball_guide_tilt',[440, 60, 5],[30,-35,327],[23,0,0],'metal',false,false);
		// To cover the lost ball collector
		PCB.d_sprite.addBox('front_ball_guide_cover',[380, 5, 45],[0,-24,270],[17,0,0],'metal',true,false);
		PCB.d_sprite.addBox('front_ball_guide_cover_bottom',[388, 5, 30],[-5,-45,288],[110,0,0],'metal',false,false);
		// ball guide edge curve
		PCB.d_sprite.addBox('front_ball_guide_rail_edge_1',[20, 40, 60],[229,-42.1,310],[20,-35,0],'metal');
		PCB.d_sprite.addBox('front_ball_guide_rail_edge_invisible',[35, 120, 80],[229,-42.1,310],[20,-35,0],'wireframe',false,true);
	},
	tilt: function () {
		PCB.dsp_balls.wakeOimoPhysics();
		PCB.d_sprite.updatePositionRotation('front_ball_guide_rail',[30,-46,310],[-6,0,-2]);
		window.setTimeout( function () {
			PCB.d_sprite.updatePositionRotation('front_ball_guide_rail',[30,-42,310],[-4,0,-1]);
		},250);
	},
	/**
	 * Do tween for position
	 *
	 * @param      {<type>}    id        The d sprite identifier
	 * @param      {array}    position  The position. x, y, z.
	 * @param      {number}    duration  The duration in mms.
	 * @param      {Function}  easing    The easing. Default is TWEEN.Easing.Elastic.Out
	 */
	flipFlipHole:function(id) {
		// make sure that this flip hole is occupied for now
		ROM.d_sprite.cabinet['flipHole_accepts_' + id] = false;

		// obj targeted
		var _mesh = RAM.d_sprite.meshes['flipHole_'+id];
		var _body = RAM.d_sprite.bodies['flipHole_'+id];

		_mesh.flipProgress = 1;
		// default settings
		var _duration = 500;
		// set up tween
		var rad90 = Math.PI;
		var _targetRadian = (this['flipHole_side_'+id] === 0) ? 3.438 : 0.296; // flip
		// award
		if(this['flipHole_side_'+id] === 0) {
			PCB.dsp_balls.addBallDispenseSchedule(3);
		} else {
			PCB.dsp_balls.addBallDispenseSchedule(1);
		}
		// flip bits
		this['flipHole_side_'+id] = ~this['flipHole_side_'+id];
		// console.log(ROM.d_sprite.cabinet.flipHole_1_tween);
		var _tween = new TWEEN.Tween(_mesh.rotation).to({x:_targetRadian},_duration).easing(TWEEN.Easing.Back.Out).onUpdate(
			function (d) {
				_body.setQuaternion(_mesh.quaternion);
			}).onComplete(function(){
				ROM.d_sprite.cabinet['flipHole_accepts_'+id] = true;
			}).start();
	},
}

ROM.d_sprite.plunger = {
	/**
	 * Properties
	 */
	'plunger_state': false,
	'indicator_pivot': null,
	'keyPressMonitor': null,
	/**
	* methods
	*/
	add: function () {
		// side plunger lane shifter
		PCB.d_sprite.addBox('side_plunger_lane_ball_tilter_upper',[50, 50, 70],[221,-83,250],[-4,0,0],'');
		PCB.d_sprite.addBox('side_plunger_lane_ball_tilter_lower',[50, 50, 50],[215,-89,200],[-1,0,0],'');
		PCB.d_sprite.addBox('side_plunger_lane_ball_tilter_bottom',[30, 30, 30],[215,-85,184],[17,0,0],'');
		// cube parts
		PCB.d_sprite.addBox('side_plunger_lane_ball_stopper',[30, 40, 60],[218,-23,131],[20,0,0],'');
		// lane narrower
		PCB.d_sprite.addBox('side_plunger_lane_narrower_top',[30, 10, 110],[216,-18,160],[-10,0,0],'');
		PCB.d_sprite.addBox('side_plunger_lane_narrower_top_lower',[30, 10, 60],[216,-28,160],[-30,0,0],'');
		PCB.d_sprite.addBox('side_plunger_lane_narrower_side_right',[10, 90, 160],[234,-45,240],[19,4,0],'metal');
		// shooter (sensor)
		PCB.d_sprite.addBox(['ball_shooter_floor_sensor','sensor','ballShooter'],[35, 1, 40],[221,-90,164],[16,0,0],'',false,false,false);
		// shooter
		// PCB.d_sprite.addBox('ball_shooter',[70, 50, 100],[169,-85,100],[15,0,0],'',false,false,false);
		// indicator for plunger
		PCB.d_sprite.addCylynder('shooting_power_indicator',[1,25,1],[0,-10,3],[0,0,0],'lettering_red',true,false);
		PCB.d_sprite.addCylynder('shoot_button',[8,7,8],[0,0,0],[91,0,0],'shoot_button',true,false,true);
		PCB.d_sprite.addCylynder('shoot_button_foundation',[11,5,11],[0,0,3],[91,0,0],'metal',true,false,true);
		RAM.d_sprite.meshes.shoot_button.material.emissive.set(0xFEFEFE);
		RAM.d_sprite.meshes.shoot_button.material.emissiveIntensity = 0.3;
		// using group manager
		PCB.d_sprite.addToGroup('needle_measure_pivot','shooting_power_indicator');
		PCB.d_sprite.addToGroup('needle_measure_pivot','shoot_button');
		PCB.d_sprite.addToGroup('needle_measure_pivot','shoot_button_foundation');

		PCB.d_sprite.moveGroup('needle_measure_pivot',[220,35,180]);
		PCB.d_sprite.rotateGroup('needle_measure_pivot',[-17,0,-45]);
	},
	pullPlunger: function () {
		if(ROM.d_sprite.plunger.plunger_state === null) {
			clearInterval(ROM.d_sprite.plunger.keyPressMonitor);
			ROM.d_sprite.plunger.plunger_state = Date.now();
			ROM.d_sprite.plunger.keyPressMonitor = setInterval(ROM.d_sprite.plunger.updatePlungerState,50);
			RAM.d_sprite.meshes.shoot_button.material.emissiveIntensity = 0;
		}
	},
	updatePlungerState: function () {
		var _keyPressEndTime = Date.now();
		var _keyDownDuration = _keyPressEndTime - ROM.d_sprite.plunger.plunger_state;
		var _strengthScale = (_keyDownDuration > 900) ? 1 : _keyDownDuration/1000;
		PCB.d_sprite.rotateGroup('needle_measure_pivot',[-17,0,-45 + _strengthScale * 2]);
		if(PCB.dsp_balls.sensor_at_shooter) {
			if(_strengthScale > 0.37) RAM.d_sprite.meshes.shoot_button.material.emissive.set(0x003100);
			RAM.d_sprite.meshes.shoot_button.material.emissiveIntensity = _strengthScale;
		}
	},
	shootBall: function () {
		clearInterval(ROM.d_sprite.plunger.keyPressMonitor);
		var _keyPressEndTime = Date.now();
		var _keyDownDuration = _keyPressEndTime - ROM.d_sprite.plunger.plunger_state;
		var _strengthScale = (_keyDownDuration > 900) ? 1 : _keyDownDuration/1000;
		// sound
		PCB.audio.play('shoot_ball',_strengthScale);
		if(_strengthScale > 0.37) {
			PCB.dsp_balls.shootBall(15*_strengthScale);
		}
		ROM.d_sprite.cabinet.tilt();
		ROM.d_sprite.plunger.plunger_state = null;
		PCB.d_sprite.rotateGroup('needle_measure_pivot',[-17,0,-45]);
		RAM.d_sprite.meshes.shoot_button.material.emissiveIntensity = 0.2;
		RAM.d_sprite.meshes.shoot_button.material.emissive.set(0xFEFEFE);
	},
}

ROM.d_sprite.layout = {
	/**
	* methods
	*/
	add: function () {
		// top uppper right
		PCB.d_sprite.addJsonObjectMesh('five',[28,24,24],[55,5,-144],[17,0,0],'lettering_green');
		// top uppper left
		PCB.d_sprite.addJsonObjectMesh('five',[28,24,24],[-71,5,-144],[17,0,0],'lettering_green');
		// top lower left
		PCB.d_sprite.addJsonObjectMesh('five',[28,24,24],[118,-9,-100],[17,0,0],'lettering_green');
		// top lower center
		PCB.d_sprite.addJsonObjectMesh('five',[28,24,24],[-7,-10,-97],[17,0,0],'lettering_green');
		// top lower left
		PCB.d_sprite.addJsonObjectMesh('five',[28,24,24],[-131,-9,-100],[17,0,0],'lettering_green');
		// middle right
		PCB.d_sprite.addJsonObjectMesh('fifteen',[20,24,24],[115,-40,1],[17,0,0],'lettering_yellow');
		// middle center
		PCB.d_sprite.addJsonObjectMesh('fifteen',[20,24,24],[-11,-33,-22],[17,0,0],'lettering_yellow');
		PCB.d_sprite.addJsonObjectMesh('fifteen',[20,24,24],[-10,-40,1],[17,0,0],'lettering_yellow');
		// middle left
		PCB.d_sprite.addJsonObjectMesh('fifteen',[20,24,24],[-135,-40,1],[17,0,0],'lettering_yellow');
		// PCB.d_sprite.addPlane('testPngMaterial',[200,35,1],[0,40,-220],[-73,0,0],'testPngMaterial');
		PCB.d_sprite.addJsonObjectMesh('logo',[190,190,190],[-93,34,-240],[17,0,0],'logo_lettering');
		PCB.d_sprite.addJsonObjectMesh('rensho',[40,40,40],[-20.5,-67,90],[17,0,0],'lettering_red');
		/** stripe on both sides of rensho label 1 */
		PCB.d_sprite.addPlane('rensho',[26,13,1],[35,-70,99],[-73,0,0],'lettering_red');
		PCB.d_sprite.addPlane('rensho',[26,13,1],[-35,-70,99],[-73,0,0],'lettering_red');
		PCB.d_sprite.addJsonObjectMesh('twenty',[23,27,27],[-12,-74,113],[17,0,0],'lettering_red');
		PCB.d_sprite.addJsonObjectMesh('fifteen',[20,24,24],[-9,-82,140],[17,0,0],'lettering_yellow');
		PCB.d_sprite.addJsonObjectMesh('five',[28,24,24],[117,-82,140],[17,0,0],'lettering_green');
		PCB.d_sprite.addJsonObjectMesh('five',[28,24,24],[-133,-82,140],[17,0,0],'lettering_green');

		// rear box lettering
		PCB.d_sprite.addJsonObjectMesh('smartball',[300,300,300],[-117,320,-254],[90,0,0],'logo_lettering');
	}
}

ROM.d_sprite.buttons = {
	/**
	* methods
	*/
	add: function () {
		// start button
		PCB.d_sprite.addCylynder('start_button',[14,6,14],[0,0,-4],[91,0,0],'lettering_red',true,false,true);
		// foundation
		PCB.d_sprite.addCylynder('start_button_foundation',[16,4,16],[0,0,0],[91,0,0],'metal',true,false,true);
		// label
		PCB.d_sprite.addJsonObjectMesh(['start_button_label','start'],[28,28,28],[-13,25,1],[-91,0,0],'lettering_red');
		// group
		PCB.d_sprite.addToGroup('start_button_group','start_button');
		PCB.d_sprite.addToGroup('start_button_group','start_button_foundation');
		PCB.d_sprite.addToGroup('start_button_group','start_button_label');
		PCB.d_sprite.moveGroup('start_button_group',[217,57,100]);
		PCB.d_sprite.rotateGroup('start_button_group',[-17,0,0]);

		// exchange button
		PCB.d_sprite.addCylynder('payout_button',[14,6,14],[0,0,-4],[91,0,0],'lettering_green',true,false,true);
		// foundation
		PCB.d_sprite.addCylynder('payout_button_foundation',[16,4,16],[0,0,0],[91,0,0],'metal',true,false,true);
		// labels
		PCB.d_sprite.addJsonObjectMesh(['payout_button_label','payout'],[28,28,28],[-13,25,1],[-91,0,0],'lettering_green');

		PCB.d_sprite.addToGroup('payout_button_group','payout_button');
		PCB.d_sprite.addToGroup('payout_button_group','payout_button_foundation');
		PCB.d_sprite.addToGroup('payout_button_group','payout_button_label');
		PCB.d_sprite.moveGroup('payout_button_group',[217,75,40]);
		PCB.d_sprite.rotateGroup('payout_button_group',[-17,0,0]);
	},
	/**
	 * Dispense balls. 20 balls at a time. Up to max 50 balls on board or request ignored.
	 * 50 credits for 20 balls.
	 */
	dispenseBalls: function () {
		// check up credits 1st,
		if(Register.creditCount < 50) {
			PCB.init.updateCreditsCounter();
			return false;
		}
		// make sure  the ball on board is under 50
		var _currentBallNum = PCB.dsp_balls.bodies.length;
		var _ballDispenserPendingNum = PCB.dsp_balls.release_ball_counter * 5;
		if(_currentBallNum + _ballDispenserPendingNum < 51) {
			PCB.dsp_balls.addBallDispenseSchedule(4);
		}
		// update credit and display
		PCB.init.updateCreditsCounter(-50);
	},
	exhangeBalls: function () {
		if(!PCB.dsp_balls.bodies) return false;
		var _removeList = [];
		var _i = PCB.dsp_balls.bodies.length;
		var _counter = 19; // max of 20 balls echanged at a time
		while (_i--){
			_body = PCB.dsp_balls.bodies[_i];
			if(!_body) continue;
			if(_body.type === 1) {
				// skip rensho ball set to type 2.
				_removeList.push(_i);
			}
			_counter --;
			if(_counter < 0) break;
		} // end while loop
		// Payout
		PCB.init.updateCreditsCounter(_removeList.length);
		// remove balls
		if(_removeList.length > 0) {
			_i = 0;
			var _removeListLength = _removeList.length;
			while (_i < _removeListLength){
				var _removalTarget = _removeList[_i];
				// remove body
				if(PCB.dsp_balls.bodies[_removalTarget]) {
					PCB.gpu.world.removeRigidBody(PCB.dsp_balls.bodies[_removalTarget]);
					PCB.dsp_balls.bodies.splice(_removalTarget,1);
				}
				// remove meshes
				if(PCB.dsp_balls.meshes[_removalTarget]) {
					PCB.gpu.scene.remove(PCB.dsp_balls.meshes[_removalTarget]);
					PCB.dsp_balls.meshes.splice(_removalTarget,1);
				}
				// increment
				_i=(_i+1)|0;
			}
			// reindex
			PCB.dsp_balls.bodies.filter(val => val);
			PCB.dsp_balls.meshes.filter(val => val);
			PCB.dsp_balls.sensor_at_shooter = null;
		}
	}
}

