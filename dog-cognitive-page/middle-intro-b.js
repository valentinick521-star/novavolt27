(function f(){
  var section=document.getElementById('popular-options-inside');
  var list=document.querySelector('#faq .faq-list');
  if(!section||!list)return requestAnimationFrame(f);
  var transition=section.querySelector('.popular-options-transition');
  if(transition)transition.remove();
  list.innerHTML=`
    <details class="faq-compact">
      <summary>What makes PawPrint different from the other supplements?</summary>
      <div class="faq-answer">PawPrint puts NMN and NAD+ at the center of its formula. Instead of mainly focusing on one part of the brain cell or using a very broad nutrient blend, its main approach is supporting the cellular-energy system brain cells depend on.</div>
    </details>
    <details class="faq-compact">
      <summary>How do you give PawPrint to a dog?</summary>
      <div class="faq-answer">PawPrint comes as a liquid dropper with directions based on your dog’s weight. It can be added to food as part of a daily routine. Owners should follow the directions on the product label.</div>
    </details>
    <details class="faq-compact">
      <summary>What if PawPrint is not right for my dog?</summary>
      <div class="faq-answer">PawPrint offers a 90-day money-back guarantee. That gives owners more time to decide whether they want to continue using it, but it does not guarantee a certain result within 90 days.</div>
    </details>`;
})();