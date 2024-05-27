import React, { FC, ReactNode, memo } from 'react'
import style from './styles.module.scss'

interface SideLayoutProps {
  children: ReactNode
  side?: 'start' | 'end' | 'between' | 'around' | 'center'
  padding?: 'small' | 'medium'
  align?: 'start' | 'end'
}

const SideLayout: FC<SideLayoutProps> = ({ children, side, padding, align }) => {
  const classNames = [
    style.side_layout,
    side && style[`side_${side}`],
    padding && style[`padding_${padding}`],
    align && style[`align_${align}`],
  ].join(' ')

  return (
    <div className={classNames}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={style.side_layout_item}>
          {child}
        </div>
      ))}
    </div>
  )
}

export default memo(SideLayout)
