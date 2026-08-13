(function f(){
  var c=document.querySelector('#cellular-energy-attention .cellular-energy-copy');
  var section=document.getElementById('cellular-energy-attention');
  var comparison=document.getElementById('comparison');
  var popular=document.getElementById('popular-options-inside');
  if(!c||!section||!comparison||!popular)return requestAnimationFrame(f);

  c.insertAdjacentHTML('beforeend','<p>That is why cellular energy stood out to us as a different place to focus.</p>');

  popular.style.display='none';
  comparison.insertAdjacentElement('afterend',section);
})();