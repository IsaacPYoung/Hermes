// the game
var game = new Phaser.Game(GameWidth, GameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	
	// run the preloads
	world.preload();
	player.preload();
	hud.preload();

}

function create() {

	// start physics first
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// smooth out movement a bit
	game.renderer.renderSession.roundPixels = true;

	// run the creates
	input.create();
	world.create();
	player.create();
	hud.create();

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
	game.physics.arcade.overlap(player.get(), world.get_enemies(), game_over);
}

function game_over() {
	GameOver = true;
}