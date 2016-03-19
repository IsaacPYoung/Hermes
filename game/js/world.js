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

	preload: function() {

		// the ground
		game.load.image('ground_top_1', 'assets/world/ground tile top 1.png');
		game.load.image('ground_top_2', 'assets/world/ground tile top 2.png');
		game.load.image('ground_top_3', 'assets/world/ground tile top 3.png');
		game.load.image('ground_bottom_1', 'assets/world/ground tile bottom 1.png');
		game.load.image('ground_bottom_2', 'assets/world/ground tile bottom 2.png');
		game.load.image('ground_bottom_3', 'assets/world/ground tile bottom 3.png');

		// the enemies
		game.load.image('enemy_1', 'assets/enemies/enemy1.png');
		game.load.image('enemy_2', 'assets/enemies/enemy2.png');
		game.load.image('enemy_3', 'assets/enemies/enemy3.png');
	},

	create: function() {

		world.ground_group = game.add.group();
		world.ground_group.enableBody = true;
		world.ground_tiles = [];
		world.ground_bottom_tiles = [];

		world.enemy_group = game.add.group();
		world.enemy_group.enableBody = true;
		world.enemies = [];

		for (i = 0; i * TileWidth < GameWidth * 2; i++)
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

			if (i * TileWidth > GameWidth && Math.random() < world.enemy_frequency)
			{
				world.spawn_enemy();
			}

		}
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
		
		xoff = world.ground_tiles[world.ground_tiles.length - 1].position.x + TileWidth;

		tmp = world.ground_tiles.shift();
		tmp.position.x = xoff;
		world.ground_tiles.push(tmp);

		tmp = world.ground_bottom_tiles.shift();
		tmp.position.x = xoff;
		world.ground_bottom_tiles.push(tmp);

	},

	spawn_enemy: function() {
		xoff = world.ground_tiles[world.ground_tiles.length - 1].position.x;
		yoff = GameHeight - 2 * TileHeight - PlayerHeight;
		enemy = 'enemy_' + Math.floor(Math.random() * 3 + 1);
		world.enemies.push(world.enemy_group.create(xoff, yoff, enemy));
		world.enemies[world.enemies.length - 1].body.gravity.y = 300;
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
	}
};