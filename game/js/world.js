// the game world
var world = {

	// the ground tiles
	ground_group: null,
	ground_tiles: null,

	preload: function() {

		//the ground
		game.load.image('ground_top', 'assets/world/Basic_Ground_Top_Pixel.png');
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
		}
	},

	update: function() {

		if (world.ground_tiles[0].position.x < -TileWidth)
		{
			tmp = world.ground_tiles.shift();
			tmp.position.x = world.ground_tiles[world.ground_tiles.length - 1].position.x + TileWidth;
			world.ground_tiles.push(tmp);
		}
	},

	get_ground: function() {
		return world.ground_group;
	},
};