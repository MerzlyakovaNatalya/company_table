import { memo, FC } from 'react'
import style from './styles.module.scss'

interface IPageLayoutProps {
  head?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

const Layout: FC<IPageLayoutProps> = ({ head, footer, children }) => {

  return (
    <div className={style.layout}>
      <div className={style.layout_head}>{head}</div>
      <div className={style.layout_center}>{children}</div>
      <div className={style.layout_footer}>{footer}</div>
    </div>
  )
}

export default memo(Layout)