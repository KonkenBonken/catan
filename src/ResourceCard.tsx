import { useState, CSSProperties } from 'react';
import { Resource } from './utils/enums'
import { cls } from './utils/utilities'

export default class ResourceCard {
  constructor(readonly resource: Resource, readonly tileDiv?: HTMLDivElement) { }

  render() {
    return <RenderCard resource={Resource[this.resource]} tileDiv={this.tileDiv} />;
  }
}

function RenderCard({ resource, tileDiv }: { resource: string, tileDiv?: HTMLDivElement }) {
  const [style, setStyle] = useState<CSSProperties>({}),
    [rendered, setRendered] = useState(false);

  function onRef(cardDiv: HTMLDivElement | null) {
    if (rendered || !tileDiv || !cardDiv) return false;

    const { top: tileTop, left: tileLeft } = tileDiv.getBoundingClientRect(),
      { top: cardTop, left: cardLeft } = cardDiv.getBoundingClientRect(),

      pos = { top: tileTop - cardTop, left: tileLeft - cardLeft };

    setStyle(pos);
    setRendered(true);
  }

  return (<div className={cls('card', resource)} style={style} ref={onRef} />)
}