(function f(){
  var x=document.getElementById('formula-types');
  var c=document.getElementById('cellular-energy-attention');
  var repeated=document.getElementById('deal');
  var finalSection=document.querySelector('.cta-final');
  if(!x||!c||!repeated||!finalSection)return requestAnimationFrame(f);

  x.remove();

  var headline='Continue to PawPrint Protocol’s Official Website';
  var supporting='You’ll be taken directly to pawprintlab.com, the official website for PawPrint Protocol.';
  var buttonCopy='VISIT THE OFFICIAL PAWPRINT WEBSITE →';
  var smallLine='pawprintlab.com · 90-day money-back guarantee';

  var label=repeated.querySelector('.cta-label');
  var specs=repeated.querySelector('.cta-specs');
  if(label)label.style.display='none';
  if(specs)specs.style.display='none';
  var rh=repeated.querySelector('.cta-product');
  var rs=repeated.querySelector('.cta-offer');
  var rb=repeated.querySelector('.btn-primary');
  var rt=repeated.querySelector('.cta-trust');
  if(rh)rh.textContent=headline;
  if(rs){
    rs.textContent=supporting;
    rs.style.marginBottom='22px';
  }
  if(rb)rb.textContent=buttonCopy;
  if(rt)rt.textContent=smallLine;

  var fh=finalSection.querySelector('.final-lead');
  var fs=finalSection.querySelector('.final-summary');
  var fb=finalSection.querySelector('.btn-primary');
  var ft=finalSection.querySelector('.trust-badges');
  if(fh)fh.textContent=headline;
  if(fs){
    fs.textContent=supporting;
    fs.style.marginBottom='22px';
  }
  if(fb)fb.textContent=buttonCopy;
  if(ft)ft.innerHTML='<span>'+smallLine+'</span>';

  (function removeWarningsWhenReady(){
    var warnings=document.getElementById('warnings');
    if(!warnings)return;
    var guide=document.getElementById('guide');
    if(guide&&guide.dataset.lowerCleanup==='true'){
      warnings.remove();
      return;
    }
    requestAnimationFrame(removeWarningsWhenReady);
  })();
})();