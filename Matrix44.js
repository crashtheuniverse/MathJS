/**
 * @author CrashTheuniversE
 * 
 * Notes: 
 * The reference system is Right-Handed
 * Positive angles -> counter clockwise
 */

MW.Matrix44 = function () {
    this.rows = 4;
    this.cols = 4;
    this.m = new Array(16);
};

MW.Matrix44.prototype = {
    
    constructor: MW.Matrix44,
    
    zero: function() { 
        var len = this.m.length;
        for (var i = 0; i < len; ++i) {
            this.m[i] = 0.0;
        }
        return this;	
    },
    
    identity: function () { 
        this.zero();
        this.m[0] = 1.0;
        this.m[5] = 1.0;
        this.m[10] = 1.0;
        this.m[15] = 1.0;
        return this;
	},
   
   	setMatrix33: function(m) {
   		this.m[0] = m.m[0]; this.m[1] = m.m[1]; this.m[2] = m.m[2]; 
   		this.m[4] = m.m[3]; this.m[5] = m.m[4]; this.m[6] = m.m[5];
   		this.m[8] = m.m[6]; this.m[9] = m.m[7]; this.m[10] = m.m[8];
   		return this;
   	},
   
   getMatrix33: function() { 
   		var m = MW.m33();
   		m.m[0] = this.m[0]; m.m[1] = this.m[1]; m.m[2] = this.m[2];
   		m.m[3] = this.m[4]; m.m[4] = this.m[5]; m.m[5] = this.m[6]; 
   		m.m[6] = this.m[8]; m.m[7] = this.m[9]; m.m[8] = this.m[10];
   		return m;
   },
   
    makeScale: function(sx, sy, sz) {
    	this.identity();
    	this.m[0] = sx; 
		this.m[5] = sy;
		this.m[10] = sz;
		return this;
	},
    
    makeRotationX: function(alpha) { 
    	var m33 = MW.m33().makeRotationX(alpha);
    	this.identity().setMatrix33(m33);
    	return this;
    },
    
    makeRotationY: function(alpha) { 
    	var m33 = MW.m33().makeRotationY(alpha);
    	this.identity().setMatrix33(m33);
    	return this;	
    },
    
    makeRotationZ: function(alpha) { 
    	var m33 = MW.m33().makeRotationZ(alpha);
    	this.identity().setMatrix33(m33);
    	return this;	
    },
    
    trace: function () {
	    var t = this.m[0] + this.m[5] + this.m[10] + this.m[15];
	    return t; 
    },
    
    minor: function(i, j) {
    	
    	var min = new MW.Matrix33(); 
    	
    	var idx = 0; 
    	for(var a = 0; a < this.rows; ++a)
    	{
    		for(var b = 0; b < this.cols; ++b)
    		{
    			if((a != i) && (b != j))
    			{
					min.m[idx] = this.m[(a * this.cols) + b];
					++idx;
				}     			
    		}
    	}
    	
    	return min.determinant();
    },
    
    determinant: function () { 
    	
		//Top row used for cofactors
		var cofactor00 = this.minor(0, 0);
		var cofactor01 = -this.minor(0, 1);
		var cofactor02 = this.minor(0, 2);
		var cofactor03 = -this.minor(0, 3);
		
		var det = this.m[0] * cofactor00 + this.m[1] * cofactor01 + this.m[2] * cofactor02 + this.m[3] * cofactor03;
		return det;
	},
    
    getColumn: function (idx) {
		var c = []; 
		for(var i = 0; i < this.rows; ++i) {
			c[i] = this.m[(i * this.columns) + idx];
		}
		
		var v = new MW.Vector4();
		v.fromArray(c);
		
		return v;
	},
    
    setColumn: function (idx, v) {
    	this.m[0 * this.columns + idx] = v.x;
		this.m[1 * this.columns + idx] = v.y;
		this.m[2 * this.columns + idx] = v.z;
		this.m[3 * this.columns + idx] = v.w;
	},
    
    fromEulerAnglesXYZ: function (pitch, yaw, roll) {
		
		var m = MW.m33().fromEulerAnglesXYZ(pitch, yaw, roll);
		this.identity();
		this.setMatrix33(m);
		return this;
	},
    
    fromAngleAxis: function (angle, axis) {

		var m = MW.m33().fromAngleAxis(angle, axis);
		this.identity();
		this.setMatrix33(m);
		return this;
	},
		
    toAngleAxis: function () {
    	 
		 var m = this.getMatrix33();
		 return m.toAngleAxis(); 
	},
    
    equal: function (mtx) {
    	for (var i = (this.m.length - 1); i >= 0; --i) {
			if (mtx.m[i] !== this.m[i]) {
				return false;
			}
		}
		return true;
	},
    
    adjugate: function() {
    	
    	var adj = new MW.Matrix44(); 
    	
    	var idx = 0;    	
    	for(var i = 0; i < this.rows; ++i)
    	{
    		for(var j = 0; j < this.cols; ++j)
    		{
    			var sign = ((i + j) % 2) ? -1.0 : 1.0;
				adj.m[idx] = this.minor(i, j) * sign;
				++idx;
    		}
    	}
    	
    	adj.transpose(); 
    	return adj;
    },
    
    inverse: function () { 
		
		//If det is 0 can't invert!
		var invDet = 1.0 / this.determinant();  
		var adj = this.adjugate(); 
		adj.scalarMultiply(invDet);
		this.copy(adj);
		return this;		
	},
    
    transpose: function () {
		for(var i = 0; i < this.rows; ++i) {
			for(var j = i; j < this.cols; ++j) {
				var tmp = this.m[ (j * this.rows) + i ]; 
				this.m[ (j * this.rows) + i ] = this.m[ (i * this.cols) + j ];
				this.m[ (i * this.cols) + j ] = tmp; 
			}	
		}
	},
    
    copy: function (mtx) {
    	for(var i = (this.m.length - 1); i >= 0; --i) {
			this.m[i] = mtx.m[i];
		}
	},
    
    scalarMultiply: function (s) { 
    	for(var i = (this.m.length - 1); i >= 0; --i) {
			this.m[i] = this.m[i] * s;
		}
	},
    
    vectorMultiply: function (v) { 
    	var _v = []; 
		
		for(var i = 0; i < this.rows; ++i) {
			_v[i] = this.m[(i*this.cols) + 0] * v.x + this.m[(i*this.cols) + 1] * v.y + this.m[(i*this.cols) + 2] * v.z + this.m[(i*this.cols) + 3] * v.w;   
		}
		
		var nv = new MW.Vector4();
		nv.fromArray(_v);
		return nv;
	},
    
    multiply: function (rMtx) { 
		var pMtx = new MW.Matrix44();		
		
		for(var i = 0; i < this.rows; ++i) {
			for(var j = 0; j < this.cols; ++j) {
				var value = this.m[(i * this.cols) + 0] * rMtx.m[(0 * this.rows) + j] +
							this.m[(i * this.cols) + 1] * rMtx.m[(1 * this.rows) + j] +
							this.m[(i * this.cols) + 2] * rMtx.m[(2 * this.rows) + j] + 
							this.m[(i * this.cols) + 3] * rMtx.m[(3 * this.rows) + j];
				
				pMtx.m[(i * this.cols) + j] = value;
			}	
		}
		
		this.copy(pMtx);
	},
    
    toString: function () { 
    	var matrixString = "Matrix:\n";
		matrixString += "" + this.m[0] + " " + this.m[1] + " " + this.m[2] + " " + this.m[3] + "\n";
		matrixString += "" + this.m[4] + " " + this.m[5] + " " + this.m[6] + " " + this.m[7] + "\n";
		matrixString += "" + this.m[8] + " " + this.m[9] + " " + this.m[10] + " " + this.m[11] + "\n";
        matrixString += "" + this.m[12] + " " + this.m[13] + " " + this.m[14] + " " + this.m[15] + "\n";
		return matrixString;
	}
}