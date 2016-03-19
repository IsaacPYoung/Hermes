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

	// set world bounds
	//game.world.setBounds(0, 0, GameWidth * 2, GameHeight);

	// run the creates
	world.create();
	player.create();

	// track the player
	//game.camera.follow(player.get(), game.camera.FOLLOW_LOCKON);

}

function update() {

	// update stuff
	world.update();
	player.update();

	// track the player
	//game.camera.x = player.location().x - PlayerOffset;

	// pay the physics bill on time
	physics();
}

function physics() {

	// run collision checks
	game.physics.arcade.collide(player.get(), world.get_ground());
}