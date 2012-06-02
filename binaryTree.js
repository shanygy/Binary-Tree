function BiTree(values) {
	function noop() {};
	
	// Provides a helper data structure, representing a queue
	function Queue() {
		var data = [];
		
		this.data = data;
		this.enqueue = function(value) { data.push(value); };
		this.dequeue = function() { return data.splice(0,1)[0]; };
		this.count = function() { return data.length; }
	};
	
	function init() {
		/Array/.test(Object.prototype.toString.call(values)) && create.call(this, values);
	}

	function create(arrValues) {
		for (var i=0; i<arrValues.length; i++) {
			this.insert(arrValues[i]);
		}
		return this;
	}
		
	this._children = [];
	
	this.left = function() {
		return this.getChildren()[0];
	}
	
	this.right = function() {
		return this.getChildren()[1];
	}
	
	this.insert = function(value) {
		var insertHelper = function(tree) {
			var root = tree.root();
			if (!root) { 
				tree.root(value);
			}
			else {
				if (value < root) {
					var left = tree.left();
					(!left && tree.updateNthChild(0, new BiTree([value]))) ||
					(left && insertHelper(left));
				}
				else if (value > root) {
					var right = tree.right();
					(!right && tree.updateNthChild(1, new BiTree([value]))) ||
					(right && insertHelper(right));
				}
			}
			return tree;
		};
		
		return insertHelper(this);
	};

	this.DFS = function(callbacks) {
		var result = [],
			onBubble = callbacks.onBubble || noop,
			onFinishBubble = callbacks.onFinishBubble || noop;
		
		function DFShelper(tree) {
			if (!tree) { return; }
			else {
				var root = tree.root();
				result.push(root);
				onBubble(tree);
				
				DFShelper(tree.left());
				DFShelper(tree.right());
				onFinishBubble();
			}
		}
		DFShelper(this);
		
		return result;
	};
	
	this.BFS = function(callback) {
		var result = [],
			queue = new Queue(),
			callback = callback || function() {};

		function BFShelper(tree) {
			var newTree,
				val;
			
			if (tree) { 			
				val = tree.root();
				result.push(val);
				callback(tree);
				queue.enqueue(tree.left());
				queue.enqueue(tree.right());
			}
			if (queue.count() > 0) {
				newTree = queue.dequeue();
				BFShelper(newTree);
			}
			return;
		}
		
		BFShelper(this);
		
		return result;
	};
	
	init.call(this);
}

BiTree.prototype = new Tree();