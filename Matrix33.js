/**
 * @author CrashTheuniversE
 * 
 * Notes: 
 * The reference system is Right-Handed
 * Positive angles -> counter clockwise			
 */
MW.Matrix33 = function() {
	
	this.rows = 3; 
	this.columns = 3;
	this.m = new Array(9);
	
	this.setZero = function() {
		for(var i = 0; i < this.m.length; ++i)
		{
			this.m[i] = 0.0;
		}	
	}
	
	this.setIdentity = function() { 
		this.setZero();
		this.m[0] = 1.0;
		this.m[4] = 1.0;
		this.m[8] = 1.0;
	}
	
	this.setScale = function(sx, sy, sz) {
		this.m[0] = sx; 
		this.m[4] = sy; 
		this.m[8] = sz;
	}
	
	this.getCopy = function() {
		var mtx = new MW.Matrix33();
		mtx.copy(this);
		return mtx;	 
	}
	
	this.getTranspose = function() { 
		var mtx = this.getCopy();
		mtx.transpose();
		return mtx;
	}
	
	this.isEqual = function(mtx) {
		for(var i = (this.m.length - 1); i >= 0; --i)
		{
			if(mtx.m[i] !== this.m[i])
				return false;
		}
		return true;
	}
	
	this.transpose = function() {
		
		for(var i = 0; i < this.rows; ++i)
		{
			for(var j = i; j < this.columns; ++j)
			{
				var tmp = this.m[ (j * this.rows) + i ]; 
				this.m[ (j * this.rows) + i ] = this.m[ (i * this.columns) + j ];
				this.m[ (i * this.columns) + j ] = tmp; 
			}	
		}
	}

	this.copy = function(mtx) {
		for(var i = (this.m.length - 1); i >= 0; --i)
		{
			this.m[i] = mtx.m[i];
		}
	}
	
	this.getColumn = function() { 
	}
	
	this.setColumn = function(idx, v3Column) {
	}
	
	this.fromAngleAxis = function(angle, v3Axis) {
	}

	this.toAngleAxis = function() { 
	}

	this.toString = function() { 
		var matrixString = "Matrix:\n";
		matrixString += "" + this.m[0] + " " + this.m[1] + " " + this.m[2] + "\n";
		matrixString += "" + this.m[3] + " " + this.m[4] + " " + this.m[5] + "\n";
		matrixString += "" + this.m[6] + " " + this.m[7] + " " + this.m[8] + "\n";
		return matrixString;
	}
}

MW.Matrix33.identity = function() {
	var mtx = new MW.Matrix33();
	mtx.setIdentity(); 
	return mtx;
}
