/**
 * @author CrashTheuniversE
 * 
 * Notes: 
 * The reference system is Right-Handed
 * Positive angles -> counter clockwise
 */

MW.Matrix33 = function () {
    this.rows = 3;
    this.columns = 3;
    this.m = new Array(9);
};

MW.Matrix33.prototype = {
    
    constructor: MW.Matrix33,
    
    setZero: function () {
        var len = this.m.length;
        for (var i = 0; i < len; ++i) {
            this.m[i] = 0.0;
        }	
	},
    
    identity: function () { 
        this.setZero();
        
        this.m[0] = 1.0;
        this.m[4] = 1.0;
        this.m[8] = 1.0;
        return this;
	},
    
    setScale: function (sx, sy, sz) {
    	this.m[0] = sx; 
		this.m[4] = sy || sx;
		this.m[8] = sz || sx;
	},
    
    setRotationX: function (alpha) {
		var cosAlpha = Math.cos(alpha);
    	var sinAlpha = Math.sin(alpha);
        
        this.setZero();
		
		this.m[0] = 1.0;
		this.m[4] = cosAlpha;
		this.m[5] = -(sinAlpha);
		this.m[7] = sinAlpha;
		this.m[8] = cosAlpha;
	},
    
    setRotationY: function (alpha) { 
    	var cosAlpha = Math.cos(alpha);
    	var sinAlpha = Math.sin(alpha);
        
		this.setZero();
		
		this.m[0] = cosAlpha;
		this.m[2] = sinAlpha;
		this.m[4] = 1.0;
		this.m[6] = -(sinAlpha);
		this.m[8] = cosAlpha;
	},
    
    setRotationZ: function (alpha) {
    	var cosAlpha = Math.cos(alpha);
    	var sinAlpha = Math.sin(alpha);
        
		this.setZero();
		
		this.m[0] = cosAlpha; 
		this.m[1] = -sinAlpha;
		this.m[3] = sinAlpha; 
		this.m[4] = cosAlpha;
		this.m[8] = 1.0;
	},
    
    getCopy: function () {
    	var mtx = new MW.Matrix33();
		mtx.copy(this);
		return mtx;	 
	},
    
    getTranspose: function () { 
    	var mtx = this.getCopy();
		mtx.transpose();
		return mtx;
	},
    
    getInverse: function () { 
    	var mtx= this.getCopy(); 
    	mtx.inverse();
		return mtx;
    },
    
    getTrace: function () {
	    var t = this.m[0] + this.m[4] + this.m[8];
	    return t; 
    },
    
    getDeterminant: function () { 
    	
		// Use first row to calculate cofactors
		var cofactor00 = this.m[4] * this.m[8] - this.m[5] * this.m[7];
		var cofactor01 = this.m[3] * this.m[8] - this.m[5] * this.m[6];
		var cofactor02 = this.m[3] * this.m[7] - this.m[4] * this.m[6];
		
		var det = this.m[0] * cofactor00 - this.m[1] * cofactor01 + this.m[2] * cofactor02;
		
		return det;
	},
    
    getColumn: function (idx) {
		var c = []; 
		for(var i = 0; i < this.rows; ++i) {
			c[i] = this.m[(i * this.columns) + idx];
		}
		
		var v = new MW.Vector3();
		v.fromArray(c);
		
		return v;
	},
    
    setColumn: function (idx, v3Column) {
    	this.m[0 * this.columns + idx] = v3Column.x;
		this.m[1 * this.columns + idx] = v3Column.y;
		this.m[2 * this.columns + idx] = v3Column.z;
	},
    
    fromEulerAnglesXYZ: function (pitch, yaw, roll) {
		this.setRotationX(pitch);
		
		var mtx = new MW.Matrix33();
		mtx.setRotationY(yaw);
		
		this.multiply(mtx);
		
		mtx.setRotationZ(roll);
		this.multiply(mtx);
	},
    
    fromAngleAxis: function (angle, v3Axis) {
		var cosAngle = Math.cos(angle);
		var sinAngle = Math.sin(angle);
		var oneMinCos = 1.0 - cosAngle;

		var xQuad = v3Axis.x * v3Axis.x; 
		var yQuad = v3Axis.y * v3Axis.y; 
		var zQuad = v3Axis.z * v3Axis.z; 
		
		var xyOMC = v3Axis.x * v3Axis.y * oneMinCos; 
		var xzOMC = v3Axis.x * v3Axis.z * oneMinCos; 
		var yzOMC = v3Axis.y * v3Axis.z * oneMinCos; 

		var xSin = v3Axis.x * sinAngle; 
		var ySin = v3Axis.y * sinAngle; 
		var zSin = v3Axis.z * sinAngle;

		this.m[0] = cosAngle + xQuad * oneMinCos;
		this.m[1] = xyOMC - zSin; 
		this.m[2] = xzOMC + ySin; 
		
		this.m[3] = xyOMC + zSin; 
		this.m[4] = cosAngle + yQuad * oneMinCos;
		this.m[5] = yzOMC - xSin;

		this.m[6] = xzOMC - ySin;
		this.m[7] = yzOMC + xSin; 
		this.m[8] = cosAngle + zQuad * oneMinCos;
	},
    
    toAngleAxis: function () {
    	 
		 var trace = this.getTrace(); 
		 var cosine = (trace - 1.0) * 0.5;
		 var radians = Math.acos(cosine);
		 
		 var axis = new MW.Vector3();
		 
		 //Remember radians will be in the range [0, Pi]
		 if( radians > 0.0 )
		 {
			if( radians < Math.PI )
			{
				axis.x = this.m[7] - this.m[5];
				axis.y = this.m[2] - this.m[6];
				axis.z = this.m[3] - this.m[1];
				axis.normalize();
			}		 	
		 	else
		 	{
		 		var halfInverse;
		 		if( this.m[0] >= this.m[4] )
		 		{
		 			if( this.m[0] >= this.m[8])
		 			{
		 				//r00 max diagonal
		 				axis.x = 0.5 * Math.sqrt(this.m[0] - this.m[4] - this.m[8] + 1.0);
		 				halfInverse = 0.5 / axis.x;
		 				axis.y = halfInverse * this.m[1];
		 				axis.z = halfInverse * this.m[2];
		 			}
		 			else
		 			{
		 				//r22 max diagonal
		 				axis.z = 0.5 * Math.sqrt(this.m[8] - this.m[0] - this.m[4] + 1.0);
		 				halfInverse = 0.5 / axis.z; 
		 				axis.x = halfInverse * this.m[2];
		 				axis.y = halfInverse * this.m[5];
		 			}
		 			
		 		}
		 		else
		 		{
		 			if(this.m[4] >= this.m[8])
		 			{
		 				//r11 max diagonal
		 				axis.y = 0.5 * Math.sqrt(this.m[4] - this.m[0] - this.m[8] + 1.0);
		 				halfInverse = 0.5 / axis.y; 
		 				axis.x = halfInverse * this.m[1]; 
		 				axis.z = halfInverse * this.m[5];
		 			}
		 			else
		 			{
		 				axis.z = 0.5 * Math.sqrt(this.m[8] - this.m[0] - this.m[4] + 1.0);
		 				halfInverse = 0.5 / axis.z; 
		 				axis.x = halfInverse * this.m[2];
		 				axis.y = halfInverse * this.m[5];
		 			}
		 		}
		 	}
		 }
		 else
		 {
		 	//Zero angle
		 	axis.x = 1.0;
		 	axis.y = 0.0;
		 	axis.z = 0.0;
		 }
		 
		 return {angle: radians, axis: axis};
	},
    
    equal: function (mtx) {
    	for (var i = (this.m.length - 1); i >= 0; --i) {
			if (mtx.m[i] !== this.m[i]) {
				return false;
			}
		}
		return true;
	},
    
    inverse: function () { 
		var invMtx = new MW.Matrix33();
		
		invMtx.m[0] = this.m[4] * this.m[8] - this.m[5] * this.m[7];
		invMtx.m[1] = - (this.m[3] * this.m[8] - this.m[5] * this.m[6]);
		invMtx.m[2] = this.m[3] * this.m[7] - this.m[4] * this.m[6];
		
		invMtx.m[3] = - (this.m[1] * this.m[8] - this.m[2] * this.m[7]);
		invMtx.m[4] = this.m[0] * this.m[8] - this.m[2] * this.m[6];
		invMtx.m[5] = - (this.m[0] * this.m[7] - this.m[1] * this.m[6]);
		
		invMtx.m[6] = this.m[1] * this.m[5] - this.m[2] * this.m[4];
		invMtx.m[7] = - (this.m[0] * this.m[5] - this.m[2] * this.m[3]);
		invMtx.m[8] = this.m[0] * this.m[4] - this.m[1] * this.m[3];
		
		//Now transpose the cofactors matrix
		invMtx.transpose();
		
		var invDet = 1.0 / this.getDeterminant();
		invMtx.scalarMultiply(invDet);
		
		this.copy(invMtx);
	},
    
    transpose: function () {
		for(var i = 0; i < this.rows; ++i) {
			for(var j = i; j < this.columns; ++j) {
				var tmp = this.m[ (j * this.rows) + i ]; 
				this.m[ (j * this.rows) + i ] = this.m[ (i * this.columns) + j ];
				this.m[ (i * this.columns) + j ] = tmp; 
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
			_v[i] = this.m[(i*this.columns) + 0] * v.x + this.m[(i*this.columns) + 1] * v.y + this.m[(i*this.columns) + 2] * v.z;  
		}
		
		var nv = new MW.Vector3();
		nv.fromArray(_v);
		return nv;
	},
    
    multiply: function (rMtx) { 
		var pMtx = new MW.Matrix33();		
		
		for(var i = 0; i < this.rows; ++i) {
			for(var j = 0; j < this.columns; ++j) {
				var value = this.m[(i * this.columns) + 0] * rMtx.m[(0 * this.rows) + j] +
							this.m[(i * this.columns) + 1] * rMtx.m[(1 * this.rows) + j] +
							this.m[(i * this.columns) + 2] * rMtx.m[(2 * this.rows) + j];
				
				pMtx.m[(i * this.columns) + j] = value;
			}	
		}
		
		this.copy(pMtx);
	},
    
    toString: function () { 
    	var matrixString = "Matrix:\n";
		matrixString += "" + this.m[0] + " " + this.m[1] + " " + this.m[2] + "\n";
		matrixString += "" + this.m[3] + " " + this.m[4] + " " + this.m[5] + "\n";
		matrixString += "" + this.m[6] + " " + this.m[7] + " " + this.m[8] + "\n";
        
		return matrixString;
	}
}