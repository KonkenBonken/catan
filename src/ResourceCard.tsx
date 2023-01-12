import { useState, CSSProperties } from 'react';
import { Resource } from './utils/enums'
import { cls } from './utils/utilities'

type stSlctd = React.Dispatch<React.SetStateAction<boolean>>;

let setSelecteds: stSlctd[] = [];

export default class ResourceCard {
  private throwMode = false;
  private selected = false;
  private onClick?: (stS: stSlctd) => () => void;

  constructor(readonly resource: Resource, readonly tileDiv?: HTMLDivElement) { }

  throwCardsMode(throwMode: false)
  throwCardsMode(selectedCards: ResourceCard[], onSelect: () => void)
  throwCardsMode(selectedCards: ResourceCard[] | false, onSelect?: () => void) {

    if (selectedCards === false) {
      for (const setSelected of setSelecteds)
        setSelected(false);
      setSelecteds = [];
      this.onClick = undefined;
      return this.throwMode = false;
    }

    this.onClick = (setSelected: stSlctd) => () => {
      setSelecteds.push(setSelected);

      if (this.selected)
        selectedCards.splice(selectedCards.indexOf(this), 1)
      else
        selectedCards.push(this)

      this.selected = !this.selected;
      setSelected(prev => !prev);

      if (onSelect)
        onSelect();
    };
  }

  render() {
    return <RenderCard resource={Resource[this.resource]} tileDiv={this.tileDiv} onClick={this.onClick?.bind(this)} />;
  }
}

function RenderCard({ resource, tileDiv, onClick }: { resource: string, tileDiv?: HTMLDivElement, onClick?: (stS: stSlctd) => () => void }) {
  const [style, setStyle] = useState<CSSProperties>({}),
    [rendered, setRendered] = useState(false),
    [selected, setSelected] = useState(false);

  function onRef(cardDiv: HTMLDivElement | null) {
    if (rendered || !tileDiv || !cardDiv) return false;

    const { top: tileTop, left: tileLeft } = tileDiv.getBoundingClientRect(),
      { top: cardTop, left: cardLeft } = cardDiv.getBoundingClientRect(),

      pos = { top: tileTop - cardTop, left: tileLeft - cardLeft };

    setStyle(pos);
    setRendered(true);
  }

  return (<div
    style={style} ref={onRef}
    className={cls('card', resource, { selected })}
    onClick={onClick && onClick(setSelected as () => void)}
  />)
}