var MW={},mw=MW;MW.version="0.0.1";MW.create=function(a){function b(){}b.prototype=a;return new b};MW.m33=function(){return new MW.Matrix33};MW.m22=function(){return new MW.Matrix22};MW.v2=function(){return new MW.Vector2};MW.v3=function(){return new MW.Vector3};MW.v4=function(){return new MW.Vector4};MW.Matrix22=function(){this.cols=this.rows=2;this.m=Array(4)};MW.Matrix22.prototype.identity=function(){this.m[0]=1;this.m[1]=0;this.m[2]=0;this.m[3]=1;return this};MW.Matrix22.prototype.zero=function(){for(var a=0;a<this.m.length;++a)this.m[a]=0;return this};MW.Matrix22.prototype.determinant=function(){return this.m[0]*this.m[3]-this.m[1]*this.m[2]};MW.Matrix22.prototype.trace=function(){return this.m[0]+this.m[3]};MW.Matrix22.prototype.scale=function(a,b){this.m[0]*=a;this.m[3]*=b;return this};
MW.Matrix22.prototype.copy=function(a){for(var b=0;b<this.m.length;++b)this.m[b]=a.m[b];return this};MW.Matrix22.prototype.transpose=function(){for(var a=0;a<this.rows;++a)for(var b=a;b<this.cols;++b){var c=this.m[b*this.rows+a];this.m[b*this.rows+a]=this.m[a*this.cols+b];this.m[a*this.cols+b]=c}return this};MW.Matrix22.prototype.inverse=function(){var a=new MW.Matrix22,b=1/this.determinant();a.m[0]=b*this.m[3];a.m[1]=-b*this.m[1];a.m[2]=-b*this.m[2];a.m[3]=b*this.m[0];this.copy(a);return this};
MW.Matrix22.prototype.equal=function(a){for(var b=this.m.length-1;0<=b;--b)if(a.m[b]!==this.m[b])return!1;return!0};MW.Matrix22.prototype.scalarMultiply=function(a){for(var b=this.m.length-1;0<=b;--b)this.m[b]*=a;return this};MW.Matrix22.prototype.vectorMultiply=function(a){for(var b=[],c=0;c<this.rows;++c)b[c]=this.m[c*this.columns+0]*a.x+this.m[c*this.columns+1]*a.y;a=new MW.Vector2;a.arraySet(b);return a};
MW.Matrix22.prototype.multiply=function(a){for(var b=new MW.Matrix22,c=0;c<this.rows;++c)for(var d=0;d<this.cols;++d)b.m[c*this.cols+d]=this.m[c*this.cols+0]*a.m[0*this.rows+d]+this.m[c*this.cols+1]*a.m[1*this.rows+d];this.copy(b);return this};MW.Matrix22.prototype.add=function(a){for(var b=0;b<this.m.length;++b)this.m[b]+=a.m[b];return this};MW.Matrix22.prototype.makeScale=function(a,b){this.zero();this.m[0]=a;this.m[3]=b;return this};
MW.Matrix22.prototype.makeRotation=function(a){var b=Math.cos(a),a=Math.sin(a);this.m[0]=b;this.m[1]=-a;this.m[2]=a;this.m[3]=b;return this};MW.Matrix22.prototype.getColumn=function(a){for(var b=[],c=0;c<this.rows;++c)b[c]=this.m[c*this.cols+a];a=new MW.Vector2;a.arraySet(b);return a};MW.Matrix22.prototype.setColumn=function(a,b){this.m[0*this.cols+a]=b.x;this.m[1*this.cols+a]=b.y;return this};
MW.Matrix22.prototype.toString=function(){var a;a="Matrix:\n"+(""+this.m[0]+" "+this.m[1]+"\n");return a+=""+this.m[2]+" "+this.m[3]+"\n"};MW.Matrix33=function(){this.columns=this.rows=3;this.m=Array(9)};
MW.Matrix33.prototype={constructor:MW.Matrix33,setZero:function(){for(var a=this.m.length,b=0;b<a;++b)this.m[b]=0},identity:function(){this.setZero();this.m[0]=1;this.m[4]=1;this.m[8]=1;return this},setScale:function(a,b,c){this.m[0]=a;this.m[4]=b||a;this.m[8]=c||a},setRotationX:function(a){var b=Math.cos(a),a=Math.sin(a);this.setZero();this.m[0]=1;this.m[4]=b;this.m[5]=-a;this.m[7]=a;this.m[8]=b},setRotationY:function(a){var b=Math.cos(a),a=Math.sin(a);this.setZero();this.m[0]=b;this.m[2]=a;this.m[4]=
1;this.m[6]=-a;this.m[8]=b},setRotationZ:function(a){var b=Math.cos(a),a=Math.sin(a);this.setZero();this.m[0]=b;this.m[1]=-a;this.m[3]=a;this.m[4]=b;this.m[8]=1},getCopy:function(){var a=new MW.Matrix33;a.copy(this);return a},getTranspose:function(){var a=this.getCopy();a.transpose();return a},getInverse:function(){var a=this.getCopy();a.inverse();return a},getTrace:function(){return this.m[0]+this.m[4]+this.m[8]},getDeterminant:function(){return this.m[0]*(this.m[4]*this.m[8]-this.m[5]*this.m[7])-
this.m[1]*(this.m[3]*this.m[8]-this.m[5]*this.m[6])+this.m[2]*(this.m[3]*this.m[7]-this.m[4]*this.m[6])},getColumn:function(a){for(var b=[],c=0;c<this.rows;++c)b[c]=this.m[c*this.columns+a];a=new MW.Vector3;a.arraySet(b);return a},setColumn:function(a,b){this.m[0*this.columns+a]=b.x;this.m[1*this.columns+a]=b.y;this.m[2*this.columns+a]=b.z},fromEulerAnglesXYZ:function(a,b,c){this.setRotationX(a);a=new MW.Matrix33;a.setRotationY(b);this.multiply(a);a.setRotationZ(c);this.multiply(a)},fromAngleAxis:function(a,
b){var c=Math.cos(a),d=Math.sin(a),e=1-c,k=b.y*b.y,l=b.z*b.z,f=b.x*b.y*e,g=b.x*b.z*e,h=b.y*b.z*e,i=b.x*d,j=b.y*d,d=b.z*d;this.m[0]=c+b.x*b.x*e;this.m[1]=f-d;this.m[2]=g+j;this.m[3]=f+d;this.m[4]=c+k*e;this.m[5]=h-i;this.m[6]=g-j;this.m[7]=h+i;this.m[8]=c+l*e},toAngleAxis:function(){var a=0.5*(this.getTrace()-1),a=Math.acos(a),b=new MW.Vector3;if(0<a)if(a<Math.PI)b.x=this.m[7]-this.m[5],b.y=this.m[2]-this.m[6],b.z=this.m[3]-this.m[1],b.normalize();else{var c;this.m[0]>=this.m[4]?this.m[0]>=this.m[8]?
(b.x=0.5*Math.sqrt(this.m[0]-this.m[4]-this.m[8]+1),c=0.5/b.x,b.y=c*this.m[1],b.z=c*this.m[2]):(b.z=0.5*Math.sqrt(this.m[8]-this.m[0]-this.m[4]+1),c=0.5/b.z,b.x=c*this.m[2],b.y=c*this.m[5]):this.m[4]>=this.m[8]?(b.y=0.5*Math.sqrt(this.m[4]-this.m[0]-this.m[8]+1),c=0.5/b.y,b.x=c*this.m[1],b.z=c*this.m[5]):(b.z=0.5*Math.sqrt(this.m[8]-this.m[0]-this.m[4]+1),c=0.5/b.z,b.x=c*this.m[2],b.y=c*this.m[5])}else b.x=1,b.y=0,b.z=0;return{angle:a,axis:b}},equal:function(a){for(var b=this.m.length-1;0<=b;--b)if(a.m[b]!==
this.m[b])return!1;return!0},inverse:function(){var a=new MW.Matrix33;a.m[0]=this.m[4]*this.m[8]-this.m[5]*this.m[7];a.m[1]=-(this.m[3]*this.m[8]-this.m[5]*this.m[6]);a.m[2]=this.m[3]*this.m[7]-this.m[4]*this.m[6];a.m[3]=-(this.m[1]*this.m[8]-this.m[2]*this.m[7]);a.m[4]=this.m[0]*this.m[8]-this.m[2]*this.m[6];a.m[5]=-(this.m[0]*this.m[7]-this.m[1]*this.m[6]);a.m[6]=this.m[1]*this.m[5]-this.m[2]*this.m[4];a.m[7]=-(this.m[0]*this.m[5]-this.m[2]*this.m[3]);a.m[8]=this.m[0]*this.m[4]-this.m[1]*this.m[3];
a.transpose();var b=1/this.getDeterminant();a.scalarMultiply(b);this.copy(a)},transpose:function(){for(var a=0;a<this.rows;++a)for(var b=a;b<this.columns;++b){var c=this.m[b*this.rows+a];this.m[b*this.rows+a]=this.m[a*this.columns+b];this.m[a*this.columns+b]=c}},copy:function(a){for(var b=this.m.length-1;0<=b;--b)this.m[b]=a.m[b]},scalarMultiply:function(a){for(var b=this.m.length-1;0<=b;--b)this.m[b]*=a},vectorMultiply:function(a){for(var b=[],c=0;c<this.rows;++c)b[c]=this.m[c*this.columns+0]*a.x+
this.m[c*this.columns+1]*a.y+this.m[c*this.columns+2]*a.z;a=new MW.Vector3;a.arraySet(b);return a},multiply:function(a){for(var b=new MW.Matrix33,c=0;c<this.rows;++c)for(var d=0;d<this.columns;++d)b.m[c*this.columns+d]=this.m[c*this.columns+0]*a.m[0*this.rows+d]+this.m[c*this.columns+1]*a.m[1*this.rows+d]+this.m[c*this.columns+2]*a.m[2*this.rows+d];this.copy(b)},toString:function(){var a;a="Matrix:\n"+(""+this.m[0]+" "+this.m[1]+" "+this.m[2]+"\n");a+=""+this.m[3]+" "+this.m[4]+" "+this.m[5]+"\n";
return a+=""+this.m[6]+" "+this.m[7]+" "+this.m[8]+"\n"}};MW.Quaternion=function(){this.w=1;this.z=this.y=this.x=0};
MW.Quaternion.prototype={constructor:MW.Quaternion,set:function(a,b,c,d){this.w=a;this.x=b;this.y=c;this.z=d},fromAngleAxis:function(a,b){var c=0.5*a,d=Math.sin(c);this.w=Math.cos(c);this.x=b.x*d;this.y=b.y*d;this.z=b.z*d},toAngleAxis:function(){var a={};a.angle=2*Math.acos(this.w);var b=Math.sqrt(1-this.w*this.w);0<b?(b=1/b,a.axis=new MW.Vector3(this.x*b,this.y*b,this.z*b)):a.axis=new MW.Vector3(this.x,this.y,this.z);return a},toString:function(){return"Quaternion W:"+this.w+" X:"+this.x+" Y:"+this.y+
" Z:"+this.z}};MW.Quaternion.zero=function(){var a=new MW.Quaternion;a.w=0;return a};MW.Quaternion.identity=function(){return new MW.Quaternion};MW.Vector2=function(a,b){this.x=a;this.y=b};
MW.Vector2.prototype={constructor:MW.Vector2,getSquaredLength:function(){return this.x*this.x+this.y*this.y},getLength:function(){return Math.sqrt(this.getSquaredLength())},getNormalized:function(){var a=new MW.Vector2;a.normalize();return a},getArray:function(){return[this.x,this.y]},zero:function(){this.y=this.x=0},normalize:function(){var a=1/this.getLength();this.x*=a;this.y*=a},arraySet:function(a){this.x=a[0];this.y=a[1]},set:function(a,b){this.x=a;this.y=void 0===b?a:b},equal:function(a){return 1.0E-5<
Math.abs(this.x-a.x)||1.0E-5<Math.abs(this.y-a.y)?!1:!0},toString:function(){return"Vector2  X:"+this.x+" Y:"+this.y}};MW.Vector3=function(a,b,c){this.x=a;this.y=b;this.z=c;this.getSquaredLength=function(){return this.x*this.x+this.y*this.y+this.z*this.z};this.getLength=function(){return Math.sqrt(this.getSquaredLength())};this.getNormalized=function(){var a=new MW.Vector3;a.normalize();return a};this.getArray=function(){return[this.x,this.y,this.z]};this.zero=function(){this.z=this.y=this.x=0};this.normalize=function(){var a=1/this.getLength();this.x*=a;this.y*=a;this.z*=a};this.arraySet=function(a){this.x=a[0];
this.y=a[1];this.z=a[2]};this.set=function(a,b,c){this.x=a;this.y=void 0===b?a:b;this.z=void 0===c?a:c};this.equal=function(a){return 1.0E-5<Math.abs(this.x-a.x)||1.0E-5<Math.abs(this.y-a.y)||1.0E-5<Math.abs(this.z-a.z)?!1:!0};this.toString=function(){return"Vector3  X:"+this.x+" Y:"+this.y+" Z:"+this.z}};MW.Vector4=function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d};
MW.Vector4.prototype={constructor:MW.Vector4,getSquaredLength:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},getLength:function(){return Math.sqrt(this.getSquaredLength())},getNormalized:function(){var a=new MW.Vector4;a.normalize();return a},getArray:function(){return[this.x,this.y,this.z,this.w]},zero:function(){this.w=this.z=this.y=this.x=0},normalize:function(){var a=1/this.getLength();this.x*=a;this.y*=a;this.z*=a;this.w*=a},arraySet:function(a){this.x=a[0];this.y=
a[1];this.z=a[2];this.w=a[3]},set:function(a,b,c,d){this.x=a;this.y=void 0===b?a:b;this.z=void 0===c?a:c;this.w=void 0===d?a:d},equal:function(a){return 1.0E-5<Math.abs(this.x-a.x)||1.0E-5<Math.abs(this.y-a.y)||1.0E-5<Math.abs(this.z-a.z)||1.0E-5<Math.abs(this.w-a.w)?!1:!0},toString:function(){return"Vector4  X:"+this.x+" Y:"+this.y+" Z:"+this.z+" W:"+this.w}};
