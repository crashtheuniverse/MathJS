/**
 * @author CrashTheuniversE
 */
MW.Vector2 = function(x, y) {
	this.x = x;
	this.y = y;

	this.getSquaredLength = function() {
		return ( (this.x * this.x) + (this.y * this.y) ); 
	}

	this.getLength = function() { 
		return Math.sqrt( this.getSquaredLength());
	}
	
	this.getNormalized = function() { 
		var v = new MW.Vector2(); 
		v.normalize();
		return v;	
	}
	
	this.zero = function() { 
		this.x = 0.0; 
		this.y = 0.0; 
	}

	this.normalize = function() {
		var invLen = 1.0 / this.getLength();
		this.x *= invLen;
		this.y *= invLen; 
	}

	this.arraySet = function(a) {
		this.x = a[0]; this.y = a[1];
	}

	this.set = function(x, y) {
		this.x = x;
		this.y = y || x;
	}

	this.isEqual = function(v) { 
		
		if( (this.x == v.x) && (this.y == v.y) ) {
			return true;
		}
			
		return false;
	}

	this.toString = function() { 
		return "Vector2 " + " X:" + this.x + " Y:" + this.y;	
	}
}
