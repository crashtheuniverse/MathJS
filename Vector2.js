/**
 * @author CrashTheuniversE
 */

var vec2 = function(x, y) { 
	this.x = x;
	this.y = y;
}

var createVec2 = function(x, y) { 
	return new vec2(x,y);	
}

MW.Vector2 = vec2;  
MW.v2 = createVec2;

vec2.prototype = {
    
    constructor: vec2,
    
	getSquaredLength: function () {
		return ( (this.x * this.x) + (this.y * this.y) ); 
	},

	getLength: function () { 
		return Math.sqrt( this.getSquaredLength());
	},
	
	getNormalized: function () { 
		var v = new MW.Vector2(); 
		v.normalize();
		return v;	
	},
	
	getArray: function () { 
		return [this.x, this.y];
	},
	
	zero: function () { 
		this.x = 0.0; 
		this.y = 0.0; 
	},

	normalize: function () {
		var invLen = 1.0 / this.getLength();
		this.x *= invLen;
		this.y *= invLen; 
	},

	arraySet: function (a) {
		this.x = a[0]; this.y = a[1];
	},

	set: function(x, y) {
		this.x = x;
		this.y = (y === undefined) ? x : y;
	},

	equal: function (v) { 
		if( Math.abs(this.x - v.x) > 0.00001 ) return false; 
		if( Math.abs(this.y - v.y) > 0.00001 ) return false;
		
        return true;	
	},

	toString: function () { 
		return "Vector2 " + " X:" + this.x + " Y:" + this.y;	
	}
}