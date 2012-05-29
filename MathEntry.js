/**
 * @author CrashTheuniversE
 */
var MW = {}; 
MW.version = "0.0.1";
MW.create = function(o) { 
        function F() {}
        F.prototype = o;
        return new F();
    };
