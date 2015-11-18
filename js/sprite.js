var sprite = function(options) {
	
	var that = {},
		frameIndex = 0,
		tickCount = 0;
		
	that.ticksPerFrame = options.ticksPerFrame ,
	that.numberOfFrames = options.numberOfFrames ;
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.posX = options.posX;
	that.posY = options.posY;
	that.image = options.image;
	
	that.update = function () {
		tickCount += 1;

		if (tickCount > that.ticksPerFrame) {

			tickCount = 0;
			
			// If the current frame index is in range
			if (frameIndex < that.numberOfFrames - 1) {	
				// Go to the next frame
				frameIndex += 1;
			} else {
				frameIndex = 0;
			}
		}
	};
	
	that.updatePos = function(x,y)
	{
		that.posX = x;
		that.posY = y;
	}
	
	return that;
}