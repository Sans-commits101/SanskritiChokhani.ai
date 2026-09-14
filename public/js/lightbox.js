const dialog = document.querySelector('#detail-dialog');
let currentItems = [], currentIndex = 0;
export function showDetail(items,index){
  currentItems=items;currentIndex=(index+items.length)%items.length;
  const item=items[currentIndex];
  document.querySelector('#detail-category').textContent=item.category;
  document.querySelector('#detail-title').textContent=item.title;
  document.querySelector('#detail-subtitle').textContent=item.subtitle;
  document.querySelector('#detail-body').innerHTML=item.body;
  document.querySelector('#detail-count').textContent=`${currentIndex+1} / ${items.length}`;
  if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');}
  dialog.scrollTop=0;
}
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#previous-detail').addEventListener('click',()=>showDetail(currentItems,currentIndex-1));
document.querySelector('#next-detail').addEventListener('click',()=>showDetail(currentItems,currentIndex+1));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')showDetail(currentItems,currentIndex-1);if(event.key==='ArrowRight')showDetail(currentItems,currentIndex+1);});
