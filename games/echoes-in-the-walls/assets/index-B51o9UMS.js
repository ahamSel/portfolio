import{S as We,C as B,F as De,P as Oe,W as Ge,a as Ue,A as _e,b as je,D as He,V as p,M as P,I as me,B as he,c as b,d as Te,e as qe,f as ie,g as ce,h as G,i as Ne,j as pe,k as ze,l as Ve,m as ee,U as Ce,n as Ke,o as te,p as S,q,L as $e,r as j,s as Fe,G as N,t as H,u as _,T as Pe,v as Ye,O as Xe,w as Ze,x as V,y as K,z as W,E as ae,H as $,J as Y,K as X,N as Je}from"./three-B3zZcyVh.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();function Qe(){const r=new We;return r.background=new B("#0b1120"),r.fog=new De("#0b1120",28,120),r}function et(){const r=new Oe(52,window.innerWidth/window.innerHeight,.1,300);return r.up.set(0,0,-1),r.position.set(0,36,.01),r.lookAt(0,0,0),r}function tt(){const r=new Ge({antialias:!0});return r.setSize(window.innerWidth,window.innerHeight),r.shadowMap.enabled=!0,r.shadowMap.type=Ue,r.toneMapping=_e,r.toneMappingExposure=1.12,r.setPixelRatio(Math.min(window.devicePixelRatio,2)),document.body.appendChild(r.domElement),r}function it(r){const e=new je("#bdc8c4",.95);r.add(e);const t=new He("#d8e5e6",1.8);return t.position.set(12,28,8),t.castShadow=!1,r.add(t),{ambient:e,moonlight:t}}class st{constructor(e){this.camera=e,this.pressed=new Set,this.keys={w:!1,a:!1,s:!1,d:!1,arrowup:!1,arrowleft:!1,arrowdown:!1,arrowright:!1,shift:!1,f:!1,r:!1,l:!1},window.addEventListener("keydown",t=>{let s=t.key.toLowerCase();s in this.keys&&!t.ctrlKey&&!t.metaKey&&!t.altKey&&(t.preventDefault(),this.setKey(s,!0))}),window.addEventListener("keyup",t=>{let s=t.key.toLowerCase();s in this.keys&&this.setKey(s,!1)}),window.addEventListener("blur",()=>this.clear())}setKey(e,t){e in this.keys&&(t&&!this.keys[e]&&this.pressed.add(e),this.keys[e]=t)}clear(){for(const e of Object.keys(this.keys))this.keys[e]=!1;this.pressed.clear()}getMoveIntent(){let e=new p;return(this.keys.w||this.keys.arrowup)&&(e.z-=1),(this.keys.s||this.keys.arrowdown)&&(e.z+=1),(this.keys.a||this.keys.arrowleft)&&(e.x-=1),(this.keys.d||this.keys.arrowright)&&(e.x+=1),e.lengthSq()===0||e.normalize(),e}getForce(e){let t=this.getMoveIntent();return t.lengthSq()===0||t.setLength(e),t}consume(e){return this.pressed.has(e)?(this.pressed.delete(e),!0):!1}}class g{static Type=Object.freeze({Floor:Symbol("Floor"),Wall:Symbol("Wall"),Exit:Symbol("Exit"),Shrine:Symbol("Shrine")});static Cost=new Map([[g.Type.Floor,1],[g.Type.Exit,1],[g.Type.Shrine,1],[g.Type.Wall,10]]);constructor(e,t,s=g.Type.Floor,i=.3){this.row=e,this.col=t,this.type=s,this.height=i,this.cost=g.Cost.get(this.type),this.walls={north:!0,south:!0,east:!0,west:!0}}isWalkable(){return this.type!==g.Type.Wall}}class at{constructor({width:e=100,depth:t=100}={}){this.width=e,this.depth=t,this.minX=-e/2,this.maxX=e/2,this.minZ=-t/2,this.maxZ=t/2}wrapPosition(e){let t=e.clone();return t.x=P.euclideanModulo(t.x-this.minX,this.width)+this.minX,t.z=P.euclideanModulo(t.z-this.minZ,this.depth)+this.minZ,t}getRandomPosition(){return new p(this.minX+this.width*Math.random(),0,this.minZ+this.depth*Math.random())}}class nt{static generate(e){let t=new Set,s=e.getRandomWalkableTile();this.carve(s,t,e)}static carve(e,t,s){let i=e.row*s.cols+e.col;t.add(i);let a=s.getAdjacentTiles(e);this.shuffle(a);for(let n of a){let l=n.row*s.cols+n.col;if(!t.has(l)){let o=n.row-e.row,h=n.col-e.col;o===1?(e.walls.south=!1,n.walls.north=!1):o===-1?(e.walls.north=!1,n.walls.south=!1):h===1?(e.walls.east=!1,n.walls.west=!1):h===-1&&(e.walls.west=!1,n.walls.east=!1),this.carve(n,t,s)}}}static braidedGenerate(e,t){this.generate(e);for(let s=0;s<e.rows;s++)for(let i=0;i<e.cols;i++){let a=e.grid[s][i],n=e.getNeighbours(a);if(n.length!==1||Math.random()>t)continue;let l=e.getAdjacentTiles(a),o=n[0],h=l.filter(m=>m!==o),c=h[Math.floor(Math.random()*h.length)],u=c.row-a.row,d=c.col-a.col;u===1?(a.walls.south=!1,c.walls.north=!1):u===-1?(a.walls.north=!1,c.walls.south=!1):d===1?(a.walls.east=!1,c.walls.west=!1):d===-1&&(a.walls.west=!1,c.walls.east=!1)}}static shuffle(e){for(let t=e.length-1;t>0;t--){let s=Math.floor(Math.random()*(t+1)),i=e[s];e[s]=e[t],e[t]=i}}}class ge{static random(e=0,t=1){return Math.floor(Math.random()*(t-e)+e)}static halton(e,t,s=0,i=1){let a=0,n=1;for(;t>0;)n*=e,a+=t%e/n,t=Math.floor(t/e);return Math.floor(a*(i-s)+s)}static gaussian(e=0,t=1){let s=Math.random(),i=Math.random();s===0&&(s=Number.EPSILON);let o=Math.sqrt(-2*Math.log(s))*Math.cos(2*Math.PI*i)*.15+.5;return o=Math.min(1-Number.EPSILON,Math.max(0,o)),Math.floor(o*(t-e)+e)}}class lt extends at{constructor(e=2,{mazeRows:t=11,mazeCols:s=15}={}){const i=t*2+1,a=s*2+1;super({width:a*e,depth:i*e}),this.mazeRows=t,this.mazeCols=s,this.tileSize=e,this.cols=a,this.rows=i,this.grid=[],this.generateGrid(),this.walkableTiles=this.grid.flat().filter(n=>n.isWalkable()),this.startTile=this.grid[1][1],this.altarTile=this.findNearestWalkable(Math.floor(this.rows/2),Math.floor(this.cols/2)),this.exitTile=this.altarTile,this.exitTile.type=g.Type.Exit,this.exitTile.cost=g.Cost.get(g.Type.Exit),this.exitTile.height=.3,this.ghostSpawnTile=this.getNearbyGhostSpawnTile(this.startTile,8,16,new Set([this.startTile,this.exitTile])),this.wallSegments=this.buildWallSegments()}generateGrid(){let e=this.generateMazeCells();for(let t=0;t<this.rows;t++){let s=[];for(let i=0;i<this.cols;i++)s.push(new g(t,i,g.Type.Wall,6));this.grid.push(s)}for(let t=0;t<e.rows;t++)for(let s=0;s<e.cols;s++){let i=e.grid[t][s],a=t*2+1,n=s*2+1;this.openPassage(a,n),i.walls.north||this.openPassage(a-1,n),i.walls.south||this.openPassage(a+1,n),i.walls.east||this.openPassage(a,n+1),i.walls.west||this.openPassage(a,n-1)}this.carveAltarChamber()}generateMazeCells(){let e={rows:this.mazeRows,cols:this.mazeCols,grid:[]};for(let t=0;t<e.rows;t++){let s=[];for(let i=0;i<e.cols;i++)s.push(new g(t,i,g.Type.Floor,1));e.grid.push(s)}return e.getRandomWalkableTile=()=>{let t=Math.floor(Math.random()*e.rows),s=Math.floor(Math.random()*e.cols);return e.grid[t][s]},e.getAdjacentTiles=t=>{let s=[],i=[[-1,0],[1,0],[0,-1],[0,1]];for(let a of i){let n=t.row+a[0],l=t.col+a[1];n>=0&&n<e.rows&&l>=0&&l<e.cols&&s.push(e.grid[n][l])}return s},e.getNeighbours=t=>{let s=[],i=t.row,a=t.col;return i>0&&!t.walls.north&&s.push(e.grid[i-1][a]),i<e.rows-1&&!t.walls.south&&s.push(e.grid[i+1][a]),a>0&&!t.walls.west&&s.push(e.grid[i][a-1]),a<e.cols-1&&!t.walls.east&&s.push(e.grid[i][a+1]),s},nt.braidedGenerate(e,.18),e}openPassage(e,t,s=g.Type.Floor){let i=this.grid[e][t];i.type=s,i.cost=g.Cost.get(s),i.height=.3}carveAltarChamber(){let e=Math.floor(this.rows/2),t=Math.floor(this.cols/2);for(let s=e-1;s<=e+1;s++)for(let i=t-1;i<=t+1;i++)this.isInGrid(s,i)&&this.openPassage(s,i)}getNeighbours(e){let t=[],s=[[-1,0],[1,0],[0,-1],[0,1]];for(let i of s){let a=e.row+i[0],n=e.col+i[1];this.isInGrid(a,n)&&this.grid[a][n].isWalkable()&&t.push(this.grid[a][n])}return t}isInGrid(e,t){return e>=0&&e<this.rows&&t>=0&&t<this.cols}quantize(e){let t=P.clamp(Math.floor((e.z-this.minZ)/this.tileSize),0,this.rows-1),s=P.clamp(Math.floor((e.x-this.minX)/this.tileSize),0,this.cols-1);return this.grid[t][s]}localize(e){return new p(e.col*this.tileSize+this.minX+this.tileSize/2,0,e.row*this.tileSize+this.minZ+this.tileSize/2)}getRandomWalkableTile(e=new Set){let t=this.walkableTiles.filter(i=>!e.has(i)),s=Math.floor(Math.random()*t.length);return t[s]}isWalkable(e,t){return this.isInGrid(e,t)?this.grid[e][t].isWalkable():!1}findNearestWalkable(e,t){let s=P.clamp(e,0,this.rows-1),i=P.clamp(t,0,this.cols-1);if(this.grid[s][i].isWalkable())return this.grid[s][i];for(let a=1;a<Math.max(this.rows,this.cols);a++)for(let n=s-a;n<=s+a;n++)for(let l=i-a;l<=i+a;l++)if(this.isInGrid(n,l)&&this.grid[n][l].isWalkable())return this.grid[n][l];return this.startTile}getGaussianWalkableTile(e=new Set){for(let t=0;t<40;t++){let s=ge.gaussian(1,this.rows-1),i=ge.gaussian(1,this.cols-1),a=this.findNearestWalkable(s,i);if(a&&!e.has(a))return a}return this.getRandomWalkableTile(e)}getFarthestWalkableTile(e,t=new Set){let s=[e],i=new Set([e]),a=e;for(;s.length>0;){let n=s.shift();t.has(n)||(a=n);for(let l of this.getNeighbours(n))i.has(l)||(i.add(l),s.push(l))}return a}getNearbyGhostSpawnTile(e,t=8,s=16,i=new Set){let a=[{tile:e,distance:0}],n=new Set([e]),l=null,o=e;for(;a.length>0;){let{tile:h,distance:c}=a.shift();if(i.has(h)||(o=h,c>=t&&c<=s&&(l=h)),!(c>=s))for(let u of this.getNeighbours(h))n.has(u)||(n.add(u),a.push({tile:u,distance:c+1}))}return l||o||this.getFarthestWalkableTile(e,i)}handleCollisions(e){let t=e.position.clone(),s=e.radius||Math.max(e.scale.x,e.scale.z)/2,i=this.quantize(t);if(!i.isWalkable()){let o=this.findNearestWalkable(i.row,i.col);t.copy(this.localize(o)),i=o}let a=this.getNeighbours(i),n=this.localize(i),l=this.tileSize/2;if(i.row===0||!a.includes(this.grid[i.row-1][i.col])){let o=t.z-(n.z-l);Math.abs(o)<s&&(t.z+=Math.sign(o||1)*(s-Math.abs(o)))}if(i.row===this.rows-1||!a.includes(this.grid[i.row+1][i.col])){let o=t.z-(n.z+l);Math.abs(o)<s&&(t.z+=Math.sign(o||-1)*(s-Math.abs(o)))}if(i.col===0||!a.includes(this.grid[i.row][i.col-1])){let o=t.x-(n.x-l);Math.abs(o)<s&&(t.x+=Math.sign(o||1)*(s-Math.abs(o)))}if(i.col===this.cols-1||!a.includes(this.grid[i.row][i.col+1])){let o=t.x-(n.x+l);Math.abs(o)<s&&(t.x+=Math.sign(o||-1)*(s-Math.abs(o)))}return t}buildWallSegments(){let e=[],t=this.tileSize/2;for(let s=0;s<this.rows;s++)for(let i=0;i<this.cols;i++){let a=this.grid[s][i];if(a.type!==g.Type.Wall)continue;let n=this.localize(a),l=new p(n.x-t,0,n.z-t),o=new p(n.x+t,0,n.z-t),h=new p(n.x-t,0,n.z+t),c=new p(n.x+t,0,n.z+t);this.pushWallSegment(e,s-1,i,l,o,new p(0,0,-1)),this.pushWallSegment(e,s+1,i,h,c,new p(0,0,1)),this.pushWallSegment(e,s,i-1,l,h,new p(-1,0,0)),this.pushWallSegment(e,s,i+1,o,c,new p(1,0,0))}return e}pushWallSegment(e,t,s,i,a,n){if(this.isInGrid(t,s)&&this.grid[t][s].type===g.Type.Wall)return;let l=i.clone().add(a).multiplyScalar(.5);e.push({start:i,end:a,midpoint:l,normal:n,planeCoord:Math.abs(n.x)>0?i.x:i.z})}getNearbyWallSegments(e,t=this.tileSize*3){let s=t*t;return this.wallSegments.filter(i=>i.midpoint.distanceToSquared(e)<=s)}cross2D(e,t){return e.x*t.z-e.z*t.x}hasLineOfSight(e,t){let s=t.clone().sub(e),i=s.length();if(i===0)return!0;s.normalize();let a=this.tileSize*.35;for(let n=a;n<i;n+=a){let l=e.clone().addScaledVector(s,n);if(!this.quantize(l).isWalkable())return!1}return!0}clipRayToWalkable(e,t,s){let i=t.clone().setY(0);if(i.lengthSq()===0)return{point:e.clone(),distance:0,blocked:!1};i.normalize();let a=e.clone().setY(0),n=this.getNearbyWallSegments(a,s+this.tileSize*1.5),l=1/0,o=null,h=null,c=this.tileSize*.03;for(let u of n){let d=u.end.clone().sub(u.start).setY(0),m=this.cross2D(i,d);if(Math.abs(m)<1e-6)continue;let F=u.start.clone().sub(a).setY(0),w=this.cross2D(F,d)/m,y=this.cross2D(F,i)/m;w<0||w>s||y<0||y>1||w<l&&(l=w,o=a.clone().addScaledVector(i,w),h=u)}if(o){let u=Math.max(l-c,0);return{point:a.clone().addScaledVector(i,u),hitPoint:o.clone(),distance:u,hitDistance:l,hitSegment:h,blocked:!0}}return{point:a.clone().addScaledVector(i,s),hitPoint:a.clone().addScaledVector(i,s),distance:s,hitDistance:s,hitSegment:null,blocked:!1}}}class ot{constructor(e){this.map=e,this.floorIndices=new Map;let t=this.map.walkableTiles.length,s=this.map.rows*this.map.cols-t;this.floorMesh=new me(new he,new b({color:"#d6deea",roughness:.95,metalness:.05}),t),this.wallMesh=new me(new he,new b({color:"#1d2735",emissive:"#0c121a",emissiveIntensity:.28,roughness:.9,metalness:.15}),s),this.floorMesh.receiveShadow=!0,this.wallMesh.castShadow=!0,this.wallMesh.receiveShadow=!0,this.floorIndex=0,this.wallIndex=0;for(let i=0;i<this.map.rows;i++)for(let a=0;a<this.map.cols;a++){let n=this.map.grid[i][a];n.isWalkable()?this.createFloor(n):this.createWall(n)}this.floorMesh.instanceMatrix.needsUpdate=!0,this.floorMesh.instanceColor.needsUpdate=!0,this.wallMesh.instanceMatrix.needsUpdate=!0}createFloor(e){let t=this.floorIndex++;this.floorIndices.set(e,t),this.floorMesh.setMatrixAt(t,this.getTransformation(e)),this.floorMesh.setColorAt(t,this.getFloorColor(e))}createWall(e){let t=this.wallIndex++;this.wallMesh.setMatrixAt(t,this.getTransformation(e))}getTransformation(e){let t=this.map.localize(e);t.y=e.height/2;let s=new Te;return s.makeScale(this.map.tileSize,e.height,this.map.tileSize),s.setPosition(t),s}getFloorColor(e){switch(e.type){case g.Type.Exit:return new B("#5d907d");case g.Type.Shrine:return new B("#4b6685");case g.Type.Floor:return new B("#738783");default:return new B("#738783")}}setTileColor(e,t){if(!this.floorIndices.has(e))return;let s=this.floorIndices.get(e);this.floorMesh.setColorAt(s,t),this.floorMesh.instanceColor.needsUpdate=!0}render(e){e.add(this.floorMesh),e.add(this.wallMesh)}}const we=new pe,Z=new p;class Ee extends qe{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],s=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(s),this.setAttribute("position",new ie(e,3)),this.setAttribute("uv",new ie(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,s=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),s.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const s=new ce(t,6,1);return this.setAttribute("instanceStart",new G(s,3,0)),this.setAttribute("instanceEnd",new G(s,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const s=new ce(t,6,1);return this.setAttribute("instanceColorStart",new G(s,3,0)),this.setAttribute("instanceColorEnd",new G(s,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Ne(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pe);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),we.setFromBufferAttribute(t),this.boundingBox.union(we))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ze),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const s=this.boundingSphere.center;this.boundingBox.getCenter(s);let i=0;for(let a=0,n=e.count;a<n;a++)Z.fromBufferAttribute(e,a),i=Math.max(i,s.distanceToSquared(Z)),Z.fromBufferAttribute(t,a),i=Math.max(i,s.distanceToSquared(Z));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}te.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Ke(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};ee.line={uniforms:Ce.merge([te.common,te.fog,te.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class fe extends Ve{constructor(e){super({type:"LineMaterial",uniforms:Ce.clone(ee.line.uniforms),vertexShader:ee.line.vertexShader,fragmentShader:ee.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const ne=new q,ye=new p,Se=new p,M=new q,T=new q,L=new q,le=new p,oe=new Te,z=new $e,ve=new p,J=new pe,Q=new ze,A=new q;let R,D;function be(r,e,t){return A.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),A.multiplyScalar(1/A.w),A.x=D/t.width,A.y=D/t.height,A.applyMatrix4(r.projectionMatrixInverse),A.multiplyScalar(1/A.w),Math.abs(Math.max(A.x,A.y))}function rt(r,e){const t=r.matrixWorld,s=r.geometry,i=s.attributes.instanceStart,a=s.attributes.instanceEnd,n=Math.min(s.instanceCount,i.count);for(let l=0,o=n;l<o;l++){z.start.fromBufferAttribute(i,l),z.end.fromBufferAttribute(a,l),z.applyMatrix4(t);const h=new p,c=new p;R.distanceSqToSegment(z.start,z.end,c,h),c.distanceTo(h)<D*.5&&e.push({point:c,pointOnLine:h,distance:R.origin.distanceTo(c),object:r,face:null,faceIndex:l,uv:null,uv1:null})}}function ht(r,e,t){const s=e.projectionMatrix,a=r.material.resolution,n=r.matrixWorld,l=r.geometry,o=l.attributes.instanceStart,h=l.attributes.instanceEnd,c=Math.min(l.instanceCount,o.count),u=-e.near;R.at(1,L),L.w=1,L.applyMatrix4(e.matrixWorldInverse),L.applyMatrix4(s),L.multiplyScalar(1/L.w),L.x*=a.x/2,L.y*=a.y/2,L.z=0,le.copy(L),oe.multiplyMatrices(e.matrixWorldInverse,n);for(let d=0,m=c;d<m;d++){if(M.fromBufferAttribute(o,d),T.fromBufferAttribute(h,d),M.w=1,T.w=1,M.applyMatrix4(oe),T.applyMatrix4(oe),M.z>u&&T.z>u)continue;if(M.z>u){const x=M.z-T.z,C=(M.z-u)/x;M.lerp(T,C)}else if(T.z>u){const x=T.z-M.z,C=(T.z-u)/x;T.lerp(M,C)}M.applyMatrix4(s),T.applyMatrix4(s),M.multiplyScalar(1/M.w),T.multiplyScalar(1/T.w),M.x*=a.x/2,M.y*=a.y/2,T.x*=a.x/2,T.y*=a.y/2,z.start.copy(M),z.start.z=0,z.end.copy(T),z.end.z=0;const w=z.closestPointToPointParameter(le,!0);z.at(w,ve);const y=P.lerp(M.z,T.z,w),I=y>=-1&&y<=1,v=le.distanceTo(ve)<D*.5;if(I&&v){z.start.fromBufferAttribute(o,d),z.end.fromBufferAttribute(h,d),z.start.applyMatrix4(n),z.end.applyMatrix4(n);const x=new p,C=new p;R.distanceSqToSegment(z.start,z.end,C,x),t.push({point:C,pointOnLine:x,distance:R.origin.distanceTo(C),object:r,face:null,faceIndex:d,uv:null,uv1:null})}}}class ct extends S{constructor(e=new Ee,t=new fe({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,s=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let n=0,l=0,o=t.count;n<o;n++,l+=2)ye.fromBufferAttribute(t,n),Se.fromBufferAttribute(s,n),i[l]=l===0?0:i[l-1],i[l+1]=i[l]+ye.distanceTo(Se);const a=new ce(i,2,1);return e.setAttribute("instanceDistanceStart",new G(a,1,0)),e.setAttribute("instanceDistanceEnd",new G(a,1,1)),this}raycast(e,t){const s=this.material.worldUnits,i=e.camera;i===null&&!s&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const a=e.params.Line2!==void 0&&e.params.Line2.threshold||0;R=e.ray;const n=this.matrixWorld,l=this.geometry,o=this.material;D=o.linewidth+a,l.boundingSphere===null&&l.computeBoundingSphere(),Q.copy(l.boundingSphere).applyMatrix4(n);let h;if(s)h=D*.5;else{const u=Math.max(i.near,Q.distanceToPoint(R.origin));h=be(i,u,o.resolution)}if(Q.radius+=h,R.intersectsSphere(Q)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),J.copy(l.boundingBox).applyMatrix4(n);let c;if(s)c=D*.5;else{const u=Math.max(i.near,J.distanceToPoint(R.origin));c=be(i,u,o.resolution)}J.expandByScalar(c),R.intersectsBox(J)!==!1&&(s?rt(this,t):ht(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(ne),this.material.uniforms.resolution.value.set(ne.z,ne.w))}}class Le extends Ee{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,s=new Float32Array(2*t);for(let i=0;i<t;i+=3)s[2*i]=e[i],s[2*i+1]=e[i+1],s[2*i+2]=e[i+2],s[2*i+3]=e[i+3],s[2*i+4]=e[i+4],s[2*i+5]=e[i+5];return super.setPositions(s),this}setColors(e){const t=e.length-3,s=new Float32Array(2*t);for(let i=0;i<t;i+=3)s[2*i]=e[i],s[2*i+1]=e[i+1],s[2*i+2]=e[i+2],s[2*i+3]=e[i+3],s[2*i+4]=e[i+4],s[2*i+5]=e[i+5];return super.setColors(s),this}setFromPoints(e){const t=e.length-1,s=new Float32Array(6*t);for(let i=0;i<t;i++)s[6*i]=e[i].x,s[6*i+1]=e[i].y,s[6*i+2]=e[i].z||0,s[6*i+3]=e[i+1].x,s[6*i+4]=e[i+1].y,s[6*i+5]=e[i+1].z||0;return super.setPositions(s),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class dt extends ct{constructor(e=new Le,t=new fe({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}class ut{constructor(e){this.scene=e,this.enabled=!0,this.colors=["red","yellow","green","cyan","blue","purple","pink"],this.debugObjects=new Map}createSphere(e,t,s,i=1){let a=new j(i/2),n=new b({color:s}),l=new S(a,n);l.position.copy(t),l.position.y=.5,l.visible=!0,this.debugObjects.set(e,l),this.scene.add(l)}createLine(e,t,s,i,a){const n=new Le;n.setPositions([t.x,.5,t.z,s.x,.5,s.z]);let l=new fe({color:i,linewidth:a,worldUnits:!0}),o=new dt(n,l);o.computeLineDistances(),this.debugObjects.set(e,o),this.scene.add(o)}showLine(e,t,s,i=0,a=.1){if(!this.enabled)return;let n=this.debugObjects.get(e);if(!n){this.createLine(e,t,s,i,a);return}n.geometry.setPositions([t.x,.5,t.z,s.x,.5,s.z]),n.material.color.set(i),n.computeLineDistances(),n.visible=!0}showSphere(e,t){if(!this.enabled)return;let s=this.debugObjects.get(e);if(!s){let i=this.colors[this.debugObjects.size%this.colors.length];this.createSphere(e,t,i);return}s.position.copy(t),s.position.y=.5,s.visible=!0}hide(e){let t=this.debugObjects.get(e);t&&(t.visible=!1)}hideObjs(e){for(let t of e)this.hide(t)}}class Ae{constructor(){this.heap=[]}isEmpty(){return this.heap.length===0}peek(){return this.heap.length===0?null:this.heap[0]}getParentIndex(e){return Math.floor((e-1)/2)}getLeftChildIndex(e){return 2*e+1}getRightChildIndex(e){return 2*e+2}swap(e,t){let s=this.heap[e];this.heap[e]=this.heap[t],this.heap[t]=s}enqueue(e,t){this.remove(e),this.heap.push([e,t]),this.heapifyUp(this.heap.length-1)}heapifyUp(e){for(;e>0;){let t=this.getParentIndex(e);if(this.heap[e][1]<this.heap[t][1])this.swap(e,t),e=t;else break}}dequeue(){if(this.heap.length===0)return null;let e=this.heap[0][0];return this.heap[0]=this.heap[this.heap.length-1],this.heap.pop(),this.heapifyDown(0),e}heapifyDown(e){for(;;){let t=this.getLeftChildIndex(e),s=this.getRightChildIndex(e),i=e;if(t<this.heap.length&&this.heap[t][1]<this.heap[i][1]&&(i=t),s<this.heap.length&&this.heap[s][1]<this.heap[i][1]&&(i=s),i!==e)this.swap(e,i),e=i;else break}}remove(e){let t=this.findIndex(e);t!==-1&&(this.swap(t,this.heap.length-1),this.heap.pop(),t<this.heap.length&&(this.heapifyDown(t),this.heapifyUp(t)))}findIndex(e){for(let t=0;t<this.heap.length;t++)if(this.heap[t][0]===e)return t;return-1}}class se{constructor(){if(new.target===se)throw new Error("Cannot initialize abstract class")}findPath(e,t,s){throw new Error("Must implement findPath!")}tracePath(e,t,s){let i=[s],a=s;for(;a!==t;)a=e.get(a),i.unshift(a);return i}}class pt extends se{constructor(e){super(),this.heuristic=e}findPath(e,t,s){let i=new Ae,a=new Map,n=new Map;for(a.set(e,0),n.set(e,null),i.enqueue(e,this.heuristic(e,t,s.tileSize));!i.isEmpty();){let l=i.dequeue();if(l===t)return this.tracePath(n,e,t);for(let o of s.getNeighbours(l)){let h=a.get(l)+o.cost;if(!a.has(o)||h<a.get(o)){n.set(o,l),a.set(o,h);let c=h+this.heuristic(o,t,s.tileSize);i.enqueue(o,c)}}}return[]}static manhattan(e,t,s){let i=Math.abs(e.row-t.row),a=Math.abs(e.col-t.col);return(i+a)*s}static diagonal(e,t,s){let i=Math.abs(e.row-t.row),a=Math.abs(e.col-t.col),n=Math.min(i,a),l=Math.max(i,a);return(n*Math.SQRT2+(l-n))*s}static euclidian(e,t,s){let i=Math.abs(e.row-t.row),a=Math.abs(e.col-t.col);return Math.sqrt(i*i+a*a)*s}}class ft extends se{constructor(e,t,s){super(),this.map=e,this.heuristic=t,this.tileMapRenderer=s}findPath(e,t){let s=new Ae,i=new Map,a=new Map;for(i.set(e,0),a.set(e,null),s.enqueue(e,this.heuristic(e,t,1));!s.isEmpty();){let n=s.dequeue();if(n===t)return this.tracePath(a,e,t);for(let l of this.identifySuccessors(n,t,a)){let o=i.get(n)+this.heuristic(n,l,1);if(!i.has(l)||o<i.get(l)){i.set(l,o),a.set(l,n);let h=o+this.heuristic(l,t,1);s.enqueue(l,h)}}}return[]}identifySuccessors(e,t,s){let i=[],a=s.get(e),n=this.pruneDirections(e,a);for(let l of n){let o=this.jump(e,l[0],l[1],t);o&&(i.push(o),this.tileMapRenderer?.setTileColor?.(o,new B("orange")))}return i}pruneDirections(e,t){if(!t)return[[-1,0],[1,0],[0,-1],[0,1]];let s=Math.sign(e.row-t.row),i=Math.sign(e.col-t.col);return i!==0?[[0,i],[-1,0],[1,0]]:[[s,0],[0,-1],[0,1]]}jump(e,t,s,i){let a=e.row+t,n=e.col+s;if(!this.map.isWalkable(a,n))return null;let l=this.map.grid[a][n];if(l===i)return l;if(s!==0){if(this.map.isWalkable(a-1,n)&&!this.map.isWalkable(a-1,n-s)||this.map.isWalkable(a+1,n)&&!this.map.isWalkable(a+1,n-s))return l}else if(t!==0&&(this.map.isWalkable(a,n-1)&&!this.map.isWalkable(a-t,n-1)||this.map.isWalkable(a,n+1)&&!this.map.isWalkable(a-t,n+1)||this.jump(l,0,-1,i)||this.jump(l,0,1,i)))return l;return this.jump(l,t,s,i)}}class de{constructor({points:e=[],radius:t=2}={}){this.points=e,this.radius=t}add(e){this.points.push(e)}get(e){return this.points[e]}size(){return this.points.length}}class E{static seek(e,t){let i=(t.position||t).clone().sub(e.position);return i.setLength(e.topSpeed),i.sub(e.velocity)}static flee(e,t){let s=t.position||t,i=e.position.clone().sub(s);return i.setLength(e.topSpeed),i.sub(e.velocity)}static pursue(e,t,s){let i=t.position.clone();return i.addScaledVector(t.velocity,s),E.seek(e,i)}static evade(e,t,s){let i=t.position.clone();return i.addScaledVector(t.velocity,s),E.flee(e,i)}static arrive(e,t,s,i){let n=(t.position||t).clone().sub(e.position),l=n.length();if(l<i)return e.velocity.clone().multiplyScalar(-e.maxForce);let o=e.topSpeed;return l<s&&(o=o*(l/s)),n.setLength(o),n.sub(e.velocity)}static wander(e,t=5,s=2,i=.3){e.wanderAngle||(e.wanderAngle=Math.random()*2*Math.PI);let a=e.velocity.clone().setLength(t);a.add(e.position);let n=s*Math.sin(e.wanderAngle),l=s*Math.cos(e.wanderAngle);return a.add(new p(n,0,l)),e.wanderAngle+=Math.random()*2*i-i,E.seek(e,a)}}class mt{static simple(e,t){let s=e.pathFollower,i=s.path.get(s.index);return e.position.distanceTo(i)<t&&s.index<s.path.size()-1&&s.index++,s.index===s.path.size()-1?E.arrive(e,i,t,.5):E.seek(e,i)}static reynolds(e,t,s,i){let a=new p,n=e.velocity.clone().multiplyScalar(t),l=e.position.clone().add(n),o=e.pathFollower;if(o.index===o.path.size()-1){let v=o.path.get(o.index);return E.arrive(e,v,s,.5)}let h=o.path.get(o.index),c=o.path.get(o.index+1),u=l.clone().sub(h),d=c.clone().sub(h),m=u.dot(d)/d.length();m=Math.max(0,m),m>d.length()&&o.index++;let F=d.clone().setLength(m),w=h.clone().add(F),y=w.distanceTo(l),I=d.clone().setLength(s);return I.add(w),y>o.path.radius&&(a=E.seek(e,I)),i.updatePositions([l,w,I]),a}}class U{static round(e,t,s,i,a){let n=new p,l=e.velocity.clone().multiplyScalar(s),o=e.position.clone().add(l);a.showLine("predictedLocation",e.position,o,"black");let h=U.getClosestPointOnSegment(e.position,o,t.position);a.showSphere("closestPoint",h);let c=h.distanceTo(t.position)<=t.radius,u=new p,d=new p;return c?(u=U.getLineCircleCollisionPoint(e.position,o,t.position,t.radius),d=U.getAvoidTarget(u,t,i),n=E.seek(e,d),a.showSphere("collisionPoint",u),a.showSphere("target",d)):a.hideObjs(["collisionPoint","target"]),n}static getAvoidTarget(e,t,s){let i=e.clone().sub(t.position);return i.setLength(s),e.clone().add(i)}static getClosestPointOnSegment(e,t,s){let i=t.clone().sub(e),n=s.clone().sub(e).dot(i)/i.length(),l=P.clamp(n,0,i.length()),o=i.clone().setLength(l);return o.add(e),o}static getLineCircleCollisionPoint(e,t,s,i){let a=t.clone().sub(e),l=s.clone().sub(e).dot(a)/a.length(),o=a.clone().setLength(l);o.add(e);let h=o.clone().sub(s),c=Math.sqrt(i*i-h.length()**2),u=l-c,d=a.clone().setLength(u);return d.add(e),d}static wall(e,t,s,i,a,n){n.showLine("wall",t,s,"red");let l=new p,o=e.velocity.clone().multiplyScalar(i),h=e.position.clone().add(o);n.showLine("predictedLocation",e.position,h,"black");let c=U.getLineLineCollisionPoint(e.position,h,t,s);if(c){n.showSphere("collisionPoint",c);let u=s.clone().sub(t),d=new p(-u.z,0,u.x);d.dot(e.velocity)>0&&d.multiplyScalar(-1);let m=c.clone().add(d.setLength(a));n.showSphere("target",m),l=E.seek(e,m)}else n.hideObjs(["target","collisionPoint"]);return l}static getLineLineCollisionPoint(e,t,s,i){let a=t.clone().sub(e),n=i.clone().sub(s),l=a.x*n.z-a.z*n.x;if(l===0)return null;let o=s.x-e.x,h=s.z-e.z,c=(o*n.z-h*n.x)/l,u=(o*a.z-h*a.x)/l;if(c<0||c>1||u<0||u>1)return null;let d=new p;return d.x=e.x+c*a.x,d.y=0,d.z=e.z+c*a.z,d}}class Re{constructor({position:e=new p(0,0,0),scale:t=new p(1,1,1),mesh:s=null,color:i="red"}={}){this.position=e.clone(),this.scale=t.clone(),this.mesh=s||this.createDefaultMesh(i),this.mesh.position.copy(this.position),this.mesh.position.y+=this.scale.y/2}createDefaultMesh(e){return new S(new he(this.scale.x,this.scale.y,this.scale.z),new b({color:e}))}}class Ie extends Re{constructor({velocity:e=new p(0,0,0),acceleration:t=new p(0,0,0),topSpeed:s=5,mass:i=1,friction:a=1,maxForce:n=15,...l}={}){super(l),this.velocity=e.clone(),this.acceleration=t.clone(),this.topSpeed=s,this.mass=i,this.friction=a,this.maxForce=n}createDefaultMesh(e){let t=new S(new Fe(this.scale.x/2,this.scale.y,30),new b({color:e}));t.rotation.x=Math.PI/2;let s=new N;return s.add(t),s}setColor(e){this.mesh.children[0].material=new b({color:e})}applyForce(e){e.clampLength(0,this.maxForce);let t=e.clone().divideScalar(this.mass);this.acceleration.add(t)}update(e,t){this.velocity.addScaledVector(this.acceleration,e),this.velocity.multiplyScalar(this.friction),this.velocity.clampLength(0,this.topSpeed);let s=Math.atan2(this.velocity.x,this.velocity.z);if(this.mesh.rotation.y=s,this.position.addScaledVector(this.velocity,e),t.handleCollisions){let i=this.position.clone();this.position=t.handleCollisions(this);let a=this.position.clone().sub(i);Math.abs(a.x)>.001&&(this.velocity.x=0),Math.abs(a.z)>.001&&(this.velocity.z=0)}else this.position=t.wrapPosition(this.position);this.mesh.position.copy(this.position),this.mesh.position.y+=this.scale.y/2,this.acceleration.set(0,0,0)}}class gt extends Ie{constructor({radius:e=.6,height:t=1.6,...s}={}){super({scale:new p(e*2,t,e*2),topSpeed:7.5,mass:1,friction:.84,maxForce:55,color:"#d8d1c2",...s}),this.radius=e,this.facing=new p(0,0,1),this.desiredFacing=this.facing.clone(),this.moveIntent=new p(0,0,0),this.turnLerpSpeed=21,this.flashlightOn=!0,this.flashlightRange=19,this.flashlightSenseRange=24,this.flashlightCoreCos=Math.cos(P.degToRad(16)),this.flashlightHaloCos=Math.cos(P.degToRad(34))}createDefaultMesh(e){const t=new N,s=new S(new H(this.scale.x*.38,this.scale.x*.45,this.scale.y*.78,18),new b({color:e,roughness:.95}));s.castShadow=!1,s.position.y=this.scale.y*.38;const i=new S(new j(this.scale.x*.24,16,16),new b({color:"#f1e7d2",roughness:.9}));i.castShadow=!1,i.position.y=this.scale.y*.82;const a=new S(new j(this.scale.x*.16,16,16),new b({color:"#ffd78a",emissive:"#ffb347",emissiveIntensity:1.4}));return a.castShadow=!1,a.position.set(0,this.scale.y*.58,this.scale.x*.42),t.add(s,i,a),t}setColor(e){this.mesh.children[0].material.color.set(e)}setFlashlight(e){this.flashlightOn=e;let t=this.mesh.children[2];t.material.emissiveIntensity=e?1.4:.15,t.material.color.set(e?"#ffd78a":"#6e6555")}getLookTarget(e=8){return this.position.clone().add(this.facing.clone().multiplyScalar(e))}getFlashlightOrigin(){return this.position.clone().add(this.facing.clone().multiplyScalar(this.radius*.55)).add(new p(0,this.scale.y*.78,0))}getLanternWorldPosition(){return this.position.clone().add(this.facing.clone().multiplyScalar(this.scale.x*.42)).add(new p(0,this.scale.y*.58,0))}getFlashlightVolumeOrigin(){return this.getLanternWorldPosition().add(this.facing.clone().multiplyScalar(this.scale.x*.12))}getFlashlightRayStart(){return this.position.clone().add(this.facing.clone().multiplyScalar(this.radius*.08)).add(new p(0,this.scale.y*.42,0))}setMoveIntent(e){this.moveIntent.copy(e).setY(0),this.moveIntent.lengthSq()>0&&(this.moveIntent.normalize(),this.desiredFacing.copy(this.moveIntent))}update(e,t){if(this.moveIntent.lengthSq()>0&&this.desiredFacing.copy(this.moveIntent),this.desiredFacing.lengthSq()>0){let i=1-Math.exp(-this.turnLerpSpeed*e),a=Math.atan2(this.facing.x,this.facing.z),n=Math.atan2(this.desiredFacing.x,this.desiredFacing.z),l=Math.atan2(Math.sin(n-a),Math.cos(n-a)),o=a+l*i;this.facing.set(Math.sin(o),0,Math.cos(o))}super.update(e,t);let s=Math.atan2(this.facing.x,this.facing.z);this.mesh.rotation.y=s}}class wt extends Ie{constructor({radius:e=.65,height:t=1.9,...s}={}){super({scale:new p(e*2,t,e*2),topSpeed:9.4,mass:1,friction:.94,maxForce:86,color:"#7bdcff",...s}),this.radius=e,this.behaviourTree=null,this.pathFollower={path:new de({points:[],radius:.8}),index:0},this.stateLabel="Dormant",this.pathReason="patrol",this.pathTargetTile=null,this.repathTimer=0,this.stunTimer=0,this.lightResistTimer=0,this.playerMemory=0,this.lightMemory=0,this.lastKnownPlayerTile=null,this.lastLightTile=null,this.patrolTile=null,this.retreatTile=null,this.baseColor=new B("#7bdcff"),this.visualTime=0}createDefaultMesh(e){const t=new N,s=new S(new j(this.scale.x*.32,24,24),new b({color:e,emissive:e,emissiveIntensity:1.1,transparent:!0,opacity:.92}));s.castShadow=!0,s.position.y=this.scale.y*.72;const i=new S(new Fe(this.scale.x*.7,this.scale.y*1.25,24,1,!0),new b({color:e,emissive:e,emissiveIntensity:.55,transparent:!0,opacity:.34,side:_}));i.castShadow=!0,i.position.y=this.scale.y*.45;const a=new S(new Pe(this.scale.x*.5,this.scale.x*.06,12,24),new b({color:"#d6fdff",emissive:"#aff7ff",emissiveIntensity:1.2,transparent:!0,opacity:.8}));return a.castShadow=!0,a.rotation.x=Math.PI/2,a.position.y=this.scale.y*.68,t.add(s,i,a),t}setColor(e){this.baseColor.set(e),this.updateAppearance()}setPath(e,t,s){this.pathFollower.path=e,this.pathFollower.index=e.size()>1?1:0,this.pathTargetTile=t,this.pathReason=s}clearPath(){this.setPath(new de({points:[],radius:.8}),null,"idle")}update(e,t){this.visualTime+=e,this.repathTimer=Math.max(0,this.repathTimer-e),this.stunTimer=Math.max(0,this.stunTimer-e),this.lightResistTimer=Math.max(0,this.lightResistTimer-e),this.playerMemory=Math.max(0,this.playerMemory-e),this.lightMemory=Math.max(0,this.lightMemory-e),this.behaviourTree&&this.behaviourTree.update(),super.update(e,t),this.updateAppearance()}updateAppearance(){const e=this.mesh.children[0],t=this.mesh.children[1],s=this.mesh.children[2],i=.5+.5*Math.sin(this.visualTime*18);e.material.color.copy(this.baseColor),e.material.emissive.copy(this.baseColor),t.material.color.copy(this.baseColor),t.material.emissive.copy(this.baseColor),s.material.color.set("#d6fdff"),s.material.emissive.copy(this.baseColor),e.material.opacity=.92,t.material.opacity=.34,e.material.emissiveIntensity=1.1,t.material.emissiveIntensity=.55,s.material.emissiveIntensity=1.2,this.stateLabel==="Investigating"&&(s.material.color.set("#ffe5ad"),s.material.emissive.set("#ffd290"),s.material.emissiveIntensity=1.55),(this.stateLabel==="Hunting"||this.stateLabel==="Hunting Light")&&(e.material.emissiveIntensity=1.45,t.material.opacity=.4,s.material.color.set("#ffd2d2"),s.material.emissive.set("#ff8d8d"),s.material.emissiveIntensity=1.8),this.stunTimer>0||this.stateLabel==="Banished"?(e.material.color.set("#fff2b2"),e.material.emissive.set("#ffe28a"),t.material.color.set("#ffe4a6"),t.material.emissive.set("#ffd67a"),s.material.color.set("#fff8d2"),s.material.emissive.set("#ffe27a"),e.material.opacity=.98,t.material.opacity=.46,e.material.emissiveIntensity=1.95+i*.65,t.material.emissiveIntensity=.95+i*.35,s.material.emissiveIntensity=2.2+i*.8):this.lightResistTimer>0&&(s.material.color.set("#ffd8a8"),s.material.emissive.set("#ffc671"),s.material.emissiveIntensity=1.45,t.material.opacity=.38,e.material.emissiveIntensity=1.25)}}class yt extends Re{constructor({phase:e=Math.random()*Math.PI*2,...t}={}){super({scale:new p(.8,1.2,.8),color:"#7ed9ff",...t}),this.phase=e,this.baseY=this.mesh.position.y,this.collected=!1}createDefaultMesh(e){const t=new N,s=new S(new H(this.scale.x*.12,this.scale.x*.16,this.scale.y*.72,16),new b({color:"#efe2bf",roughness:.92}));s.castShadow=!0,s.position.y=this.scale.y*.24;const i=new S(new H(this.scale.x*.18,this.scale.x*.18,this.scale.y*.08,18),new b({color:"#b6925f",roughness:.85}));i.castShadow=!0,i.position.y=this.scale.y*.62;const a=new S(new j(this.scale.x*.14,16,16),new b({color:e,emissive:"#ffcc7a",emissiveIntensity:1.8,transparent:!0,opacity:.92}));return a.castShadow=!0,a.position.y=this.scale.y*.82,t.add(s,i,a),t}setCollected(e){this.collected=e,this.mesh.visible=!e}update(e){if(this.collected)return;let t=Math.sin(e*2.2+this.phase)*.18;this.mesh.position.y=this.baseY+t,this.mesh.children[2].scale.y=.85+.3*(.5+Math.sin(e*6+this.phase)*.5),this.mesh.children[2].scale.x=.9+.18*(.5+Math.cos(e*5+this.phase)*.5),this.mesh.rotation.y+=.01}}class St{constructor(e){this.root=e}update(){return this.root.run()}}class f{static Status=Object.freeze({Success:Symbol("Success"),Failure:Symbol("Failure"),Running:Symbol("Running")});constructor(){if(new.target===f)throw new Error("Cannot instantiate abstract class Node")}run(){throw new Error("run() must be implemented")}}class re extends f{constructor(e=[]){super(),this.children=e}run(){for(let e of this.children){let t=e.run();if(t===f.Status.Failure)return f.Status.Failure;if(t===f.Status.Running)return f.Status.Running}return f.Status.Success}}class vt extends f{constructor(e=[]){super(),this.children=e}run(){for(let e of this.children){let t=e.run();if(t===f.Status.Success)return f.Status.Success;if(t===f.Status.Running)return f.Status.Running}return f.Status.Failure}}class bt extends f{constructor(e){super(),this.ghost=e}run(){return this.ghost.stunTimer>0?f.Status.Success:f.Status.Failure}}class xt extends f{constructor(e){super(),this.world=e}run(){let e=this.world.ghost.retreatTile||this.world.getRetreatTile();return!this.world.driveGhost(e,"retreat","Banished","#ffe38b",14.2,"evade")&&this.world.ghost.stunTimer>0||this.world.ghost.stunTimer>0?f.Status.Running:f.Status.Success}}class Mt extends f{constructor(e){super(),this.world=e}run(){return this.world.ghost.playerMemory>0&&this.world.ghost.lastKnownPlayerTile?f.Status.Success:f.Status.Failure}}class Tt extends f{constructor(e){super(),this.world=e}run(){const e=this.world.player.topSpeed;return this.world.driveGhost(this.world.ghost.lastKnownPlayerTile,"hunt",this.world.player.flashlightOn?"Hunting Light":"Hunting","#ff7f7f",e,"pursue"),f.Status.Running}}class zt extends f{constructor(e){super(),this.world=e}run(){return this.world.ghost.lightMemory>0&&this.world.ghost.lastLightTile?f.Status.Success:f.Status.Failure}}class Ct extends f{constructor(e){super(),this.world=e}run(){return this.world.driveGhost(this.world.ghost.lastLightTile,"investigate","Investigating","#f7d28b",9.6,"none")&&(this.world.ghost.lightMemory=0),f.Status.Running}}class Ft extends f{constructor(e){super(),this.world=e}run(){let e=this.world.ensureGhostPatrolTile();return this.world.driveGhost(e,"patrol","Patrolling","#9db8ff",8.1,"none")&&(this.world.ghost.patrolTile=null),f.Status.Running}}class Pt extends St{constructor(e){let t=new vt,s=e.ghost,i=new re([new bt(s),new xt(e)]),a=new re([new Mt(e),new Tt(e)]),n=new re([new zt(e),new Ct(e)]),l=new Ft(e);t.children.push(i,a,n,l),super(t)}}class Et{constructor(){this.scene=Qe(),this.camera=et(),this.renderer=tt(),this.debug=new ut(this.scene),this.debug.enabled=!1,this.clock=new Ye,this.inputHandler=new st(this.camera),this.entities=[],this.memories=[],this.time=0,this.gameState="playing",this.pathDebugEnabled=!1,this.ghostPathTiles=[],this.statusMessage="",this.playerSpeedFactor=2.2,this.flashlightFlickerTimer=0,window.addEventListener("resize",()=>this.onResize())}init(){this.resetRun()}resetRun(){this.clearScene(),this.entities=[],this.memories=[],this.ghostPathTiles=[],this.gameState="playing",this.statusMessage="Recover the five ritual candles, then return to the central altar.",this.time=0,this.flashlightFlickerTimer=0,it(this.scene),this.map=new lt(2.4,{mazeRows:11,mazeCols:15}),this.tileMapRenderer=new ot(this.map),this.tileMapRenderer.render(this.scene),this.player=new gt({position:this.map.localize(this.map.startTile)}),this.ghost=new wt({position:this.map.localize(this.map.ghostSpawnTile)}),this.ghost.behaviourTree=new Pt(this),this.addEntityToWorld(this.player),this.addEntityToWorld(this.ghost),this.createFlashlight(),this.createExitBeacon(),this.spawnMemoryEchoes(5),this.updateExitBeacon(),this.refreshGhostPathDebug([]),this.onResize()}clearScene(){for(let e of[...this.scene.children])this.scene.remove(e);this.debug.debugObjects.clear()}createFlashlight(){this.flashlightTarget=new Xe,this.scene.add(this.flashlightTarget),this.flashlight=new Ze("#ffd49a",9.2,30,.5,.24,1.05),this.flashlight.castShadow=!0,this.flashlight.shadow.mapSize.width=2048,this.flashlight.shadow.mapSize.height=2048,this.flashlight.shadow.camera.near=.2,this.flashlight.shadow.camera.far=26,this.flashlight.shadow.focus=1,this.flashlight.shadow.bias=-6e-4,this.flashlight.shadow.normalBias=.008,this.flashlight.target=this.flashlightTarget,this.scene.add(this.flashlight),this.flashlightWallBeams=this.createFlashlightWallBeams(6),this.flashlightVolumeBeam=null,this.flashlightSourceGlow=this.createFlashlightSourceGlow(),this.scene.add(this.flashlightSourceGlow.mesh),this.flashlightFloorBeam=this.createFlashlightFloorBeam(),this.scene.add(this.flashlightFloorBeam.mesh),this.updateFlashlight()}createFlashlightWallBeamTexture(){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");t.clearRect(0,0,e.width,e.height);const s=t.createRadialGradient(128,128,28,128,128,126);s.addColorStop(0,"rgba(255, 243, 214, 0.34)"),s.addColorStop(.22,"rgba(255, 227, 170, 0.16)"),s.addColorStop(.58,"rgba(255, 198, 118, 0.05)"),s.addColorStop(1,"rgba(255, 198, 118, 0)"),t.fillStyle=s,t.fillRect(0,0,e.width,e.height);const i=new V(e);return i.colorSpace=K,i.minFilter=W,i.magFilter=W,i}createFlashlightWallBeams(e=6){let t=[],s=this.createFlashlightWallBeamTexture();for(let i=0;i<e;i++){let a=new ae,n=new $({color:"#ffe0ae",map:s,transparent:!0,opacity:.16,blending:Y,depthWrite:!1,side:_,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),l=new S(a,n);l.renderOrder=4,l.visible=!1,l.userData.baseOpacity=.16,this.scene.add(l),t.push(l)}return t}createFlashlightFloorBeam(){const t=new Float32Array(102),s=new Float32Array(68),i=[];for(let d=1;d<33;d++)i.push(0,d,d+1);const a=new ae;a.setAttribute("position",new X(t,3)),a.setAttribute("uv",new X(s,2)),a.setIndex(i);const n=document.createElement("canvas");n.width=256,n.height=256;const l=n.getContext("2d");l.clearRect(0,0,n.width,n.height);const o=l.createLinearGradient(128,12,128,246);o.addColorStop(0,"rgba(255, 224, 170, 0.1)"),o.addColorStop(.28,"rgba(255, 214, 152, 0.12)"),o.addColorStop(.72,"rgba(255, 194, 120, 0.08)"),o.addColorStop(1,"rgba(255, 194, 120, 0)"),l.fillStyle=o,l.beginPath(),l.moveTo(128,8),l.quadraticCurveTo(222,98,250,246),l.lineTo(6,246),l.quadraticCurveTo(34,98,128,8),l.closePath(),l.fill();const h=new V(n);h.colorSpace=K,h.minFilter=W,h.magFilter=W;const c=new $({color:"#ffe4b8",map:h,transparent:!0,opacity:.62,blending:Y,depthWrite:!1,side:_,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),u=new S(a,c);return u.renderOrder=3,{mesh:u,geometry:a,positions:t,rayCount:33}}createFlashlightSourceGlow(){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");t.clearRect(0,0,e.width,e.height);const s=t.createRadialGradient(128,128,12,128,128,126);s.addColorStop(0,"rgba(255, 246, 218, 0.88)"),s.addColorStop(.28,"rgba(255, 228, 170, 0.46)"),s.addColorStop(.65,"rgba(255, 194, 120, 0.14)"),s.addColorStop(1,"rgba(255, 194, 120, 0)"),t.fillStyle=s,t.fillRect(0,0,e.width,e.height);const i=new V(e);i.colorSpace=K,i.minFilter=W,i.magFilter=W;const a=new $({color:"#ffe2b0",map:i,transparent:!0,opacity:.5,blending:Y,depthWrite:!1,side:_,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),n=new S(new Je(1.7,1.15),a);return n.rotation.x=-Math.PI/2,n.renderOrder=5,{mesh:n}}createFlashlightVolumeBeam(){const t=new Float32Array(102),s=new Float32Array(68),i=[];for(let d=1;d<33;d++)i.push(0,d,d+1);const a=new ae;a.setAttribute("position",new X(t,3)),a.setAttribute("uv",new X(s,2)),a.setIndex(i);const n=document.createElement("canvas");n.width=256,n.height=256;const l=n.getContext("2d");l.clearRect(0,0,n.width,n.height);const o=l.createRadialGradient(128,44,10,128,176,180);o.addColorStop(0,"rgba(255, 237, 196, 0.2)"),o.addColorStop(.28,"rgba(255, 220, 162, 0.11)"),o.addColorStop(.68,"rgba(255, 198, 124, 0.035)"),o.addColorStop(1,"rgba(255, 198, 124, 0)"),l.fillStyle=o,l.beginPath(),l.moveTo(128,10),l.quadraticCurveTo(220,92,250,250),l.lineTo(6,250),l.quadraticCurveTo(36,92,128,10),l.closePath(),l.fill();const h=new V(n);h.colorSpace=K,h.minFilter=W,h.magFilter=W;const c=new $({color:"#ffe4b8",map:h,transparent:!0,opacity:.11,blending:Y,depthWrite:!1,side:_}),u=new S(a,c);return u.renderOrder=2,{mesh:u,geometry:a,positions:t,rayCount:33}}sampleFlashlightCone(e,t,s,i=21,a=s){const n=[],l=new p(0,1,0),o=this.flashlight.angle*.98,h=this.player.getLanternWorldPosition().addScaledVector(this.player.facing,this.player.radius*.08);h.y=.04;for(let d=0;d<i;d++){const m=i===1?.5:d/(i-1),F=P.lerp(-o,o,m),w=this.player.facing.clone().applyAxisAngle(l,F).normalize(),y=this.map.clipRayToWalkable(e,w,this.player.flashlightRange),I=this.map.clipRayToWalkable(a,w,this.player.flashlightRange),v=y.blocked?Math.max(y.hitDistance-t+this.map.tileSize*.22,this.player.radius*1.15):Math.max(y.distance-t,this.player.radius*1.15),x=h.clone().addScaledVector(w,v);x.y=h.y;const C=y.blocked?Math.max(y.hitDistance-t,this.map.tileSize*.56):Math.max(y.distance-t,this.player.radius*1.05),O=y.blocked?Math.max(y.hitDistance-t+this.map.tileSize*.22,this.map.tileSize*.92):Math.max(y.distance-t,this.player.radius*1.08),k=s.clone().addScaledVector(w,C);k.y=y.blocked?.72:.16,n.push({t:m,rayDirection:w,beam:y,volumeBeam:I,floorPoint:x,target:k,targetDistance:C,beamDistance:O})}const c=.58,u=this.map.tileSize*2.35;for(let d=0;d<n.length;d++){const m=n[d],F=m.volumeBeam.blocked?m.volumeBeam.hitDistance:m.volumeBeam.distance,w=Math.min(Math.max(F*.34,this.player.radius*.52),u);m.volumePoint=a.clone().addScaledVector(m.rayDirection,w),m.volumePoint.y=c}return{floorOrigin:h,samples:n}}updateFlashlightFloorBeam(e,t){if(!this.flashlightFloorBeam)return;let s=this.isFlashlightActive();if(this.flashlightFloorBeam.mesh.visible=s,!s)return;const{positions:i,geometry:a,rayCount:n}=this.flashlightFloorBeam;i[0]=e.x,i[1]=e.y,i[2]=e.z;const l=a.attributes.uv.array;l[0]=.5,l[1]=0;for(let o=0;o<n;o++){const h=t[o],c=h.floorPoint,u=(o+1)*3;i[u]=c.x,i[u+1]=e.y,i[u+2]=c.z;const d=(o+1)*2;l[d]=h.t,l[d+1]=1}a.attributes.position.needsUpdate=!0,a.attributes.uv.needsUpdate=!0,a.computeBoundingSphere()}updateFlashlightSourceGlow(e){if(!this.flashlightSourceGlow)return;let t=this.isFlashlightActive();if(this.flashlightSourceGlow.mesh.visible=t,!t)return;const s=e.clone().addScaledVector(this.player.facing,this.player.radius*.14);s.y=e.y+.02,this.flashlightSourceGlow.mesh.position.copy(s),this.flashlightSourceGlow.mesh.rotation.z=Math.atan2(this.player.facing.x,this.player.facing.z)}updateFlashlightVolumeBeam(e,t){if(!this.flashlightVolumeBeam)return;let s=this.isFlashlightActive();if(this.flashlightVolumeBeam.mesh.visible=s,!s)return;const{positions:i,geometry:a,rayCount:n}=this.flashlightVolumeBeam;i[0]=e.x,i[1]=e.y,i[2]=e.z;const l=a.attributes.uv.array;l[0]=.5,l[1]=0;for(let o=0;o<n;o++){const h=t[Math.min(o,t.length-1)],c=h.volumePoint||h.target,u=(o+1)*3;i[u]=c.x,i[u+1]=c.y,i[u+2]=c.z;const d=(o+1)*2;l[d]=h.t,l[d+1]=1}a.attributes.position.needsUpdate=!0,a.attributes.uv.needsUpdate=!0,a.computeBoundingSphere()}updateFlashlightWallBeams(e){if(!this.flashlightWallBeams)return;let t=this.isFlashlightActive();for(let l of this.flashlightWallBeams)l.visible=!1;if(!t)return;const s=[];let i=null;for(let l of e){let o=l.beam.hitSegment;if(!l.beam.blocked||!o){i=null;continue}let h=`${o.normal.x},${o.normal.z},${o.planeCoord.toFixed(3)}`;(!i||i.key!==h)&&(i={key:h,normal:o.normal,samples:[]},s.push(i)),i.samples.push(l)}let a=2.35,n=0;for(let l of s){if(n>=this.flashlightWallBeams.length)break;if(l.samples.length===0)continue;let o=this.flashlightWallBeams[n++],h=new p(-l.normal.z,0,l.normal.x),c=l.samples.map(v=>v.beam.hitPoint.clone().addScaledVector(l.normal,.03));if(c.length===1){let v=c[0],x=this.map.tileSize*.18;c=[v.clone().addScaledVector(h,-x),v.clone().addScaledVector(h,x)]}else c[0].addScaledVector(h,-this.map.tileSize*.08),c[c.length-1].addScaledVector(h,this.map.tileSize*.08);let u=[],d=[],m=[],F=c.length;for(let v=0;v<F;v++){let x=F===1?.5:v/(F-1),C=c[v].clone();C.y=.04;let O=C.clone();if(O.y=a,u.push(C.x,C.y,C.z),u.push(O.x,O.y,O.z),d.push(x,1),d.push(x,0),v<F-1){let k=v*2;m.push(k,k+1,k+2),m.push(k+1,k+3,k+2)}}o.geometry.setAttribute("position",new ie(u,3)),o.geometry.setAttribute("uv",new ie(d,2)),o.geometry.setIndex(m),o.geometry.computeBoundingSphere();let w=l.samples.reduce((v,x)=>v+x.beam.hitDistance,0)/l.samples.length,y=P.smoothstep(w/this.player.flashlightRange,.18,1),I=P.lerp(1,.1,y*y);o.material.opacity=o.userData.baseOpacity*I,o.visible=!0}}createExitBeacon(){let e=this.map.localize(this.map.exitTile);const t=new S(new H(1.25,1.45,.8,24),new b({color:"#2f3d4b",emissive:"#1d2832",emissiveIntensity:.35}));t.castShadow=!0,t.receiveShadow=!0,t.position.y=.4;const s=new S(new H(.32,.48,2,18),new b({color:"#6f8ca0",emissive:"#27425a",emissiveIntensity:.45}));s.castShadow=!0,s.receiveShadow=!0,s.position.y=1.35;const i=new S(new Pe(.95,.08,16,28),new b({color:"#365748",emissive:"#365748",emissiveIntensity:.5}));i.castShadow=!0,i.receiveShadow=!0,i.rotation.x=Math.PI/2,i.position.y=.92,this.exitBeacon=new N,this.exitBeacon.position.copy(e),this.exitBeacon.add(t,s,i),this.scene.add(this.exitBeacon)}spawnMemoryEchoes(e){let t=new Set([this.map.startTile,this.map.exitTile,this.map.ghostSpawnTile]);for(let s=0;s<e;s++){let i=this.map.getGaussianWalkableTile(t);t.add(i),i.type=g.Type.Shrine,i.cost=g.Cost.get(g.Type.Shrine),this.tileMapRenderer.setTileColor(i,this.tileMapRenderer.getFloorColor(i));let a=new yt({position:this.map.localize(i)});this.memories.push({tile:i,echo:a,collected:!1}),this.scene.add(a.mesh)}}addEntityToWorld(e){this.scene.add(e.mesh),this.entities.push(e)}update(){let e=Math.min(this.clock.getDelta(),.1);this.time+=e,this.flashlightFlickerTimer=Math.max(0,this.flashlightFlickerTimer-e),this.handleToggles(),this.gameState==="playing"&&this.updatePlayer(e),this.updateCamera(e),this.updateFlashlight();for(let t of this.memories)t.echo.update(this.time);this.gameState==="playing"&&(this.updateAwareness(),this.ghost.update(e,this.map),this.updateMemories(),this.updateWinLoss(),this.updateExitBeacon()),this.updateHud()}updatePlayer(e){let t=this.inputHandler.keys.shift;this.player.topSpeed=(t?9.3:7.5)*this.playerSpeedFactor,this.player.maxForce=(t?70:55)*this.playerSpeedFactor;let s=this.inputHandler.getMoveIntent();this.player.setMoveIntent(s);let i=this.player.velocity.clone().setY(0),a=i.length();if(s.lengthSq()>0){if(a>.08){let l=i.clone().normalize().dot(s);if(l<-.15)this.player.velocity.x=0,this.player.velocity.z=0,i.set(0,0,0),a=0;else if(l<.3){let o=i.clone().normalize().multiplyScalar(-this.player.maxForce);this.player.applyForce(o)}}let n=s.clone().setLength(this.player.maxForce);this.player.applyForce(n)}else if(a>.08){let n=i.clone().normalize().multiplyScalar(-this.player.maxForce*.8);this.player.applyForce(n),a<.32&&(this.player.velocity.x=0,this.player.velocity.z=0)}this.player.update(e,this.map)}updateAwareness(){let e=this.ghost.position.distanceTo(this.player.position),t=this.map.quantize(this.player.position),s=this.isFlashlightActive();e<14&&this.map.hasLineOfSight(this.ghost.position,this.player.position)&&(this.ghost.lastKnownPlayerTile=t,this.ghost.playerMemory=s?2.4:1.6),s&&e<this.player.flashlightSenseRange&&this.map.hasLineOfSight(this.ghost.position,this.player.position)&&(this.ghost.lastLightTile=t,this.ghost.lightMemory=2.8),this.isGhostInFlashlightCore()&&this.stunGhost()}stunGhost(){this.ghost.stunTimer>0||this.ghost.lightResistTimer>0||(this.ghost.stunTimer=Math.max(this.ghost.stunTimer,1.35),this.flashlightFlickerTimer=Math.max(this.flashlightFlickerTimer,.7),this.ghost.lightResistTimer=Math.max(this.ghost.lightResistTimer,2.7),this.ghost.retreatTile=this.getRetreatTile(),this.statusMessage="The flashlight burned the Entity. Push forward or break line of sight while it retreats.")}isFlashlightActive(){if(!this.player.flashlightOn)return!1;if(this.flashlightFlickerTimer<=0)return!0;let e=this.flashlightFlickerTimer;return Math.sin((.7-e)*46)>-.15&&Math.cos((.7-e)*31)>-.4}isGhostInFlashlightCore(){if(!this.isFlashlightActive()||this.ghost.lightResistTimer>0)return!1;let e=this.ghost.position.clone().sub(this.player.position);return e.length()>this.player.flashlightRange?!1:(e.normalize(),e.dot(this.player.facing)>=this.player.flashlightCoreCos&&this.map.hasLineOfSight(this.player.position,this.ghost.position))}driveGhost(e,t,s,i,a,n){if(!e)return!1;this.ghost.stateLabel=s,this.ghost.setColor(i),this.ghost.topSpeed=a,this.ghost.maxForce=Math.max(70,a*7.2),this.ensureGhostPath(e,t);let l=this.getGhostPathForce();if(n==="pursue"&&this.map.hasLineOfSight(this.ghost.position,this.player.position)){let h=E.pursue(this.ghost,this.player,.55);l.add(h.multiplyScalar(.7))}else if(n==="evade"){let h=E.evade(this.ghost,this.player,.75);l.add(h.multiplyScalar(.85))}l.add(this.getWallAvoidanceForce(this.ghost).multiplyScalar(.85)),this.ghost.applyForce(l);let o=this.map.localize(e);return this.ghost.position.distanceTo(o)<this.map.tileSize*.45}ensureGhostPath(e,t){if(!e)return!1;if(this.ghost.pathTargetTile===e&&this.ghost.pathReason===t&&this.ghost.repathTimer>0&&this.ghost.pathFollower.path.size()>0)return!0;let s=this.map.quantize(this.ghost.position),i;if(s===e?i=[s]:i=new ft(this.map,pt.manhattan,null).findPath(s,e),!i||i.length===0)return!1;let a=new de({points:i.map(n=>this.map.localize(n)),radius:this.map.tileSize*.4});return this.ghost.setPath(a,e,t),this.ghost.repathTimer=.35,this.refreshGhostPathDebug(i),!0}getGhostPathForce(){return this.ghost.pathFollower.path.size()===0?new p:mt.simple(this.ghost,this.map.tileSize*.45)}getWallAvoidanceForce(e){if(e.velocity.lengthSq()<.01)return new p;let t=new p,s=this.map.getNearbyWallSegments(e.position,this.map.tileSize*2.7);for(let i of s)t.add(U.wall(e,i.start,i.end,.45,this.map.tileSize,this.debug));return t}ensureGhostPatrolTile(){if(this.ghost.patrolTile){let s=this.map.localize(this.ghost.patrolTile);if(this.ghost.position.distanceTo(s)>this.map.tileSize*.45)return this.ghost.patrolTile}let e=new Set([this.map.startTile,this.map.exitTile,this.map.ghostSpawnTile,this.map.quantize(this.ghost.position)]),t=this.map.getRandomWalkableTile(e);for(;t&&(this.map.localize(t).distanceTo(this.player.position)<this.map.tileSize*6||this.map.localize(t).distanceTo(this.ghost.position)<this.map.tileSize*4);)t=this.map.getRandomWalkableTile(e);return this.ghost.patrolTile=t,t}getRetreatTile(){let e=this.map.ghostSpawnTile,t=this.map.quantize(this.player.position),s=this.map.quantize(this.ghost.position),i=-1/0;for(let a=0;a<40;a++){let n=this.map.getRandomWalkableTile(new Set([this.map.exitTile])),l=Math.abs(n.row-t.row)+Math.abs(n.col-t.col)-.2*(Math.abs(n.row-s.row)+Math.abs(n.col-s.col));l>i&&(i=l,e=n)}return e}updateMemories(){for(let e of this.memories)if(!e.collected&&this.player.position.distanceTo(e.echo.position)<1.2){e.collected=!0,e.echo.setCollected(!0),e.tile.type=g.Type.Floor,e.tile.cost=g.Cost.get(g.Type.Floor),this.tileMapRenderer.setTileColor(e.tile,this.tileMapRenderer.getFloorColor(e.tile));let t=this.memories.filter(s=>!s.collected).length;this.statusMessage=t>0?`Ritual candle recovered. ${t} candles remain.`:"All five candles are recovered. Reach the altar now."}}updateWinLoss(){let e=this.player.radius+this.ghost.radius+.15;if(this.ghost.stunTimer<=0&&this.player.position.distanceTo(this.ghost.position)<e){this.gameState="lost",this.statusMessage="The Entity caught you. Press R to try the manor again.";return}let t=this.memories.every(i=>i.collected),s=this.map.localize(this.map.exitTile);t&&this.player.position.distanceTo(s)<this.map.tileSize*.5&&(this.gameState="won",this.statusMessage="The altar banishes the Entity. Press R for a fresh manor.")}updateCamera(e){if(this.player){let t=this.player.position.clone().add(new p(0,36,.01));this.camera.position.lerp(t,1-Math.pow(.002,e)),this.camera.lookAt(this.player.position.clone())}}updateFlashlight(){if(!this.flashlight||!this.player)return;let e=this.isFlashlightActive(),t=this.player.getFlashlightOrigin(),s=this.player.getFlashlightVolumeOrigin(),i=this.player.getFlashlightRayStart(),a=t.clone().setY(0).sub(i.clone().setY(0)).dot(this.player.facing),n=this.sampleFlashlightCone(i,a,t,this.flashlightFloorBeam.rayCount,s),l=n.samples[Math.floor(n.samples.length/2)],o=l.beamDistance,h=l.target;this.flashlight.position.copy(t),this.flashlightTarget.position.copy(h),this.flashlight.distance=o,this.flashlight.intensity=e?9.2:0,this.updateFlashlightVolumeBeam(s,n.samples),this.updateFlashlightSourceGlow(n.floorOrigin),this.updateFlashlightFloorBeam(n.floorOrigin,n.samples),this.updateFlashlightWallBeams(n.samples);let c=this.player.mesh.children[2];c.material.emissiveIntensity=e?1.4:.18,c.material.color.set(this.player.flashlightOn?"#ffd78a":"#6e6555")}updateExitBeacon(){if(!this.exitBeacon)return;let e=this.memories.every(a=>a.collected),t=this.exitBeacon.children[0],s=this.exitBeacon.children[1],i=this.exitBeacon.children[2];i.rotation.z+=.01,this.exitBeacon.position.y=Math.sin(this.time*1.5)*.08,e?(i.material.color.set("#7dffd3"),i.material.emissive.set("#7dffd3"),i.material.emissiveIntensity=1.5,s.material.emissive.set("#3f9f83"),s.material.emissiveIntensity=.9,t.material.emissive.set("#274139"),t.material.emissiveIntensity=.55,this.tileMapRenderer.setTileColor(this.map.exitTile,new B("#5ccf9c"))):(i.material.color.set("#365748"),i.material.emissive.set("#365748"),i.material.emissiveIntensity=.5,s.material.emissive.set("#27425a"),s.material.emissiveIntensity=.45,t.material.emissive.set("#1d2832"),t.material.emissiveIntensity=.35,this.tileMapRenderer.setTileColor(this.map.exitTile,this.tileMapRenderer.getFloorColor(this.map.exitTile)))}handleToggles(){if(this.inputHandler.consume("f")&&(this.player.setFlashlight(!this.player.flashlightOn),this.statusMessage=this.player.flashlightOn?"Flashlight on. It reveals the manor and can stun the Entity, but it also draws it in.":"Flashlight off. You are safer, but the manor is harder to read."),this.inputHandler.consume("r")){this.resetRun();return}this.inputHandler.consume("l")&&(this.pathDebugEnabled=!this.pathDebugEnabled,this.refreshGhostPathDebug(this.ghostPathTiles),this.statusMessage=this.pathDebugEnabled?"Ghost path debug enabled.":"Ghost path debug disabled.")}refreshGhostPathDebug(e){for(let t of this.ghostPathTiles)this.tileMapRenderer.setTileColor(t,this.tileMapRenderer.getFloorColor(t));if(this.ghostPathTiles=e||[],!!this.pathDebugEnabled)for(let t=1;t<this.ghostPathTiles.length-1;t++)this.tileMapRenderer.setTileColor(this.ghostPathTiles[t],new B("#5fd6ff"))}updateHud(){let e=document.getElementById("hud");if(!e)return;let t=this.memories.filter(n=>n.collected).length,s=this.memories.every(n=>n.collected),i=this.player.flashlightOn?this.flashlightFlickerTimer>0?"FLICKER":"ON":"OFF",a="Collect 5 candles. Return to the altar.";this.gameState==="won"?a="Ritual complete. Press R for a new manor.":this.gameState==="lost"&&(a="Caught by the Entity. Press R to try again."),e.innerHTML=`
      <div class="hud-state">${this.gameState.toUpperCase()} | ${this.ghost.stateLabel}</div>
      <div class="hud-objective">${a}</div>
      <div>Candles: ${t} / ${this.memories.length}</div>
      <div>Altar: ${s?"READY":"DORMANT"}</div>
      <div>Light: ${i}</div>
      <div>Path Debug: ${this.pathDebugEnabled?"ON":"OFF"}</div>
      <div class="hud-message">${this.statusMessage}</div>
      <div class="hud-controls">
        WASD / Arrows: move<br>
        Shift: sprint<br>
        F: light<br>
        L: path debug<br>
        R: new run
      </div>
    `}onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}render(){this.renderer.render(this.scene,this.camera)}}const ke={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};const Be=([r,e,t])=>{const s=document.createElementNS("http://www.w3.org/2000/svg",r);return Object.keys(e).forEach(i=>{s.setAttribute(i,String(e[i]))}),t?.length&&t.forEach(i=>{const a=Be(i);s.appendChild(a)}),s},Lt=(r,e={})=>{const s={...ke,...e};return Be(["svg",s,r])};const At=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};const Rt=(...r)=>r.filter((e,t,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===t).join(" ").trim();const It=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,s)=>s?s.toUpperCase():t.toLowerCase());const kt=r=>{const e=It(r);return e.charAt(0).toUpperCase()+e.slice(1)};const Bt=r=>Array.from(r.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),xe=r=>typeof r=="string"?r:!r||!r.class?"":r.class&&typeof r.class=="string"?r.class.split(" "):r.class&&Array.isArray(r.class)?r.class:"",Me=(r,{nameAttr:e,icons:t,attrs:s})=>{const i=r.getAttribute(e);if(i==null)return;const a=kt(i),n=t[a];if(!n)return console.warn(`${r.outerHTML} icon name was not found in the provided icons object.`);const l=Bt(r),o=At(l)?{}:{"aria-hidden":"true"},h={...ke,"data-lucide":i,...o,...s,...l},c=xe(l),u=xe(s),d=Rt("lucide",`lucide-${i}`,...c,...u);d&&Object.assign(h,{class:d});const m=Lt(n,h);return r.parentNode?.replaceChild(m,r)};const Wt=[["path",{d:"M12 5v14"}],["path",{d:"m19 12-7 7-7-7"}]];const Dt=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];const Ot=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];const Gt=[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]];const Ut=[["path",{d:"M12 13v1"}],["path",{d:"M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z"}],["path",{d:"M6 6h12"}]];const _t=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]];const jt=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];const Ht=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];const qt=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];const Nt=[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]];const ue=({icons:r={},nameAttr:e="data-lucide",attrs:t={},root:s=document,inTemplates:i}={})=>{if(!Object.values(r).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof s>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(s.querySelectorAll(`[${e}]`)).forEach(n=>Me(n,{nameAttr:e,icons:r,attrs:t})),i&&Array.from(s.querySelectorAll("template")).forEach(l=>ue({icons:r,nameAttr:e,attrs:t,root:l.content,inTemplates:i})),e==="data-lucide"){const n=s.querySelectorAll("[icon-name]");n.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(n).forEach(l=>Me(l,{nameAttr:"icon-name",icons:r,attrs:t})))}};function Vt(r){const e={ArrowLeft:Dt,ArrowUp:Gt,ArrowDown:Wt,ArrowRight:Ot,Pause:jt,Play:Ht,RotateCcw:qt,Flashlight:Ut,Route:Nt,Maximize:_t};ue({icons:e});const t=document.getElementById("pause"),s=document.getElementById("light"),i=document.getElementById("path-debug"),a=document.getElementById("fullscreen"),n={paused:!1,update(){s.setAttribute("aria-pressed",String(r.player.flashlightOn)),i.setAttribute("aria-pressed",String(r.pathDebugEnabled))}};function l(o){n.paused=o,r.inputHandler.clear(),document.getElementById("pause-status").hidden=!o,t.setAttribute("aria-label",o?"Resume":"Pause"),t.title=o?"Resume":"Pause",t.innerHTML=`<i data-lucide="${o?"play":"pause"}"></i>`,ue({icons:e})}t.addEventListener("click",()=>l(!n.paused)),window.addEventListener("blur",()=>l(!0)),document.addEventListener("visibilitychange",()=>{document.hidden&&l(!0)}),window.addEventListener("keydown",o=>{o.key==="Escape"&&!o.repeat&&l(!n.paused)}),document.getElementById("restart").addEventListener("click",()=>{r.resetRun(),l(!1)});for(const[o,h]of[[s,"f"],[i,"l"]])o.addEventListener("click",()=>{r.inputHandler.setKey(h,!0),r.inputHandler.setKey(h,!1),n.paused&&(r.handleToggles(),r.updateFlashlight(),r.updateHud())});return document.querySelectorAll("[data-move-key]").forEach(o=>{o.addEventListener("pointerdown",c=>{c.preventDefault(),n.paused&&l(!1),o.setPointerCapture(c.pointerId),r.inputHandler.setKey(o.dataset.moveKey,!0)});const h=()=>r.inputHandler.setKey(o.dataset.moveKey,!1);o.addEventListener("pointerup",h),o.addEventListener("pointercancel",h),o.addEventListener("lostpointercapture",h)}),a.hidden=!document.fullscreenEnabled,a.addEventListener("click",async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{a.hidden=!0}}),n}try{let t=function(){e.paused?r.clock.getDelta():r.update(),e.update(),r.render(),requestAnimationFrame(t)};const r=new Et;r.init(),r.renderer.domElement.setAttribute("aria-label","Echoes in the Walls game");const e=Vt(r);t()}catch(r){document.getElementById("load-error").hidden=!1,document.querySelector(".game-actions").hidden=!0,document.querySelector(".touch-movement").hidden=!0,console.error("Unable to start Echoes in the Walls:",r)}
