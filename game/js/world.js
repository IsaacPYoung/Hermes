// the game world
var world = {

	// the ground tiles
	ground_group: null,
	ground_tiles: null,

	// the enemies
	enemy_group: null,
	enemies: null,

	// how often enemies are spawned
	enemy_frequency: 0.1,

	preload: function() {

		// the ground
		game.load.image('ground_top', 'assets/world/Basic_Ground_Top_Pixel.png');

		// the enemies
		game.load.image('enemy_1', 'assets/enemies/enemy1.png');
		game.load.image('enemy_2', 'assets/enemies/enemy2.png');
		game.load.image('enemy_3', 'assets/enemies/enemy3.png');
	},

	create: function() {

		world.ground_group = game.add.group();
		world.ground_group.enableBody = true;

		world.ground_tiles = [];

		for (i = 0; i * TileWidth < GameWidth * 2; i++)
		{
			world.ground_tiles.push(world.ground_group.create(i * TileWidth, GameHeight - TileHeight, 'ground_top'));
			world.ground_tiles[i].body.immovable = true;
			world.ground_tiles[i].body.velocity.x = -PlayerSpeed;

			if (i * TileWidth > GameWidth && Math.random() < world.enemy_frequency)
			{
				world.spawn_enemy;
			}

		}

		world.enemy_group = game.add.group();
		world.enemy_group.enableBody = true;
		world.enemies = [];
	},

	update: function() {

		// recycle the ground tiles
		if (world.ground_tiles[0].position.x < -TileWidth)
		{
			world.move_first_tile_to_end();

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
		tmp = world.ground_tiles.shift();
		tmp.position.x = world.ground_tiles[world.ground_tiles.length - 1].position.x + TileWidth;
		world.ground_tiles.push(tmp);

	},

	spawn_enemy: function() {
		xoff = world.ground_tiles[world.ground_tiles.length - 1].position.x;
		yoff = GameHeight - TileHeight - PlayerHeight;
		enemy = 'enemy_' + Math.floor(Math.random() * 3 + 1);
		world.enemies.push(world.enemy_group.create(xoff, yoff, enemy));
		world.enemies[world.enemies.length - 1].body.gravity.y = 300;
	},
};