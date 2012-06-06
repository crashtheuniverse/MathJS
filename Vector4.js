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

	this.getArray = function() { 
		return [this.x, this.y, this.z, this.w];
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
		this.y = (y === undefined) ? x : y;
		this.z = (z === undefined) ? x : z;
		this.w = (w === undefined) ? x : w;
	}

	this.equal = function(v) { 
		if( Math.abs(this.x - v.x) > 0.00001 ) return false; 
		if( Math.abs(this.y - v.y) > 0.00001 ) return false;
		if( Math.abs(this.z - v.z) > 0.00001 ) return false;
		if( Math.abs(this.w - v.w) > 0.00001 ) return false;
		return true;
	}
	
	this.toString = function() { 
		return "Vector4 " + " X:" + this.x + " Y:" + this.y + " Z:" + this.z + " W:" + this.w;	
	}
}