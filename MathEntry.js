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

MW.m33 = function() {
	return new MW.Matrix33();
}

MW.v3 = function() { 
	return new MW.Vector3();	
}