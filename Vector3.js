/**
 * @author CrashTheuniversE
 */
MW.Vector3 = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};

MW.Vector3.prototype = {
    
    constructor: MW.Vector3,
    
    squaredLength: function() { 
    	return ( (this.x * this.x) + (this.y * this.y) + (this.z * this.z) );
    },
    
    length: function() { 
    	return Math.sqrt( this.squaredLength());
    },
    
    normalize: function() { 
		var invLen = 1.0 / this.length();
		this.x *= invLen;
		this.y *= invLen; 
		this.z *= invLen;
    },
    
    zero: function() { 
    	this.x = 0.0; this.y = 0.0; this.z = 0.0;
    },
	
	set: function(x,y,z) { 
		this.x = x;
		this.y = (y === undefined) ? x : y;
		this.z = (z === undefined) ? x : z;
	},
	
	toArray: function() { 
		return [this.x, this.y, this.z];
	},
	
	fromArray: function(a) { 
		this.x = a[0]; this.y = a[1]; this.z = a[2];
	},


	equal: function(v) {
		if( Math.abs(this.x - v.x) > 0.00001 ) return false; 
		if( Math.abs(this.y - v.y) > 0.00001 ) return false;
		if( Math.abs(this.z - v.z) > 0.00001 ) return false;
		return true;
	},
	
	toString: function() { 
		return "Vector3 " + " X:" + this.x + " Y:" + this.y + " Z:" + this.z;	
	}
}