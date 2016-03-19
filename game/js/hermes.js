// the game
var game = new Phaser.Game(GameWidth, GameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	
	// run the preloads
	world.preload();
	player.preload();

}

function create() {

	// start physics first
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// smooth out movement a bit
	game.renderer.renderSession.roundPixels = true;

	// run the creates
	world.create();
	player.create();

}

function update() {

	// update stuff
	world.update();
	player.update();

	// pay the physics bill on time
	physics();
}

function physics() {

	// run collision checks
	game.physics.arcade.collide(player.get(), world.get_ground());
	game.physics.arcade.collide(world.get_enemies(), world.get_ground());
}