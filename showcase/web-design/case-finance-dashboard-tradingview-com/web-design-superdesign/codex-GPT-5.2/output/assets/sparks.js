(function(){
  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function sparkPath(values,w,h,pad){
    var min=Infinity,max=-Infinity;
    values.forEach(v=>{min=Math.min(min,v);max=Math.max(max,v);});
    if(max===min){max=min+1;}
    var sx=(w-2*pad)/(values.length-1);
    var points=values.map((v,i)=>{
      var x=pad+i*sx;
      var t=(v-min)/(max-min);
      var y=pad+(1-t)*(h-2*pad);
      return [x,y];
    });
    var d='M '+points[0][0].toFixed(2)+' '+points[0][1].toFixed(2);
    for(var i=1;i<points.length;i++) d+=' L '+points[i][0].toFixed(2)+' '+points[i][1].toFixed(2);
    return d;
  }

  function render(){
    document.querySelectorAll('svg[data-spark]').forEach(function(svg){
      var raw=svg.getAttribute('data-values')||'';
      var dir=(svg.getAttribute('data-dir')||'up');
      var values=raw.split(',').map(s=>parseFloat(s.trim())).filter(v=>!Number.isNaN(v));
      if(values.length<2) values=[1,2,1.5,2.4,2.2,2.8,2.6];
      var w=parseFloat(svg.getAttribute('width')||86);
      var h=parseFloat(svg.getAttribute('height')||26);
      var pad=3;
      var stroke= dir==='down' ? 'rgba(247,82,95,.95)' : 'rgba(34,197,94,.95)';
      var fill= dir==='down' ? 'rgba(247,82,95,.18)' : 'rgba(34,197,94,.18)';

      while(svg.firstChild) svg.removeChild(svg.firstChild);
      svg.setAttribute('viewBox', '0 0 '+w+' '+h);

      var d=sparkPath(values,w,h,pad);
      var area=d + ' L '+(w-pad).toFixed(2)+' '+(h-pad).toFixed(2)+' L '+pad.toFixed(2)+' '+(h-pad).toFixed(2)+' Z';

      var areaPath=document.createElementNS('http://www.w3.org/2000/svg','path');
      areaPath.setAttribute('d',area);
      areaPath.setAttribute('fill',fill);
      areaPath.setAttribute('stroke','none');
      svg.appendChild(areaPath);

      var path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',d);
      path.setAttribute('fill','none');
      path.setAttribute('stroke',stroke);
      path.setAttribute('stroke-width','2');
      path.setAttribute('stroke-linecap','round');
      path.setAttribute('stroke-linejoin','round');
      svg.appendChild(path);
    });
  }
  document.addEventListener('DOMContentLoaded', render);
})();
