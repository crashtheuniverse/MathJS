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

	this.normalize = function() {
		var invLen = 1.0 / this.getLength();
		this.x *= invLen;
		this.y *= invLen; 
		this.z *= invLen;
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
