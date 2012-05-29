/**
 * @author CrashTheuniversE
 */
MW.Vector3 = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.toString = function() { 
		return "Vector3 " + " X:" + this.x + " Y:" + this.y + " Z:" + this.z;	
	}
}

MW.Vector3.zero = function() {
	var v = new MW.Vector3(0.0, 0.0, 0.0);
	return v; 
}
