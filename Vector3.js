/**
 * @author CrashTheuniversE
 */
MW.Vector3 = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.getSquaredLength = function() {
		return ( (this.x * this.x) + (this.y * this.y) + (this.z * this.z) ); 
	}

	this.getLength = function() { 
		return Math.sqrt( this.getSquaredLength());
	}
	
	this.getNormalized = function() { 
		var v = new MW.Vector3(); 
		v.normalize();
		return v;	
	}
	
	this.zero = function() { 
		this.x = 0.0; 
		this.y = 0.0; 
		this.z = 0.0;	
	}

	this.normalize = function() {
		var invLen = 1.0 / this.getLength();
		this.x *= invLen;
		this.y *= invLen; 
		this.z *= invLen;
	}

	this.arraySet = function(a) {
		this.x = a[0]; this.y = a[1]; this.z = a[2];
	}

	this.set = function(x, y, z) {
		this.x = x;
		this.y = y || x;
		this.z = z || x;
	}

	this.isEqual = function(v) { 
		
		if( (this.x == v.x) && (this.y == v.y) && (this.z == v.z) ) {
			return true;
		}
			
		return false;
	}
	
	this.toString = function() { 
		return "Vector3 " + " X:" + this.x + " Y:" + this.y + " Z:" + this.z;	
	}
}

MW.Vector3.zero = function() {
	var v = new MW.Vector3(0.0, 0.0, 0.0);
	return v; 
}
