// the game world
var world = {

	// the ground tiles
	ground_group: null,
	ground_tiles: null,
	ground_bottom_tiles: null,

	// the enemies
	enemy_group: null,
	enemies: null,

	// how often enemies are spawned
	enemy_frequency: 0.1,

	// 'biomes' for foliage variation
	biomes: null,
	current_biome: 0,
	biome_counter: 20,

	// music
	music: null,

	preload: function() {

		// the ground
		game.load.image('ground_top_1', 'assets/world/ground tile top 1.png');
		game.load.image('ground_top_2', 'assets/world/ground tile top 2.png');
		game.load.image('ground_top_3', 'assets/world/ground tile top 3.png');
		game.load.image('ground_bottom_1', 'assets/world/ground tile bottom 1.png');
		game.load.image('ground_bottom_2', 'assets/world/ground tile bottom 2.png');
		game.load.image('ground_bottom_3', 'assets/world/ground tile bottom 3.png');

		// foliage
		game.load.image('fir_tree', 'assets/world/pinefirtree.png'); // 64x128
		game.load.image('rose_bush', 'assets/world/RoseBush.png'); // 24x24
		game.load.image('grass_1', 'assets/world/grass 1.png'); //16x16
		game.load.image('grass_2', 'assets/world/grass 2.png'); //16x16
		game.load.image('grass_3', 'assets/world/grass 3.png'); //16x16
		game.load.image('rocks_1', 'assets/world/rocks 1.png'); //16x16
		game.load.image('rocks_2', 'assets/world/rocks 2.png'); //16x16
		game.load.image('rocks_3', 'assets/world/rocks 3.png'); //16x16

		// the enemies
		game.load.image('enemy_1', 'assets/enemies/enemy1.png');
		game.load.image('enemy_2', 'assets/enemies/enemy2.png');
		game.load.image('enemy_3', 'assets/enemies/enemy3.png');

		// audio
		game.load.audio('exodus', 'assets/audio/exodus.mp3');
	},

	create: function() {

		world.create_biomes();

		world.ground_group = game.add.group();
		world.ground_group.enableBody = true;
		world.ground_tiles = [];
		world.ground_bottom_tiles = [];

		world.enemy_group = game.add.group();
		world.enemy_group.enableBody = true;
		world.enemies = [];

		for (var i = 0; i * TileWidth < GameWidth * 2; i++)
		{
			xoff = i * TileWidth;
			yoff = GameHeight - 2 * TileHeight;

			world.ground_tiles.push(world.ground_group.create(xoff, yoff, world.get_tile_texture(true)));
			world.ground_tiles[i].body.immovable = true;
			world.ground_tiles[i].body.velocity.x = -PlayerSpeed;

			yoff += TileHeight;

			world.ground_bottom_tiles.push(world.ground_group.create(xoff, yoff, world.get_tile_texture(false)));
			world.ground_bottom_tiles[i].immovable = true;
			world.ground_bottom_tiles[i].body.velocity.x = -PlayerSpeed;

			//console.log('new tile');
			world.check_foliage();

			if (i * TileWidth > GameWidth && Math.random() < world.enemy_frequency)
			{
				world.spawn_enemy();
			}
		}

		world.start_music();
	},

	update: function() {

		if (GameOver)
		{
			for (i = 0; i < world.ground_tiles.length; i++)
			{
				world.ground_tiles[i].body.velocity.x = 0;
				world.ground_bottom_tiles[i].body.velocity.x = 0;
			}
		}

		// recycle the ground tiles
		if (world.ground_tiles[0].position.x < -(2 * TileWidth))
		{
			world.move_first_tile_to_end();

			world.check_foliage();

			if (Math.random() < world.enemy_frequency)
			{
				world.spawn_enemy();
			}
		}
	},

	get_ground: function() {
		return world.ground_group;
	},

	get_enemies: function() {
		return world.enemy_group;
	},

	move_first_tile_to_end: function() {
		
		xoff = world.ground_tiles[world.ground_tiles.length - 1].position.x + TileWidth;

		tmp = world.ground_tiles.shift();
		tmp.position.x = xoff;
		tmp.removeChildren();
		world.ground_tiles.push(tmp);

		tmp = world.ground_bottom_tiles.shift();
		tmp.position.x = xoff;
		world.ground_bottom_tiles.push(tmp);

		// woot! #winning
		hud.update_score(1);

	},

	spawn_enemy: function() {
		xoff = world.ground_tiles[world.ground_tiles.length - 1].position.x;
		yoff = GameHeight - 2 * TileHeight - PlayerHeight * Scale;
		enemy = 'enemy_1';// + Math.floor(Math.random() * 3 + 1);
		world.enemies.push(world.enemy_group.create(xoff, yoff, enemy));
		world.enemies[world.enemies.length - 1].body.gravity.y = 300;
		world.enemies[world.enemies.length - 1].scale.set(Scale);
	},

	kill_enemy: function(index) {
		if (index >= 0 && index < world.enemies.length)
		{
			world.enemy_group.remove(world.enemies[index]);
			world.enemies.splice(index, 1);
		}
	},

	get_tile_texture: function(top) {
		texture = 'ground_';
		texture += top == true ? 'top_' : 'bottom_';
		texture += Math.floor(Math.random() * 3 + 1);
		return texture;
	},

	start_music: function() {
		if (world.music == null)
		{
			world.music = game.add.audio('exodus');
			world.music.loopFull();
		}
	},

	check_foliage: function() {
		
		world.biome_counter--;
		if (world.biome_counter <= 0)
		{
			world.current_biome = Math.floor(Math.random() * world.biomes.length);
			world.biome_counter = Math.floor(world.biomes[world.current_biome].size * (Math.random() * 0.4 + 0.8));
			console.log(world.biomes[world.current_biome].name + ' | ' + world.biome_counter);
		}
		
		if (Math.random() < world.biomes[world.current_biome].object_density)
		{
			xoff = 0;
			yoff = 0;

			num = Math.random();
			for (var i = 0; i < world.biomes[world.current_biome].type_densities.length; i++)
			{
				if (num < world.biomes[world.current_biome].type_densities[i].density)
				{
					type = world.biomes[world.current_biome].type_densities[i].type;
					
					xoff = Math.floor((Math.random() - 0.5) * world.get_object_width(type));
					yoff = -(world.get_object_height(type));
					//yoff = Math.floor(Math.random() * 0.1 * world.get_object_height(type)) - world.get_object_height(type);
					
					world.ground_tiles[world.ground_tiles.length - 1]
						.addChild(game.make.sprite(xoff, yoff, type))
						.scale.set(Scale);
				}
				else
				{
					num -= world.biomes[world.current_biome].type_densities[i].density;
				}
			}
		}		
	},

	get_object_height: function(type) {
		result = 0;
		switch (type) {
			case 'grass_1':
			case 'grass_2':
			case 'grass_3':
			case 'rocks_1':
			case 'rocks_2':
			case 'rocks_3':
				result = 16;
				break;
			case 'rose_bush':
				result = 24;
				break;
			case 'fir_tree':
				result = 128;
				break;
			default:
				result = 0;
				break;
		}
		result *= Scale;

		return result;
	},

	get_object_width: function(type) {
		result = 0;
		switch (type) {
			case 'grass_1':
			case 'grass_2':
			case 'grass_3':
			case 'rocks_1':
			case 'rocks_2':
			case 'rocks_3':
				result = 16;
				break;
			case 'rose_bush':
				result = 24;
				break;
			case 'fir_tree':
				result = 64;
				break;
			default:
				result = 0;
				break;
		}
		result *= Scale;
		
		return result;
	},

	create_biomes: function() {
		
		world.biomes = [];

		world.biomes.push({
			name: 'barren_desert',
			size: 16,
			object_density: 0,
			type_densities: [],
		});

		world.biomes.push({
			name: 'desert',
			size: 32,
			object_density: 0.1,
			type_densities: [{
				type: 'rocks_1',
				density: 0.25,
			}, {
				type: 'rocks_2',
				density: 0.4,
			}, {
				type: 'rocks_3',
				density: 0.25,
			}, {
				type: 'grass_1',
				density: 0.1
			}],
		});

		world.biomes.push({
			name: 'rocky_desert',
			size: 32,
			object_density: 0.5,
			type_densities: [{
				type: 'rocks_1',
				density: 0.3,
			}, {
				type: 'rocks_2',
				density: 0.25,
			}, {
				type: 'rocks_3',
				density: 0.35,
			}, {
				type: 'grass_3',
				density: 0.1
			}],
		});

		world.biomes.push({
			name: 'forest',
			size: 32,
			object_density: 0.6,
			type_densities: [{
				type: 'fir_tree',
				density: 0.45,
			}, {
				type: 'rose_bush',
				density: 0.2,
			}, {
				type: 'grass_1',
				density: 0.1,
			}, {
				type: 'grass_2',
				density: 0.1,
			}, {
				type: 'grass_3',
				density: 0.05,
			}, {
				type: 'rocks_2',
				density: 0.05
			}, {
				type: 'rocks_3',
				density: 0.05
			}],
		});

		world.biomes.push({
			name: 'dense_forest',
			size: 32,
			object_density: 0.7,
			type_densities: [{
				type: 'fir_tree',
				density: 0.65,
			}, {
				type: 'rose_bush',
				density: 0.25,
			}, {
				type: 'grass_3',
				density: 0.05,
			}, {
				type: 'rocks_1',
				density: 0.05
			}],
		});

		world.biomes.push({
			name: 'meadow',
			size: 48,
			object_density: 0.8,
			type_densities: [{
				type: 'fir_tree',
				density: 0.05,
			}, {
				type: 'rose_bush',
				density: 0.4,
			}, {
				type: 'grass_1',
				density: 0.15,
			}, {
				type: 'grass_2',
				density: 0.15,
			}, {
				type: 'grass_3',
				density: 0.2,
			}, {
				type: 'rocks_2',
				density: 0.05,
			}],
		});

		world.biomes.push({
			name: 'field',
			size: 64,
			object_density: 0.8,
			type_densities: [{
				type: 'fir_tree',
				density: 0.1,
			}, {
				type: 'rose_bush',
				density: 0.15,
			}, {
				type: 'grass_1',
				density: 0.2,
			}, {
				type: 'grass_2',
				density: 0.25,
			}, {
				type: 'grass_3',
				density: 0.2,
			}, {
				type: 'rocks_1',
				density: 0.05,
			}, {
				type: 'rocks_3',
				density: 0.05,
			}],
		});

		world.biomes.push({
			name: 'sparse_forest',
			object_density: 0.5,
			size: 32,
			type_densities: [{
				type: 'fir_tree',
				density: 0.6,
			}, {
				type: 'rose_bush',
				density: 0.1,
			}, {
				type: 'grass_2',
				density: 0.1,
			}, {
				type: 'grass_3',
				density: 0.1,
			}, {
				type: 'rocks_3',
				density: 0.1,
			}],
		});
	},
};