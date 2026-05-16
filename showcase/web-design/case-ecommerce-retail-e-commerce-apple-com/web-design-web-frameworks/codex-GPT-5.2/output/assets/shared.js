function orchardChevronSvg(){
  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M7.4 3.9a1 1 0 0 1 1.4 0l5.1 5.1a1.4 1.4 0 0 1 0 2l-5.1 5.1a1 1 0 1 1-1.4-1.4L12 10 7.4 5.3a1 1 0 0 1 0-1.4z"/>
    </svg>`;
}

function orchardNavButton(dir){
  const label = dir === 'prev' ? 'Previous' : 'Next';
  const klass = dir === 'prev' ? 'carousel__nav carousel__nav--prev' : 'carousel__nav carousel__nav--next';
  const rotate = dir === 'prev' ? ' style="transform:rotate(180deg)"' : '';
  return `<button class="${klass}" type="button" aria-label="${label}">${orchardChevronSvg().replace('<svg', `<svg${rotate}`)}</button>`;
}

