var uiBinaryTree = function(bi, canvas) {
	var self = {},
		ctx = canvas.getContext('2d');
	
	var nodeRadius = 20;
	
	function drawCircle(coords, value, color) {
		ctx.strokeStyle = color || 'black';
		ctx.beginPath();
		ctx.arc(coords[0], coords[1], nodeRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillText(value, coords[0], coords[1]);
		ctx.stroke();
	}
	function drawLine(start, end) {
		ctx.moveTo(start[0], start[1]);
		ctx.lineTo(end[0], end[1]);
		ctx.stroke();
	}
	
	function drawTree() {
		var levelLength = 7 * nodeRadius,
			angleFactor = 3;
		
		var drawNode = function(tree) {
			var idx = tree.childIndex;
			if (idx !== undefined) {
				var x, y, angle = Math.PI/angleFactor++;
				// starting point of branch from parent node
				x = -nodeRadius * Math.pow(-1, idx) * Math.cos(Math.PI/4);
				y = nodeRadius * Math.sin(Math.PI/4);
				ctx.moveTo(x, y);
								
				ctx.save();
				// go to center position of child node
				ctx.translate(-levelLength * Math.pow(-1, idx) * Math.sin(angle), levelLength * Math.cos(angle));
			//	ctx.scale(0.9, 0.9);
				//ctx.translate(-levelLength * Math.pow(-1, idx) * Math.sin(angle), levelLength * Math.cos(angle));

				// end point of the branch started from parent node
				x = Math.pow(-1, idx) * nodeRadius * Math.cos(Math.PI/4);
				y = -nodeRadius * Math.sin(Math.PI/4);
				ctx.lineTo(x, y);
				
				ctx.stroke();
			}			
			drawCircle([0,0], tree.root());
			//ctx.moveTo(0, -nodeRadius); ctx.lineTo(0, nodeRadius);
			// ctx.moveTo(-nodeRadius, 0); ctx.lineTo(nodeRadius, 0);
		};
		var returnBack = function() { 
			angleFactor--;
			ctx.restore(); 
		};
	
		ctx.save()
		ctx.translate(canvas.width / 2, 50);
		
		bi.DFS({ onBubble: drawNode, onFinishBubble: returnBack });
	}
	
	self.prototype = bi;
	self.create = drawTree;
	
	return self;
};