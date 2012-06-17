/**
 * @author CrashTheuniversE
 */

/**
 * Matrix22 class
 */
MW.Matrix22 = function() {
	
	this.rows = 2; 
	this.cols = 2;
	this.m = new Array(4);
}

MW.Matrix22.prototype = {

	constructor: MW.Matrix22, 
	
	identity: function() { 
		this.m[0] = 1.0; this.m[1] = 0.0;
		this.m[2] = 0.0; this.m[3] = 1.0;
		return this;
	},

	zero: function() { 
		for (var i = 0; i < this.m.length; ++i) {
			this.m[i] = 0.0;
		}
		return this;
	},

	determinant: function() {
		var det = this.m[0] * this.m[3] - this.m[1] * this.m[2];
		return det;
	},

	trace: function() {
		var t = this.m[0] + this.m[3];
		return t;
	},

	copy: function(mtx) {
		for (var i = 0; i < this.m.length; ++i) {
			this.m[i] = mtx.m[i];
		}
		return this;
	},

	transpose: function() {
		for (var i = 0; i < this.rows; ++i) {
			for (var j = i; j < this.cols; ++j) {
				var tmp = this.m[(j * this.rows) + i];
				this.m[(j * this.rows) + i] = this.m[(i * this.cols) + j];
				this.m[(i * this.cols) + j] = tmp;
			}
		}
		return this;
	},

	inverse: function() {
		//CTU: This is the same rule as 3x3 matrix.
		//		Calculate the matrix made of the cofactors
		//		Transpose the CoFactor Matrix
		//		Scalar multiply the Transpose CoFactor Matrix by the inverse of the Det
	
		var invMtx = new MW.Matrix22();
		var invDet = 1.0 / this.determinant();
	
		invMtx.m[0] = invDet * this.m[3];
		invMtx.m[1] = -invDet * this.m[1];
		invMtx.m[2] = -invDet * this.m[2];
		invMtx.m[3] = invDet * this.m[0];
	
		this.copy(invMtx);
		return this;
	},

	equal: function(mtx) {
	
		for (var i = (this.m.length - 1); i >= 0; --i) {
			if (mtx.m[i] !== this.m[i])
				return false;
		}
		return true;
	},

	scalarMultiply: function(s) {
		for (var i = (this.m.length - 1); i >= 0; --i) {
			this.m[i] = this.m[i] * s;
		}
		return this;
	},

	vectorMultiply: function(v) {

		var _v = [];
	
		for (var i = 0; i < this.rows; ++i) {
			_v[i] = this.m[(i * this.columns) + 0] * v.x + this.m[(i * this.columns) + 1] * v.y;
		}
	
		var nv = new MW.Vector2();
		nv.arraySet(_v);
		return nv;
	},

	multiply: function(rMtx) {
		var pMtx = new MW.Matrix22();
	
		for (var i = 0; i < this.rows; ++i) {
			for (var j = 0; j < this.cols; ++j) {
				var value = this.m[(i * this.cols) + 0] * rMtx.m[(0 * this.rows) + j] + this.m[(i * this.cols) + 1] * rMtx.m[(1 * this.rows) + j];
	
				pMtx.m[(i * this.cols) + j] = value;
			}
		}
		this.copy(pMtx);
		return this;
	},

	add: function(rMtx) {
		for (var i = 0; i < this.m.length; ++i) {
			this.m[i] += rMtx.m[i];
		}
		return this;
	},

	makeScale: function(sx, sy) {
		this.zero();
		this.m[0] = sx; this.m[3] = sy;
		return this;	
	},

	makeRotation: function(a) {
		var ca = Math.cos(a); 
		var sa = Math.sin(a);
		this.m[0] = ca; this.m[1] = -sa; 
		this.m[2] = sa; this.m[3] = ca;
		return this;
	},

	getColumn: function(idx) {
		var c = [];
		for (var i = 0; i < this.rows; ++i) {
			c[i] = this.m[(i * this.cols) + idx];
		}
	
		var v = new MW.Vector2();
		v.arraySet(c);
	
		return v;
	},

	setColumn: function(idx, v) {
		this.m[0 * this.cols + idx] = v.x;
		this.m[1 * this.cols + idx] = v.y;
		return this;
	},

	toString: function() {
		var str = "Matrix:\n";
		str += "" + this.m[0] + " " + this.m[1] + "\n";
		str += "" + this.m[2] + " " + this.m[3] + "\n";
		return str;
	}
}