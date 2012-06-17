/**
 * @author CrashTheuniversE
 */
MW.Vector4 = function (x, y, z, w) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};

MW.Vector4.prototype = {
    
    constructor: MW.Vector4,
    
	getSquaredLength: function () {
		return ( (this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w) ); 
	},

	getLength: function () { 
		return Math.sqrt( this.getSquaredLength());
	},
	
	getNormalized: function () { 
		var v = new MW.Vector4(); 
		v.normalize();
		return v;	
	},
	
	zero: function () { 
		this.x = 0.0; 
		this.y = 0.0; 
		this.z = 0.0;
		this.w = 0.0;
		return this;	
	},

	normalize: function () {
		var invLen = 1.0 / this.getLength();
		this.x *= invLen;
		this.y *= invLen; 
		this.z *= invLen;
		this.w *= invLen;
	},

	fromArray: function (a) {
		this.x = a[0]; this.y = a[1]; this.z = a[2]; this.w = a[3];
	},

	toArray: function () { 
		return [ this.x, this.y, this.z, this.w ];
	},

	set: function (x, y, z, w) {
		this.x = x;
		this.y = (y === undefined) ? x : y;
		this.z = (z === undefined) ? x : z;
		this.w = (w === undefined) ? x : w;
	},

	equal: function (v) { 
		if( Math.abs(this.x - v.x) > 0.00001 ) return false; 
		if( Math.abs(this.y - v.y) > 0.00001 ) return false;
		if( Math.abs(this.z - v.z) > 0.00001 ) return false;
		if( Math.abs(this.w - v.w) > 0.00001 ) return false;
        
		return true;
	},
	
	toString: function () { 
		return "Vector4 " + " X:" + this.x + " Y:" + this.y + " Z:" + this.z + " W:" + this.w;	
	}
}