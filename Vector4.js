/**
 * @author CrashTheuniversE
 */
MW.Vector4 = function(x, y, z, w) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
	
	this.getSquaredLength = function() {
		return ( (this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w) ); 
	}

	this.getLength = function() { 
		return Math.sqrt( this.getSquaredLength());
	}
	
	this.getNormalized = function() { 
		var v = new MW.Vector4(); 
		v.normalize();
		return v;	
	}
	
	this.zero = function() { 
		this.x = 0.0; 
		this.y = 0.0; 
		this.z = 0.0;
		this.w = 0.0;	
	}

	this.normalize = function() {
		var invLen = 1.0 / this.getLength();
		this.x *= invLen;
		this.y *= invLen; 
		this.z *= invLen;
		this.w *= invLen;
	}

	this.arraySet = function(a) {
		this.x = a[0]; this.y = a[1]; this.z = a[2]; this.w = a[3];
	}

	this.set = function(x, y, z, w) {
		this.x = x;
		this.y = y || x;
		this.z = z || x;
		this.w = w || x;
	}

	this.isEqual = function(v) { 
		
		if( (this.x == v.x) && (this.y == v.y) && (this.z == v.z) && (this.w == v.w)) {
			return true;
		}
			
		return false;
	}
	
	this.toString = function() { 
		return "Vector4 " + " X:" + this.x + " Y:" + this.y + " Z:" + this.z + " W:" + this.w;	
	}
}