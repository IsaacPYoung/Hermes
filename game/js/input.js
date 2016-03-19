// input handler
var input = {

	create: function() {
		game.input.onDown.add(input.on_click, input);
	},

	is_click_on_object: function (obj, clickX, clickY) {
		return 	clickX >= obj.position.x &&
				clickX <= obj.position.x + obj.width &&
				clickY >= obj.position.y &&
				clickY <= obj.position.y + obj.height;
	},

	on_click: function() {
		if (!GameOver)
		{
			for (i =  0; i < world.enemies.length; i++)
			{
				if (input.is_click_on_object(world.enemies[i], game.input.x, game.input.y))
				{
					world.kill_enemy(i);
					break;
				}
			}
		}
	}
};