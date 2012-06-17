/**
 * @author CrashTheuniversE
 */

var MW = {}; 
var mw = MW;
MW.version = "0.0.1";
MW.create = function(o) { 
        function F() {}
        F.prototype = o;
        return new F();
    };

/**
 * Matrix33 helper function
 * @return (Matrix33)
 */
MW.m22 = function() { 
	return new MW.Matrix22();	
}

MW.m33 = function() {
	return new MW.Matrix33();
}

MW.m44 = function() { 
	return new MW.Matrix44();	
}

MW.v2 = function() {
	return new MW.Vector2();
}

MW.v3 = function() { 
	return new MW.Vector3();	
}

MW.v4 = function() {
	return new MW.Vector4();
}

MW.q = function() { 
	return new MW.Quaternion();	
}