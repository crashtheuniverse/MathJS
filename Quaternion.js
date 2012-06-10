/**
 * @author CrashTheuniversE
 */
MW.Quaternion = function() {	
	this.w = 1.0;
	this.x = 0.0; 
	this.y = 0.0; 
	this.z = 0.0;
}

MW.Quaternion.prototype = {
    
    constructor: MW.Quaternion,
    
	set: function (_w, _x, _y, _z) {
		this.w = _w;
		this.x = _x;
		this.y = _y; 
		this.z = _z;
	},
	
	fromAngleAxis: function (angle, v3Axis) {
		var halfAngle = angle * 0.5;
		var s = Math.sin(halfAngle);
        
		this.w = Math.cos(halfAngle);
		this.x = v3Axis.x * s;
		this.y = v3Axis.y * s; 
		this.z = v3Axis.z * s;
	},

	toAngleAxis: function () { 
		var r = {};
		r.angle = 2.0 * Math.acos(this.w);

		var squareRootW = Math.sqrt( 1.0 - (this.w * this.w) );
		
		if(squareRootW > 0.0) {
			var invSqrRoot = 1.0 / squareRootW;
			r.axis = new MW.Vector3(this.x * invSqrRoot, this.y * invSqrRoot, this.z * invSqrRoot);
		}	
		else {
			r.axis = new MW.Vector3(this.x, this.y, this.z);
		}
        
		return r;
	}

	toString: function () { 
		return "Quaternion W:" + this.w + " X:" + this.x + " Y:" + this.y + " Z:" + this.z;	
	}
}

MW.Quaternion.zero = function() {
	var q = new MW.Quaternion();
	q.w = 0.0;
	return q; 
}

MW.Quaternion.identity = function() { 
	var q = new MW.Quaternion(); 
	return q;	
}
