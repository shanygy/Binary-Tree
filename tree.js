Object.prototype.deepCopy = function() {
	function helper(obj) {
		if (Object.prototype.toString.call(obj) === '[object Array]') {
			var out = [], i = 0, len = obj.length;
			for ( ; i < len; i++ ) {
				out[i] = arguments.callee(obj[i]);
			}
			return out;
		}
		if (typeof obj === 'object') {
			var out = Object.create(obj.constructor.prototype), i;
			for ( i in obj ) {
				if (obj.hasOwnProperty(i)) {
					out[i] = arguments.callee(obj[i]);
				}
			}
			return out;
		}
		return obj;
	}
	
	return helper(this);
}

function Tree(rootValue) {
	function init() {
		this.root(rootValue);
	}
	
	this.root = function(value) {
		if (typeof value !== 'undefined') {
			this.value = value;
		}
		return this.value;
	}
	this.updateNthChild = function(n, value) {
		if (!this.value) { throw new Tree.errors.EmptyTree('Tree is empty'); }
		if (!value) { throw new Tree.errors.EmptyValue('Cannot add an empty son'); }
		
		value.childIndex = n;
		this._children[n] = value;
		return value;
	};
	
	this.getChildren = function() {
		return this._children;
	};

	init.call(this);
}

Tree.errors = (function() {
	var EmptyValueError, EmptyTreeError;
	
	EmptyValueError = function EmptyValueError(message) {
		this.message = message;
		this.type = arguments.callee.toString(0).match(/^function\s*(?:\s+([\w\$]*))?\s*\(/)[1];
	};	
	EmptyTreeError = function EmptyTreeError(message) {
		this.message = message;
		this.type = arguments.callee.toString(0).match(/^function\s*(?:\s+([\w\$]*))?\s*\(/)[1];
	};

	EmptyValueError.prototype = new Error();
	EmptyTreeError.prototype = new Error();
	
	return {
		EmptyValue: EmptyValueError,
		EmptyTree: EmptyTreeError
	}
})();
